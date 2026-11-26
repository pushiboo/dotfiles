#!/bin/bash
#
# omarchy-create-rescue-admin.sh
#
# Creates a standing second admin account ("rescue") on an Omarchy install.
# Omarchy is built around a single-user workflow, but renumbering that
# user's uid/gid safely requires doing the work from an account that holds
# no lock on the files or processes being changed. This script only creates
# the account; it does not touch the primary user at all.
#
# Idempotent: safe to re-run, does nothing if "rescue" already exists.

set -euo pipefail

RESCUE_USER="${1:-rescue}"
MIN_UID=9000
MAX_UID=9999

log() { echo "[omarchy-create-rescue-admin] $*"; }
die() { echo "[omarchy-create-rescue-admin] ERROR: $*" >&2; exit 1; }

# --- must be root ---------------------------------------------------------
if (( EUID != 0 )); then
  exec sudo -E "$0" "$@"
fi

# --- already exists? -------------------------------------------------------
if id "$RESCUE_USER" &>/dev/null; then
  log "User '$RESCUE_USER' already exists (uid=$(id -u "$RESCUE_USER")). Nothing to do."
  log "If it has no password yet, run: passwd $RESCUE_USER"
  exit 0
fi

# --- pick a free uid clearly out of the way of normal accounts -----------
FREE_UID=""
for candidate in $(seq "$MIN_UID" "$MAX_UID"); do
  if ! getent passwd "$candidate" &>/dev/null; then
    FREE_UID="$candidate"
    break
  fi
done
[[ -n "$FREE_UID" ]] || die "No free uid found in range $MIN_UID-$MAX_UID."

log "Creating '$RESCUE_USER' with uid=$FREE_UID, own personal group, wheel membership..."
useradd -m -u "$FREE_UID" -U -G wheel -s /bin/bash -c "Omarchy rescue/admin account" "$RESCUE_USER"

# --- grant sudo rights -------------------------------------------------------
# Omarchy ships with "%wheel ALL=(ALL:ALL) ALL" commented out in /etc/sudoers.
# Wheel membership alone grants nothing here. The installer instead drops a
# per-username file into /etc/sudoers.d (e.g. 04_push: "push ALL=(ALL) ALL").
# Reproduce that pattern for the rescue account rather than relying on wheel.
SUDOERS_FILE="/etc/sudoers.d/04_${RESCUE_USER}"
echo "${RESCUE_USER} ALL=(ALL) ALL" > "$SUDOERS_FILE"
chmod 440 "$SUDOERS_FILE"
if ! visudo -c -f "$SUDOERS_FILE" &>/dev/null; then
  rm -f "$SUDOERS_FILE"
  die "Generated sudoers file failed visudo check; removed it. Investigate before retrying."
fi
log "Granted sudo via $SUDOERS_FILE (visudo-validated)."

log "Account created. Set its password now (you'll be prompted, nothing is stored by this script):"
passwd "$RESCUE_USER"

log "Done. Log out and pick '$RESCUE_USER' at the SDDM greeter (or switch TTY: Ctrl+Alt+F2, login as $RESCUE_USER)."
log "From there, run omarchy-fix-user-ids.sh with sudo once 'push' is fully logged out."
