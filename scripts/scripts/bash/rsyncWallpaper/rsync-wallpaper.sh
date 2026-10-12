#!/usr/bin/env bash
#
# rsync-wallpaper.sh - copies everything from SRC to DEST with rsync
#
# Settings come from the environment or from ~/.config/rsync-wallpaper.env:
#   SRC            source directory (required)
#   DEST           target directory (required)
#   MIRROR         1 = also delete files in DEST that no longer exist in SRC (default: 0)
#   REQUIRE_MOUNT  optional path that must be a mountpoint (e.g. /mnt/smb/docker),
#                  protects against copying into an unmounted, empty mount folder
#   RSYNC_OPTS     rsync options (default: "-a --partial"; for SMB/CIFS targets
#                  use "-rt --partial", because owners/permissions can't be set there)
#
# Run by hand:  SRC=/data DEST=/backup ./rsync-wallpaper.sh

set -Eeuo pipefail

CONFIG="${COPY_DATA_CONFIG:-$HOME/dotfiles/scripts/scripts/bash/rsyncWallpaper/rsync-wallpaper.env}"
# shellcheck source=/dev/null
[[ -f "$CONFIG" ]] && . "$CONFIG"

SRC="${SRC:-}"
DEST="${DEST:-}"
MIRROR="${MIRROR:-0}"
REQUIRE_MOUNT="${REQUIRE_MOUNT:-}"

log() { printf '[rsync-wallpaper] %s\n' "$*"; }
die() { printf '[rsync-wallpaper] ERROR: %s\n' "$*" >&2; exit 1; }

# --- Sanity checks ---
[[ -n "$SRC" && -n "$DEST" ]] || die "SRC and DEST must be set (see $CONFIG)"
[[ -d "$SRC" ]] || die "Source not found: $SRC"

if [[ -n "$REQUIRE_MOUNT" ]]; then
  mountpoint -q "$REQUIRE_MOUNT" || die "$REQUIRE_MOUNT is not mounted - refusing to copy"
fi

mkdir -p "$DEST"
[[ "$(realpath "$SRC")" != "$(realpath "$DEST")" ]] || die "SRC and DEST are the same folder"

# --- Allow only one run at a time ---
exec 9>"${XDG_RUNTIME_DIR:-/tmp}/rsync-wallpaper.lock"
flock -n 9 || { log "Another copy is still running - exiting."; exit 0; }

# --- Copy ---
read -ra opts <<< "${RSYNC_OPTS:--a --partial}"
opts+=(--human-readable --stats)
[[ "$MIRROR" == "1" ]] && opts+=(--delete)

log "Start: $SRC -> $DEST (mirror=$MIRROR)"
# The trailing slashes copy the CONTENTS of SRC into DEST.
rsync "${opts[@]}" -- "${SRC%/}/" "${DEST%/}/"
log "Finished successfully."
