#!/bin/bash

# name|target|symlink
entries=(
  "andreas|/mnt/smb/andreas|${HOME}/andreas"
  "docker|/mnt/smb/docker/|${HOME}/docker"
  "photos_shared|/mnt/smb/photos_shared/|${HOME}/Pictures/ds923plus"
  "web|/mnt/smb/web/|${HOME}/web"
)

for entry in "${entries[@]}"; do
  IFS='|' read -r name target link <<< "$entry"
  
  if df -T -t cifs 2>/dev/null | grep -q "$name" && [[ -d "$taget" ]]; then
    if [[ ! -e "$link" ]]; then
      ln -s "$target" "$link"
      echo "created:  $link -> $target"
    # else
    #   echo "exists:   $link"
    fi
  else
    echo "warning: could not mount $name"
  fi
done
