#!/usr/bin/env bash
#
# push-bootstrap.sh
#
# Bootstrap script for a fresh Omarchy (Arch) install. Safe to re-run.
#
#  1. Installs packages listed in an external push_packages.list file
#  2. Starts ssh-agent and loads an external private key
#  3. Clones (or updates) a dotfiles git repo into /home/push/dotfiles
#  4. Backs up any real files that would be overwritten, then stows
#     every package folder found inside the dotfiles repo with GNU stow
#     (the "etc" package is NOT stowed, it is installed to /etc, see 6)
#  5. Adds the private hooks to hyprland.lua, ~/.bash_profile and ~/.bashrc
#  6. Installs the Mac Mini CS4208 headphone-jack fix (macmini-audio.conf)
#     into /etc/modprobe.d - only on machines that have that codec
#  7. Sets defaults (Brave as default browser) and installs Omarchy plugins
#  8. Mounts the SMB/CIFS shares on ds923plus.push (andreas, docker,
#     photos_shared, web)
#  9. Writes those shares into a standalone fstab-snippet file and merges
#     it into /etc/fstab so they auto-mount on reboot too
# 10. Enables and starts the systemd --user units from the dotfiles
#
# Usage:
#   ./push-bootstrap.sh [options]
#
# Options (all have env-var equivalents shown in brackets):
#   -p, --packages FILE      Package list file              [PACKAGES_FILE]        (default: ./push_packages.list)
#   -k, --key FILE           SSH private key to load        [SSH_KEY_PATH]         (default: $HOME/.ssh/archmini_ed25519)
#   -r, --repo URL           Dotfiles git remote (SSH URL)  [DOTFILES_REPO]        (required only for first clone)
#   -d, --dotfiles-dir DIR   Where the repo lives           [DOTFILES_DIR]         (default: /home/push/dotfiles)
#   -t, --target DIR         stow target (usually $HOME)    [STOW_TARGET]          (default: $HOME)
#   -b, --backup-dir DIR     Where conflicting files go     [BACKUP_DIR]           (default: ~/.dotfiles-backup-<timestamp>)
#       --smb-credentials FILE  SMB credentials file        [SMB_CREDENTIALS_FILE] (default: ~/.smbcredentials)
#       --fstab-file FILE    Standalone file with fstab lines [SMB_FSTAB_FILE]     (default: /etc/smb-shares.fstab)
#       --skip-dotfiles      Do not clone/pull the dotfiles repo
#       --skip-stow          Do not stow the dotfiles packages
#       --skip-audio-fix     Do not install macmini-audio.conf
#       --skip-smb           Skip mounting the SMB shares
#       --skip-fstab         Skip writing /etc/fstab entries (mount-only, no auto-mount on reboot)
#       --skip-services      Skip enabling/starting the systemd --user units
#   -h, --help               Show this help and exit
#
# Env-only settings: SYSTEM_PKG (dotfiles folder that goes to /etc, default: etc),
#                    AUDIO_CONF_SRC (override path of macmini-audio.conf)
#
# Example:
#   ./push-bootstrap.sh \
#     --packages /home/push/push_packages.list \
#     --key /home/push/.ssh/id_ed25519_push \
#     --repo git@github.com:youruser/dotfiles.git

# -E makes the ERR trap fire for failures inside functions as well,
# -e exits on errors, -u on unset variables, pipefail on failed pipes.
set -Eeuo pipefail

# Prints where and why the script aborted (called by the ERR trap below).
on_error() {
  local ec=$1 line=$2 cmd=$3
  printf '\033[1;31m[push-bootstrap]\033[0m Aborted (exit %s) at line %s while running: %s\n' "$ec" "$line" "$cmd" >&2
}
trap 'on_error "$?" "$LINENO" "$BASH_COMMAND"' ERR

### ---------- Defaults (overridable via flags or env vars) ----------
PACKAGES_FILE="${PACKAGES_FILE:-./push_packages.list}"
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/archmini_ed25519}"
DOTFILES_REPO="${DOTFILES_REPO:-}"
DOTFILES_DIR="${DOTFILES_DIR:-/home/push/dotfiles}"
STOW_TARGET="${STOW_TARGET:-$HOME}"
BACKUP_DIR="${BACKUP_DIR:-$HOME/.dotfiles-backup-$(date +%Y%m%d-%H%M%S)}"

