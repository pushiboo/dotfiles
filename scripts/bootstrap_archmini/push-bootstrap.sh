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
#
# Usage:
#   ./push-bootstrap.sh [options]
#
# Options (all have env-var equivalents shown in brackets):
#   -p, --packages FILE     Package list file            [PACKAGES_FILE]     (default: ./push_packages.list)
#   -k, --key FILE          SSH private key to load       [SSH_KEY_PATH]      (default: ./id_ed25519)
#   -r, --repo URL          Dotfiles git remote (SSH URL) [DOTFILES_REPO]     (required only for first clone)
#   -d, --dotfiles-dir DIR  Where the repo lives           [DOTFILES_DIR]      (default: /home/push/dotfiles)
#   -t, --target DIR        stow target (usually $HOME)    [STOW_TARGET]       (default: $HOME)
#   -b, --backup-dir DIR    Where conflicting files go      [BACKUP_DIR]        (default: ~/.dotfiles-backup-<timestamp>)
#   --smb-credentials FILE  SMB credentials file            [SMB_CREDENTIALS_FILE] (default: ~/.smbcredentials)
#   --skip-smb              Skip mounting the SMB shares
#   -h, --help              Show this help and exit
#
# Example:
#   ./push-bootstrap.sh \
#     --packages /home/push/push_packages.list \
#     --key /home/push/.ssh/id_ed25519_push \
#     --repo git@github.com:youruser/dotfiles.git

set -euo pipefail

### ---------- Defaults (overridable via flags or env vars) ----------
PACKAGES_FILE="${PACKAGES_FILE:-./push_packages.list}"
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/archmini_ed25519}"
DOTFILES_REPO="${DOTFILES_REPO:-}"
DOTFILES_DIR="${DOTFILES_DIR:-/home/push/dotfiles}"
STOW_TARGET="${STOW_TARGET:-$HOME}"
BACKUP_DIR="${BACKUP_DIR:-$HOME/.dotfiles-backup-$(date +%Y%m%d-%H%M%S)}"
DEDICATEDBRANCH='archmini'

SMB_HOST="${SMB_HOST:-ds923plus.push}"
SMB_SHARES=(andreas docker photos_shared web)
SMB_MOUNT_BASE="${SMB_MOUNT_BASE:-/mnt/ds923plus}"
SMB_CREDENTIALS_FILE="${SMB_CREDENTIALS_FILE:-$HOME/.smbcredentials}"
SMB_UID="${SMB_UID:-$(id -u)}"
SMB_GID="${SMB_GID:-$(id -g)}"
SKIP_SMB=0

### ---------- Helpers ----------
log()  { printf '\033[1;34m[push-bootstrap]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[push-bootstrap]\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31m[push-bootstrap]\033[0m %s\n' "$*" >&2; exit 1; }

usage() { sed -n '2,31p' "$0" | sed 's/^# \{0,1\}//'; }

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
    stow -v -R -d "$DOTFILES_DIR" -t "$STOW_TARGET" "$pkg_name"
  done

  if [[ "$found" -eq 0 ]]; then
    warn "No package folders found in $DOTFILES_DIR - nothing to stow."
  else
    log "Backups of any overwritten files saved under: $BACKUP_DIR"
  fi
}

### ---------- 5. Mount SMB/CIFS shares ----------
mount_smb_shares() {
  if [[ "$SKIP_SMB" -eq 1 ]]; then
    log "Skipping SMB mounts (--skip-smb)"
    return
  fi

  if [[ ! -f "$SMB_CREDENTIALS_FILE" ]]; then
    warn "SMB credentials file not found: $SMB_CREDENTIALS_FILE - skipping SMB mounts."
    return
  fi

  local share mount_point
  for share in "${SMB_SHARES[@]}"; do
    mount_point="$SMB_MOUNT_BASE/$share"
    sudo mkdir -p "$mount_point"

    if mountpoint -q "$mount_point"; then
      log "SMB share $share already mounted at $mount_point - skipping"
      continue
    fi

    log "Mounting //$SMB_HOST/$share -> $mount_point"
    sudo mount -t cifs "//$SMB_HOST/$share" "$mount_point" \
      -o "credentials=$SMB_CREDENTIALS_FILE,uid=$SMB_UID,gid=$SMB_GID,iocharset=utf8,vers=3.0"
  done
}

### ---------- Main ----------
main() {
  ensure_prereqs
  install_packages
  load_ssh_key
  # load_dotfiles
  stow_all_packages
  mount_smb_shares
  log "Done."
}

main "$@"
# task to files
# 1 mount your shares
# 2 configure awww
# 3 configure systemd background.sh 
# 4 eval ssh-agent 
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
