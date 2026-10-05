#!/bin/bash
# Random wallpaper per monitor via awww, and sync the lock screen to the first monitor.

BG_DIR="${1:-$HOME/.config/omarchy/backgrounds/push-night}"
# Lock explorer reads this. Verify with: ls -l ~/.local/state/omarchy/current/
LOCK_LINK="$HOME/.local/state/omarchy/current/background"

# Image files only, skipping Synology @eaDir thumbnails
mapfile -t images < <(find "$BG_DIR" -type f \
    \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) \
    ! -path '*/@eaDir/*')

if [[ ${#images[@]} -eq 0 ]]; then
    echo "No wallpapers found in $BG_DIR" >&2
    exit 1
fi

first=true
while IFS= read -r line; do
    [[ -z $line ]] && continue

    output=$(cut -d ':' -f 2 <<<"$line" | tr -d ' ')
    current=$(sed -n 's/.*image: //p' <<<"$line")

    # Random image that isn't the one currently shown (falls back to any if only one exists)
    wallpaper=$(printf '%s\n' "${images[@]}" | grep -vxF -- "$current" | shuf -n 1)
    [[ -z $wallpaper ]] && wallpaper=${images[0]}

    awww img -o "$output" "$wallpaper"

    # First monitor also drives the lock screen background
    if $first; then
        ln -sfn "$wallpaper" "$LOCK_LINK"
        first=false
    fi
done < <(awww query)
