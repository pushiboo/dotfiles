#!/bin/bash
#
# omarchy-fix-user-ids.sh
#
# Renumbers the primary Omarchy user's uid/gid to a fixed, known value
# (default: push -> uid 1033, gid 100) after a fresh install, where the
# installer/useradd assigns whatever uid/gid was next free (usually 1000).
#
# MUST be run as the "rescue" admin account (via sudo), with the target
# user (push) fully logged out: no live processes, no active session.
# Omarchy is single-user-oriented, so doing this from inside the target
# user's own session is not safe - the uid change races with systemd --user,
# Wayland, D-Bus, etc. still running under the old id.
#
# Usage:
#   sudo ./omarchy-fix-user-ids.sh [--dry-run] [target_user] [target_uid] [target_gid]
#
# Defaults: target_user=push target_uid=1033 target_gid=100

set -euo pipefail

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
  shift
fi

TARGET_USER="${1:-push}"
TARGET_UID="${2:-1033}"
TARGET_GID="${3:-100}"

LOG_FILE="/var/log/omarchy-fix-user-ids.log"
MARKER_FILE="/var/lib/omarchy-fix-user-ids.done"
BACKUP_DIR="/root/omarchy-uidgid-backup-$(date +%s)"

log() { echo "[omarchy-fix-user-ids] $*" | tee -a "$LOG_FILE"; }
die() { echo "[omarchy-fix-user-ids] ERROR: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

run() {
  if (( DRY_RUN )); then
    log "DRY-RUN: $*"
  else
    log "RUN: $*"
    "$@"
  fi
}

# --- must be root -----------------------------------------------------------
if (( EUID != 0 )); then
  die "Run this with sudo (as the rescue admin), not directly."
fi

# --- refuse to run from inside the target user's own session --------------
INVOKER="${SUDO_USER:-}"
if [[ -n "$INVOKER" && "$INVOKER" == "$TARGET_USER" ]]; then
  die "Invoked via sudo from '$TARGET_USER' itself. Log in as the rescue admin instead."
fi

# --- target user must exist -------------------------------------------------
id "$TARGET_USER" &>/dev/null || die "User '$TARGET_USER' does not exist."

# --- idempotency: already fixed? -------------------------------------------
CUR_UID=$(id -u "$TARGET_USER")
CUR_GID=$(id -g "$TARGET_USER")
if [[ "$CUR_UID" == "$TARGET_UID" && "$CUR_GID" == "$TARGET_GID" ]]; then
  log "Already at uid=$TARGET_UID gid=$TARGET_GID for '$TARGET_USER'. Nothing to do."
  exit 0
fi

# --- safety: target uid not already claimed by someone else ----------------
EXISTING_UID_OWNER=$(getent passwd "$TARGET_UID" | cut -d: -f1 || true)
if [[ -n "$EXISTING_UID_OWNER" && "$EXISTING_UID_OWNER" != "$TARGET_USER" ]]; then
  die "uid $TARGET_UID is already used by '$EXISTING_UID_OWNER'. Resolve by hand."
fi

# --- safety: no live processes or sessions for the target user -------------
if pgrep -u "$TARGET_USER" &>/dev/null; then
  pgrep -alu "$TARGET_USER" | tee -a "$LOG_FILE"
  die "'$TARGET_USER' still has live processes. Log out completely first."
fi
if loginctl list-users --no-legend 2>/dev/null | awk '{print $2}' | grep -qx "$TARGET_USER"; then
  die "'$TARGET_USER' still has an active login session. Log out completely first."
fi

log "Pre-flight OK. Fixing '$TARGET_USER': uid $CUR_UID -> $TARGET_UID, gid $CUR_GID -> $TARGET_GID."

# --- backups -----------------------------------------------------------------
run mkdir -p "$BACKUP_DIR"
for f in /etc/passwd /etc/group /etc/shadow /etc/gshadow; do
  run cp -a "$f" "$BACKUP_DIR/"
done
log "Backups of passwd/group/shadow/gshadow in $BACKUP_DIR"

OLD_UID="$CUR_UID"
OLD_GID="$CUR_GID"
OLD_PRIMARY_GROUP=$(id -gn "$TARGET_USER")

# Helper: walk every real mount, pruning virtual/kernel filesystems, and run
# a chown/chgrp for a given numeric old-id -> new-id pair.
relabel() {
  local mode="$1" old_id="$2" new_id="$3"   # mode = owner|group
  local flag
  if [[ "$mode" == "owner" ]]; then flag="-uid"; else flag="-gid"; fi

  if (( DRY_RUN )); then
    log "DRY-RUN: would relabel all files with $mode=$old_id -> $new_id across real mounts"
    return
  fi

  log "Relabeling files: $mode $old_id -> $new_id (this walks the whole filesystem, be patient)"
  find / \
    \( -path /proc -o -path /sys -o -path /dev -o -path /run \) -prune -o \
    "$flag" "$old_id" -print0 2>/dev/null \
  | xargs -0 -r chown -h --"$mode"="$new_id" 2>>"$LOG_FILE" || true
}

# --- step 1: free up target gid if something else already holds it --------
HOLDER=$(getent group "$TARGET_GID" | cut -d: -f1 || true)
if [[ -n "$HOLDER" && "$HOLDER" != "$OLD_PRIMARY_GROUP" ]]; then
  log "gid $TARGET_GID is currently held by group '$HOLDER'; moving it aside."
  FREE_GID=""
  for candidate in $(seq 997 -1 900); do
    getent group "$candidate" &>/dev/null || { FREE_GID="$candidate"; break; }
  done
  [[ -n "$FREE_GID" ]] || die "No free gid found in range 900-997 to relocate '$HOLDER'."

  run groupmod -g "$FREE_GID" "$HOLDER"
  # Files that genuinely belonged to the old "$HOLDER" group (gid still
  # numerically == TARGET_GID at this point) need to follow it to FREE_GID,
  # otherwise they'll silently end up "owned" by the target user's group.
  relabel group "$TARGET_GID" "$FREE_GID"
  log "'$HOLDER' relocated to gid $FREE_GID; its files relabeled."
fi

# --- step 2: claim the target gid for the user's own personal group -------
if [[ "$OLD_GID" != "$TARGET_GID" ]]; then
  run groupmod -g "$TARGET_GID" "$OLD_PRIMARY_GROUP"
fi

# --- step 3: renumber the uid itself ---------------------------------------
run usermod -u "$TARGET_UID" -g "$TARGET_GID" "$TARGET_USER"

# --- step 4: relabel the user's own files (uid and old personal gid) ------
if [[ "$OLD_UID" != "$TARGET_UID" ]]; then
  relabel owner "$OLD_UID" "$TARGET_UID"
fi
if [[ "$OLD_GID" != "$TARGET_GID" ]]; then
  relabel group "$OLD_GID" "$TARGET_GID"
fi

# --- marker + done -----------------------------------------------------------
if (( ! DRY_RUN )); then
  {
    echo "date=$(date -Is)"
    echo "user=$TARGET_USER old_uid=$OLD_UID new_uid=$TARGET_UID old_gid=$OLD_GID new_gid=$TARGET_GID"
  } > "$MARKER_FILE"
fi

log "Done. REBOOT NOW before logging back in as '$TARGET_USER':"
log "  sudo reboot"
