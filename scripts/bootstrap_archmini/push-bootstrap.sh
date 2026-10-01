#!/usr/bin/env bash
#
# push-bootstrap.sh
#
# 1. Installs packages listed in an external push_packages.list file
# 2. Starts ssh-agent and loads an external private key
# 3. Clones (or updates) a dotfiles git repo into /home/push/dotfiles
# 4. Backs up any real files that would be overwritten, then stows
#    every package folder found inside the dotfiles repo with GNU stow
# 5. Mounts the SMB/CIFS shares on ds923plus.push (andreas, docker,
#    photos_shared, web)
# 6. Writes those shares into a standalone fstab-snippet file and merges
#    it into /etc/fstab so they auto-mount on reboot too
#
# Usage:
#   ./push-bootstrap.sh [options]
#
# Options (all have env-var equivalents shown in brackets):
#   -p, --packages FILE     Package list file            [PACKAGES_FILE]     (default: ./push_packages.list)
#   -k, --key FILE          SSH private key to load       [SSH_KEY_PATH]      (default: $HOME/.ssh/archmini_ed25519)
#   -r, --repo URL          Dotfiles git remote (SSH URL) [DOTFILES_REPO]     (required only for first clone)
#   -d, --dotfiles-dir DIR  Where the repo lives           [DOTFILES_DIR]      (default: /home/push/dotfiles)
#   -t, --target DIR        stow target (usually $HOME)    [STOW_TARGET]       (default: $HOME)
#   -b, --backup-dir DIR    Where conflicting files go      [BACKUP_DIR]        (default: ~/.dotfiles-backup-<timestamp>)
#   --smb-credentials FILE  SMB credentials file            [SMB_CREDENTIALS_FILE] (default: ~/.smbcredentials)
#   --skip-smb              Skip mounting the SMB shares
#   --fstab-file FILE       Standalone file holding the fstab lines [SMB_FSTAB_FILE] (default: /etc/smb-shares.fstab)
#   --skip-fstab            Skip writing /etc/fstab entries (mount-only, no auto-mount on reboot)
#   -h, --help              Show this help and exit
#   --skip-services          Skip enabling/starting the systemd --user units
#   -h, --help              Show this help and exit
#
# Example:
#   ./push-bootstrap.sh \
#     --packages /home/push/push_packages.list \
#     --key /home/push/.ssh/id_ed25519_push \
#     --repo git@github.com:youruser/dotfiles.git
#

set -euo pipefail
trap 'ec=$?; printf "\033[1;31m[push-bootstrap]\033[0m Aborted (exit %s) at line %s while running: %s\n" "$ec" "$LINENO" "$BASH_COMMAND" >&2' ERR

### ---------- Defaults (overridable via flags or env vars) ----------
PACKAGES_FILE="${PACKAGES_FILE:-./push_packages.list}"
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/archmini_ed25519}"
DOTFILES_REPO="${DOTFILES_REPO:-}"
DOTFILES_DIR="${DOTFILES_DIR:-/home/push/dotfiles}"
STOW_TARGET="${STOW_TARGET:-$HOME}"
BACKUP_DIR="${BACKUP_DIR:-$HOME/.dotfiles-backup-$(date +%Y%m%d-%H%M%S)}"

SMB_HOST="${SMB_HOST:-ds923plus.push}"
SMB_SHARES=(andreas docker photos_shared web)
SMB_MOUNT_BASE="${SMB_MOUNT_BASE:-/mnt/smb}"
SMB_CREDENTIALS_FILE="${SMB_CREDENTIALS_FILE:-$HOME/.smbcredentials}"
SMB_UID="${SMB_UID:-$(id -u)}"
SMB_GID="${SMB_GID:-$(id -g)}"
SKIP_SMB=0
SMB_FSTAB_FILE="${SMB_FSTAB_FILE:-/etc/smb-shares.fstab}"
SKIP_FSTAB=0

### ---------- Helpers ----------
log()  { printf '\033[1;34m[push-bootstrap]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[push-bootstrap]\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31m[push-bootstrap]\033[0m %s\n' "$*" >&2; exit 1; }