# Omarchy plugins (Git URLs) that install_plugins() adds and enables.
PLUGIN_LIST=(
  'https://github.com/stappmus/Omarchy-Spotify.git'
  'https://github.com/SirJul1337/omarchy-lock-explorer.git'
  'https://github.com/Pegorim/omaplug.git'
  'https://github.com/SmoothPixels/cursor-accent.git'
)

SMB_HOST="${SMB_HOST:-ds923plus.push}"
SMB_SHARES=(andreas docker photos_shared web)
SMB_MOUNT_BASE="${SMB_MOUNT_BASE:-/mnt/smb}"
SMB_CREDENTIALS_FILE="${SMB_CREDENTIALS_FILE:-$HOME/.smbcredentials}"
SMB_UID="${SMB_UID:-$(id -u)}"
SMB_GID="${SMB_GID:-$(id -g)}"
SMB_FSTAB_FILE="${SMB_FSTAB_FILE:-/etc/smb-shares.fstab}"

# Switches set by the --skip-* flags.
SKIP_DOTFILES=0
SKIP_STOW=0
SKIP_AUDIO_FIX=0
SKIP_SMB=0
SKIP_FSTAB=0
SKIP_SERVICES=0

SYSTEM_PKG="${SYSTEM_PKG:-etc}"        # dotfiles folder that goes to /etc, not into $HOME
AUDIO_CONF_SRC="${AUDIO_CONF_SRC:-}"   # optional override, default is set in install_audio_fix

### ---------- Helpers ----------
# Coloured output: log = info (blue), warn = warning (yellow, stderr),
# die = error (red, stderr) and exit.
log()  { printf '\033[1;34m[push-bootstrap]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[push-bootstrap]\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31m[push-bootstrap]\033[0m %s\n' "$*" >&2; exit 1; }

# Prints the header comment of this file (everything up to the first blank line).
usage() { sed -n '2,/^$/p' "$0" | sed 's/^# \{0,1\}//'; }

# append_once FILE PATTERN TEXT
# Appends TEXT to FILE unless the fixed string PATTERN is already in it, so
# re-runs never add duplicates. Skips (with a warning) if FILE does not exist.
append_once() {
  local file="$1" pattern="$2" text="$3"
  if [[ ! -f "$file" ]]; then
    warn "$file not found - skipping '$pattern' hook."
    return 0
  fi
  if grep -qF -- "$pattern" "$file"; then
    return 0
  fi
  printf '%s\n' "$text" >> "$file"
  log "Added '$pattern' hook to $file"
}

### ---------- Argument parsing ----------
while [[ $# -gt 0 ]]; do
  case "$1" in
    -p|--packages)      PACKAGES_FILE="$2"; shift 2 ;;
    -k|--key)           SSH_KEY_PATH="$2"; shift 2 ;;
    -r|--repo)          DOTFILES_REPO="$2"; shift 2 ;;
    -d|--dotfiles-dir)  DOTFILES_DIR="$2"; shift 2 ;;
    -t|--target)        STOW_TARGET="$2"; shift 2 ;;
    -b|--backup-dir)    BACKUP_DIR="$2"; shift 2 ;;
    --smb-credentials)  SMB_CREDENTIALS_FILE="$2"; shift 2 ;;
    --fstab-file)       SMB_FSTAB_FILE="$2"; shift 2 ;;
    --skip-dotfiles)    SKIP_DOTFILES=1; shift ;;
    --skip-stow)        SKIP_STOW=1; shift ;;
    --skip-audio-fix)   SKIP_AUDIO_FIX=1; shift ;;
    --skip-smb)         SKIP_SMB=1; shift ;;
    --skip-fstab)       SKIP_FSTAB=1; shift ;;
    --skip-services)    SKIP_SERVICES=1; shift ;;
    -h|--help)          usage; exit 0 ;;
    *) die "Unknown argument: $1 (see --help)" ;;
  esac
