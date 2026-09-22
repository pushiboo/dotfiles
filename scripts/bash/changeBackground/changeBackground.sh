#!/bin/bash
# currBGPath=${HOME}/.config/omarchy/current/theme/backgrounds/
currBGPath=${HOME}/.config/omarchy/backgrounds/2push-night/
screenLeft=$(awww query | head -n 1 | cut -d ':' -f 2 | sed 's. ..g')
screenRight=$(awww query | head -n 2 | tail -n -1 | cut -d ':' -f 2 | sed 's. ..g')
SCREENLEFT=''
SCREENRIGHT=''
# screenLeft=DP-1
# screenRight=HDMI-A-2

# Get current loaded wallpaper for each screen
#currWallLeft=$(hyprctl hyprpaper listactive | grep $screenLeft | awk '{print $3}')
#currWallRight=$(hyprctl hyprpaper listactive | grep $screenRight | awk '{print $3}')

# Get a random wallpaper for each screem that is not the current one
# wallpaperLeft=$(find "$currBGPath" -type f ! -name "$(basename "$currWallLeft")" | shuf -n 1)
wallpaperLeft=$(find "$currBGPath" -type f ! -name "$(basename "$currWallLeft")" ! -path "*/@eaDir/*" ! -path "*/@eaDir" -print | shuf -n 1)   
# wallpaperRight=$(find "$currBGPath" -type f ! -name "$(basename "$currWallRight")" | shuf -n 1)
wallpaperRight=$(find "$currBGPath" -type f ! -name "$(basename "$currWallRight")" ! -path "*/@eaDir/*" ! -path "*/@eaDir" -print | shuf -n 1)   
# change for each monitor the wallpaper
export SCREENLEFT=$wallpaperLeft
export SCREENRIGHT=$wallpaperRight
# (echo "env = SCREENLEFT,${SCREENLEFT}; echo "env = SCREENRIGHT,${SCREENRIGHT}") > ${HOME}/.config/uwsm/env
echo "env = SCREENLEFT,$SCREENLEFT" > ${HOME}/.config/uwsm/env
echo "env = SCREENRIGHT,$SCREENRIGHT" >> ${HOME}/.config/uwsm/env

awww img -o "$screenLeft" "${wallpaperLeft}"
awww img -o "$screenRight" "${wallpaperRight}"