usage() { sed -n '2,35p' "$0" | sed 's/^# \{0,1\}//'; }

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
    --skip-smb)         SKIP_SMB=1; shift ;;
    --fstab-file)       SMB_FSTAB_FILE="$2"; shift 2 ;;
    --skip-fstab)       SKIP_FSTAB=1; shift ;;
    -h|--help)          usage; exit 0 ;;
    *) die "Unknown argument: $1 (see --help)" ;;
  esac
done

### ---------- 0. Prerequisites ----------
# git, openssh and stow are needed by this script itself, so make sure
# they exist before we even try to read the package list.
ensure_prereqs() {
  local missing=()
  for bin in git ssh-agent ssh-add stow pacman; do
    command -v "$bin" >/dev/null 2>&1 || missing+=("$bin")
  done
  # pacman itself is the package manager check; if everything except
  # pacman is missing, install via pacman. If pacman is missing this
  # is not an Arch/Omarchy system and we bail out.
  if [[ " ${missing[*]} " == *" pacman "* ]]; then
    die "pacman not found - this script targets Arch/Omarchy systems."
  fi
  local to_install=()
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
install_packages() {
  [[ -f "$PACKAGES_FILE" ]] || die "Package list not found: $PACKAGES_FILE"

  local pkgs=()
  while IFS= read -r line; do
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
load_ssh_key() {
  [[ -f "$SSH_KEY_PATH" ]] || die "SSH key not found: $SSH_KEY_PATH"
  chmod 600 "$SSH_KEY_PATH" 2>/dev/null || true

  log "Starting ssh-agent"
  eval "$(ssh-agent -s)" >/dev/null

  log "Loading key: $SSH_KEY_PATH"
  ssh-add "$SSH_KEY_PATH"
}

### ---------- 3. Load / update dotfiles repo ----------
load_dotfiles() {
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
detect_conflicts() {
  local pkg_name="$1"
  stow -n -v 2 -d "$DOTFILES_DIR" -t "$STOW_TARGET" "$pkg_name" 2>&1 \
    | sed -n -E \
        -e 's/^[[:space:]]*\*[[:space:]]*cannot stow .* over existing target (.*) since neither a link nor a directory.*/\1/p' \
        -e 's/^[[:space:]]*\*[[:space:]]*existing target[^:]*:[[:space:]]*(.*)$/\1/p' \
    | sed -E 's/ +=>.*$//'
}

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

stow_all_packages() {
  local dir pkg_name found=0

  for dir in "$DOTFILES_DIR"/*/; do
    [[ -d "$dir" ]] || continue
    pkg_name="$(basename "$dir")"
    [[ "$pkg_name" == ".git" ]] && continue
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
    log "Backups of any overwritten files saved under: $BACKUP_DIR"
  fi
}

### ---------- 5. Mount SMB/CIFS shares ----------
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

### ---------- 6. fstab entries for the SMB shares (auto-mount on reboot) ----------
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
# up duplicate lines.
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

### ---------- 7. Enable + start systemd --user units from the dotfiles ----------
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
 
  systemctl --user daemon-reload
 
  local unit_file unit_name
  while IFS= read -r -d '' unit_file; do
    unit_name="$(basename "$unit_file")"
    log "Enabling + starting: $unit_name"
    if ! systemctl --user enable --now "$unit_name"; then
      warn "Failed to enable/start $unit_name - continuing with the rest."
    fi
  done < <(find "$unit_src_dir" -maxdepth 1 -type f \( -name '*.service' -o -name '*.timer' \) -print0 | sort -z)
 
  if systemctl --user is-active --quiet awww.service; then
    log "awww daemon is active."
  else
    warn "awww.service does not look active - check 'systemctl --user status awww.service'."
  fi
}
 
### ---------- Main ----------
main() {
  ensure_prereqs
  install_packages
  load_ssh_key
  load_dotfiles
  stow_all_packages
  mount_and_persist_smb_shares
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
# Now every shell session shares one agent on a stable socket.  You only need to run ssh-add ~/.ssh/id_ed25519 once per login (or it auto-adds via AddKeysToAgent).<D-z>