done

### ---------- 0. Prerequisites ----------
# git, openssh, stow and cifs-utils are needed by this script itself, so
# make sure they exist before we even try to read the package list.
# Bails out if pacman is missing (not an Arch/Omarchy system).
ensure_prereqs() {
  local bin missing=() to_install=()

  command -v pacman >/dev/null 2>&1 || die "pacman not found - this script targets Arch/Omarchy systems."

  for bin in git ssh-agent ssh-add stow; do
    command -v "$bin" >/dev/null 2>&1 || missing+=("$bin")
  done
  [[ ${#missing[@]} -gt 0 ]] && log "Missing tools: ${missing[*]}"

  # Map the commands we need to the package that provides them.
  for bin in git openssh stow cifs-utils; do
    case "$bin" in
      openssh)    command -v ssh-agent >/dev/null 2>&1 || to_install+=(openssh) ;;
      cifs-utils) command -v mount.cifs >/dev/null 2>&1 || to_install+=(cifs-utils) ;;
      *)          command -v "$bin" >/dev/null 2>&1 || to_install+=("$bin") ;;
    esac
  done

  if [[ ${#to_install[@]} -gt 0 ]]; then
    log "Installing prerequisites: ${to_install[*]}"
    sudo pacman -S --needed --noconfirm "${to_install[@]}"
  fi
}

### ---------- 1. Install packages from external list ----------
# Reads PACKAGES_FILE (one package per line, '#' starts a comment, blank
# lines are ignored) and installs everything with pacman.
install_packages() {
  [[ -f "$PACKAGES_FILE" ]] || die "Package list not found: $PACKAGES_FILE"

  local line pkgs=()
  # "|| [[ -n $line ]]" keeps the last line even without a trailing newline.
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%%#*}"                # strip comments
    line="$(echo "$line" | xargs)"    # trim whitespace
    [[ -z "$line" ]] && continue
    pkgs+=("$line")
  done < "$PACKAGES_FILE"

  if [[ ${#pkgs[@]} -eq 0 ]]; then
    warn "Package list $PACKAGES_FILE is empty - skipping install."
    return
  fi

  log "Installing ${#pkgs[@]} package(s) from $PACKAGES_FILE"
  sudo pacman -S --needed --noconfirm "${pkgs[@]}"
}

### ---------- 2. ssh-agent + private key ----------
# Starts an ssh-agent for this script run and loads SSH_KEY_PATH into it
# (needed so git can clone/pull the dotfiles repo over SSH).
load_ssh_key() {
  [[ -f "$SSH_KEY_PATH" ]] || die "SSH key not found: $SSH_KEY_PATH"
  chmod 600 "$SSH_KEY_PATH" 2>/dev/null || true

  log "Starting ssh-agent"
  eval "$(ssh-agent -s)" >/dev/null

  log "Loading key: $SSH_KEY_PATH"
  ssh-add "$SSH_KEY_PATH"
}

### ---------- 3. Load / update dotfiles repo ----------
# Pulls the repo if it already exists in DOTFILES_DIR, otherwise clones
# DOTFILES_REPO (which must then be given via --repo / DOTFILES_REPO).
load_dotfiles() {
  if [[ "$SKIP_DOTFILES" -eq 1 ]]; then
    log "Skipping dotfiles (--skip-dotfiles)"
    return
  fi

  if [[ -d "$DOTFILES_DIR/.git" ]]; then
    log "Dotfiles repo already present at $DOTFILES_DIR - pulling latest"
    git -C "$DOTFILES_DIR" pull --ff-only
  else
    [[ -n "$DOTFILES_REPO" ]] || die "No repo at $DOTFILES_DIR and no --repo/DOTFILES_REPO given."
    log "Cloning $DOTFILES_REPO into $DOTFILES_DIR"
    mkdir -p "$(dirname "$DOTFILES_DIR")"
    git clone "$DOTFILES_REPO" "$DOTFILES_DIR"
  fi
}

### ---------- 4. Backup conflicts, then stow every package folder ----------
# Ask stow itself (via --simulate) which target paths it would refuse to
# touch. This catches BOTH plain conflicting files AND whole directories
# that already exist as real (non-symlink) dirs - stow reports the
# highest-level path it can't safely fold into, which is exactly what
# needs to be moved out of the way before the real stow run.
# Prints one conflicting path (relative to the stow target) per line.
detect_conflicts() {
  local pkg_name="$1"
  stow -n -v 2 -d "$DOTFILES_DIR" -t "$STOW_TARGET" "$pkg_name" 2>&1 \
    | sed -n -E \
        -e 's/^[[:space:]]*\*[[:space:]]*cannot stow .* over existing target (.*) since neither a link nor a directory.*/\1/p' \
        -e 's/^[[:space:]]*\*[[:space:]]*existing target[^:]*:[[:space:]]*(.*)$/\1/p' \
    | sed -E 's/ +=>.*$//'
}

# Moves every real (non-symlink) file that would block stowing the package
# into BACKUP_DIR/<package>/..., keeping its relative path.
backup_conflicts() {
  local pkg_dir="$1" pkg_name rel target
  pkg_name="$(basename "$pkg_dir")"

  while IFS= read -r rel; do
    [[ -z "$rel" ]] && continue
    target="$STOW_TARGET/$rel"

    # Only back up real paths that are NOT already a symlink
    # (i.e. not already stowed from a previous run).
    if [[ -e "$target" && ! -L "$target" ]]; then
      mkdir -p "$(dirname "$BACKUP_DIR/$pkg_name/$rel")"
      log "Backing up $target -> $BACKUP_DIR/$pkg_name/$rel"
      mv "$target" "$BACKUP_DIR/$pkg_name/$rel"
    else
      warn "stow reported a conflict at $target but it's missing or already a symlink - skipping backup, check manually if stow still fails."
    fi
  done < <(detect_conflicts "$pkg_name")
}

# Stows every folder in DOTFILES_DIR as a GNU stow package into STOW_TARGET
# (after backing up conflicts). The SYSTEM_PKG folder is skipped because it
# belongs in /etc (see install_audio_fix). A failing package is skipped
# with a warning so the remaining steps still run.
stow_all_packages() {
  local dir pkg_name found=0

  if [[ "$SKIP_STOW" -eq 1 ]]; then
    log "Skipping stow (--skip-stow)"
    return
  fi

  for dir in "$DOTFILES_DIR"/*/; do
    [[ -d "$dir" ]] || continue
    pkg_name="$(basename "$dir")"
    [[ "$pkg_name" == ".git" ]] && continue
    [[ "$pkg_name" == "$SYSTEM_PKG" ]] && continue   # installed to /etc by install_audio_fix
    found=1

    backup_conflicts "$dir"

    log "Stowing package: $pkg_name"
    if ! stow -v -R -d "$DOTFILES_DIR" -t "$STOW_TARGET" "$pkg_name"; then
      warn "stow failed for package '$pkg_name' - skipping it and continuing with the rest (mounts/fstab still run)."
      continue
    fi
  done

  if [[ "$found" -eq 0 ]]; then
    warn "No package folders found in $DOTFILES_DIR - nothing to stow."
  else
    log "Backups of any overwritten files are saved under: $BACKUP_DIR"
  fi
}

### ---------- 5. Private hooks (hyprland, bash) ----------
# Hooks my private config into the stowed files. Every hook is added only
# once, so re-running the script never duplicates lines.
add_shell_hooks() {
  # Hyprland: load my private config (skipped if hyprland.lua does not exist)
  append_once "$HOME/.config/hypr/hyprland.lua" "push_hyprland" \
    $'\n-- added push private config\nrequire("hypr.push_hyprland")'

  # Bash: load my own rc file from ~/.bash_profile and ~/.bashrc
  touch "$HOME/.bash_profile" "$HOME/.bashrc"
  append_once "$HOME/.bash_profile" "pushrc" \
    '[ -e ~/.pushrc ] && . ~/.pushrc || echo "warning: ~/.pushrc not found"'
  append_once "$HOME/.bashrc" "pushrc" \
    '[ -e ~/dotfiles/bash_archmini/.pushrc ] && . ~/dotfiles/bash_archmini/.pushrc || echo "warning: ~/dotfiles/bash_archmini/.pushrc not found"'
}

### ---------- 6. Mac Mini CS4208 headphone-jack fix ----------
# Without this model option the jack is not detected when the plug is fully
# inserted and sound stays on the internal speakers. The file is copied from
# the dotfiles to /etc/modprobe.d (stow cannot write to /etc here) and only
# on machines that really have the CS4208 codec. A reboot is needed after.
install_audio_fix() {
  local src="${AUDIO_CONF_SRC:-$DOTFILES_DIR/$SYSTEM_PKG/modprobe.d/macmini-audio.conf}"
  local dst="/etc/modprobe.d/macmini-audio.conf"

  if [[ "$SKIP_AUDIO_FIX" -eq 1 ]]; then
    log "Skipping audio fix (--skip-audio-fix)"
    return
  fi

  if [[ ! -f "$src" ]]; then
    warn "Audio fix not found in dotfiles: $src - skipping."
    return
  fi

  # The model= list is per sound card, so only apply it on hardware that
  # really has the CS4208 codec.
  if ! grep -qs "Codec: Cirrus Logic CS4208" /proc/asound/card*/codec#* 2>/dev/null; then
    log "No CS4208 codec detected - not installing macmini-audio.conf"
    return
  fi

  if [[ -f "$dst" ]] && sudo cmp -s "$src" "$dst"; then
    log "Audio fix already installed: $dst"
    return
  fi

  sudo install -Dm644 "$src" "$dst"
  log "Installed $dst - reboot required for the headphone-jack fix to take effect."
}

### ---------- 7. Defaults and Omarchy plugins ----------
# Makes Brave the default browser if it is installed (config dir exists)
# and Omarchy still uses Chromium.
set_defaults() {
  if ! command -v omarchy >/dev/null 2>&1; then
    warn "omarchy command not found - skipping defaults."
    return
  fi

  if [[ -d "$HOME/.config/BraveSoftware/" ]] && [[ "$(omarchy default browser)" == "chromium" ]]; then
    log "Setting Brave as default browser"
    omarchy default browser brave
  fi
}

# Installs and enables every plugin from PLUGIN_LIST that is not installed yet.
# NOTE: this assumes 'omarchy plugin list' prints the plugin's Git URL; if it
# only prints names, the grep never matches and plugins get re-added each run.
install_plugins() {
  local plug

  if ! command -v omarchy >/dev/null 2>&1; then
    warn "omarchy command not found - skipping plugins."
    return
  fi

  for plug in "${PLUGIN_LIST[@]}"; do
    # No -q on purpose: with pipefail, grep -q could close the pipe early
    # and make the pipeline report a false failure.
    if omarchy plugin list | grep -F -- "$plug" > /dev/null; then
      log "Plugin $plug is already installed - skipping"
      continue
    fi

    log "Installing $plug"
    if ! omarchy plugin add "$plug" --enable; then
      warn "Failed to install plugin $plug - continuing with the rest."
    fi
  done
}

### ---------- 8. Mount SMB/CIFS shares ----------
# Mounts every share from SMB_SHARES below SMB_MOUNT_BASE right now.
# Already mounted shares are skipped; a failing share only gives a warning.
mount_smb_shares() {
  local share mount_point
  for share in "${SMB_SHARES[@]}"; do
    mount_point="$SMB_MOUNT_BASE/$share"
    sudo mkdir -p "$mount_point"

    if mountpoint -q "$mount_point"; then
      log "SMB share $share already mounted at $mount_point - skipping"
      continue
    fi

    log "Mounting //$SMB_HOST/$share -> $mount_point"
    if ! sudo mount -t cifs "//$SMB_HOST/$share" "$mount_point" \
      -o "credentials=$SMB_CREDENTIALS_FILE,uid=$SMB_UID,gid=$SMB_GID,iocharset=utf8,vers=3.0"; then
      warn "Failed to mount //$SMB_HOST/$share - skipping it and continuing (fstab entry is still written so it can retry on next mount -a)."
    fi
  done
}

### ---------- 9. fstab entries for the SMB shares (auto-mount on reboot) ----------
FSTAB_MARKER_BEGIN="# >>> push-bootstrap smb shares >>>"
FSTAB_MARKER_END="# <<< push-bootstrap smb shares <<<"

# Writes the standalone snippet file - one plain fstab line per share.
# Kept separate from /etc/fstab itself so it's easy to read, diff, or
# version-control on its own; install_fstab_entries() below merges its
# content into /etc/fstab.
generate_smb_fstab_file() {
  local share tmp
  tmp="$(mktemp)"

  {
    echo "# Generated by push-bootstrap.sh - do not edit /etc/fstab directly for these entries,"
    echo "# edit this file and re-run the script instead."
    for share in "${SMB_SHARES[@]}"; do
      printf '//%s/%s %s cifs credentials=%s,uid=%s,gid=%s,iocharset=utf8,vers=3.0,x-systemd.automount,x-systemd.idle-timeout=60,_netdev,noauto 0 0\n' \
        "$SMB_HOST" "$share" "$SMB_MOUNT_BASE/$share" "$SMB_CREDENTIALS_FILE" "$SMB_UID" "$SMB_GID"
    done
  } > "$tmp"

  sudo mkdir -p "$(dirname "$SMB_FSTAB_FILE")"
  sudo cp "$tmp" "$SMB_FSTAB_FILE"
  sudo chmod 644 "$SMB_FSTAB_FILE"
  rm -f "$tmp"
  log "Wrote SMB fstab snippet: $SMB_FSTAB_FILE"
}

# Merges the snippet file into /etc/fstab inside a marked block, so
# re-running this script updates the block in place instead of piling
# up duplicate lines. A timestamped backup of /etc/fstab is made first.
install_fstab_entries() {
  [[ -f "$SMB_FSTAB_FILE" ]] || die "fstab snippet not found: $SMB_FSTAB_FILE"

  sudo cp /etc/fstab "/etc/fstab.bak-$(date +%Y%m%d-%H%M%S)"

  local tmp
  tmp="$(mktemp)"

  if grep -qF "$FSTAB_MARKER_BEGIN" /etc/fstab; then
    log "Existing SMB block found in /etc/fstab - replacing it"
    awk -v beg="$FSTAB_MARKER_BEGIN" -v end="$FSTAB_MARKER_END" '
      $0 == beg { skip=1 }
      !skip { print }
      $0 == end { skip=0 }
    ' /etc/fstab > "$tmp"
  else
    log "Adding new SMB block to /etc/fstab"
    cp /etc/fstab "$tmp"
  fi

  {
    cat "$tmp"
    echo "$FSTAB_MARKER_BEGIN"
    sudo cat "$SMB_FSTAB_FILE"
    echo "$FSTAB_MARKER_END"
  } | sudo tee /etc/fstab.new >/dev/null

  sudo mv /etc/fstab.new /etc/fstab
  rm -f "$tmp"

  sudo systemctl daemon-reload
  log "/etc/fstab updated (backup saved alongside it). Run 'sudo mount -a' or reboot to apply."
}

# Runs steps 8 and 9: mount the shares now, then (unless --skip-fstab)
# persist them in /etc/fstab. Skipped entirely without a credentials file.
mount_and_persist_smb_shares() {
  if [[ "$SKIP_SMB" -eq 1 ]]; then
    log "Skipping SMB mounts (--skip-smb)"
    return
  fi

  if [[ ! -f "$SMB_CREDENTIALS_FILE" ]]; then
    warn "SMB credentials file not found: $SMB_CREDENTIALS_FILE - skipping SMB mounts and fstab entries."
    return
  fi

  mount_smb_shares

  if [[ "$SKIP_FSTAB" -eq 1 ]]; then
    log "Skipping /etc/fstab entries (--skip-fstab)"
    return
  fi

  generate_smb_fstab_file
  install_fstab_entries
}

### ---------- 10. Enable + start systemd --user units from the dotfiles ----------
# Enables and starts the awww wallpaper daemon, the changeBackground service
# and timer, then every other .service/.timer found in the stowed
# systemd/.config/systemd/user folder. Needs a running user session (user
# bus); otherwise it only prints a hint and skips.
enable_systemd_user_services() {
  if [[ "$SKIP_SERVICES" -eq 1 ]]; then
    log "Skipping systemd --user units (--skip-services)"
    return
  fi

  local unit_src_dir="$DOTFILES_DIR/systemd/.config/systemd/user"
  if [[ ! -d "$unit_src_dir" ]]; then
    warn "No systemd user units found under $unit_src_dir - skipping."
    return
  fi

  if ! systemctl --user show-environment >/dev/null 2>&1; then
    warn "systemctl --user is not reachable in this session (no user bus?) - skipping service enablement. Log into a normal graphical/user session and re-run, or run 'systemctl --user enable --now <unit>' manually."
    return
  fi

  # Pick up the freshly stowed unit files before enabling them.
  systemctl --user daemon-reload

  # awww needs its cache directory.
  if [[ ! -d "$HOME/.config/awww/" ]]; then
    log "Creating awww cache dir"
    mkdir -p "$HOME/.config/awww/"
  fi

  # The units that must run in this order: daemon first, then the background changer.
  local unit
  for unit in awww-daemon.service changeBackground.service changeBackground.timer; do
    if ! systemctl --user is-enabled --quiet "$unit"; then
      systemctl --user enable --now "$unit"
      log "Enabled $unit"
    fi
    if ! systemctl --user is-active --quiet "$unit"; then
      systemctl --user start "$unit"
    fi
  done

  # Everything else that was stowed into the user unit folder.
  local unit_file unit_name
  while IFS= read -r -d '' unit_file; do
    unit_name="$(basename "$unit_file")"
    if systemctl --user enable --now "$unit_name"; then
      log "Enabled & started: $unit_name"
    else
      warn "Failed to enable/start $unit_name - continuing with the rest."
    fi
  done < <(find "$unit_src_dir" -maxdepth 1 -type f \( -name '*.service' -o -name '*.timer' \) -print0 | sort -z)

  # Final sanity checks - warn only, never abort.
  if ! systemctl --user is-active --quiet awww-daemon.service; then
    warn "awww-daemon.service does not look active - check 'systemctl --user status awww-daemon.service'."
  fi
  if ! systemctl --user is-enabled --quiet changeBackground.service; then
    warn "changeBackground.service does not look enabled - check 'systemctl --user status changeBackground.service'."
  fi
}

### ---------- Main ----------
# Runs all steps in order. The order matters: the SSH key must be loaded
# before the dotfiles are cloned, and the dotfiles must be stowed before
# the hooks, the audio fix and the systemd units can use them.
main() {
  ensure_prereqs
  install_packages
  load_ssh_key
  load_dotfiles
  stow_all_packages
  add_shell_hooks
  install_audio_fix
  set_defaults
  install_plugins
  mount_and_persist_smb_shares
  enable_systemd_user_services
  log "Done."
}

main "$@"

# task to files
#
# 1 mount your shares - done
# 2 configure awww
# 3 configure systemd background.sh
# # 4 eval ssh-agent
#
# 1. Create the service file:

# mkdir -p ~/.config/systemd/user
# cat > ~/.config/systemd/user/ssh-agent.service << 'EOF'
# [Unit]
# Description=SSH key agent
#
# [Service]
# Type=simple
# Environment=SSH_AUTH_SOCK=%t/ssh-agent.socket
# ExecStart=/usr/bin/ssh-agent -D -a $SSH_AUTH_SOCK
#
# [Install]
# WantedBy=default.target
# EOF
#
# 2. Enable and start it:
#
# systemctl --user daemon-reload
# systemctl --user enable --now ssh-agent
#
# 3. Add to ~/.bashrc:
#
# export SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/ssh-agent.socket"
#
# 4. (Optional) Add to ~/.ssh/config so keys are auto-added on first use:
#
# Host *
#     AddKeysToAgent yes
#
# Now every shell session shares one agent on a stable socket.  You only need to run ssh-add ~/.ssh/id_ed25519 once per login (or it auto-adds via AddKeysToAgent).
