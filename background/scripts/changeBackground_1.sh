#!/bin/bash
# currBGPath=${HOME}/.config/omarchy/current/theme/backgrounds/
currBGPath=${HOME}/.config/omarchy/themes/push-night/backgrounds/
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
wallpaperLeft=$(find "$currBGPath" -type f ! -name "$(basename "$currWallLeft")" | shuf -n 1)
wallpaperRight=$(find "$currBGPath" -type f ! -name "$(basename "$currWallRight")" | shuf -n 1)
# change for each monitor the wallpaper
export SCREENLEFT=$wallpaperLeft
export SCREENRIGHT=$wallpaperRight
(echo "env = SCREENLEFT,${SCREENLEFT}; echo "env = SCREENRIGHT,${SCREENRIGHT}") > ${HOME}/.config/uwsm/env
# echo "env = SCREENLEFT,$SCREENLEFT" > ${HOME}/.config/uwsm/env
# echo "env = SCREENRIGHT,$SCREENRIGHT" >> ${HOME}/.config/uwsm/env

# echo "SCREENLEFT: $SCREENLEFT"
# echo "SCREENRIGHT: $SCREENRIGHT"
awww img -o "$screenLeft" "${wallpaperLeft}"
awww img -o "$screenRight" "${wallpaperRight}"

#echo "wallpaperLeft: $wallpaperLeft"
# awww img -o "$screenLeft" "${currBGPath}${wallpaperLeft}"
# awww img -o "$screenRight" "${currBGPath}${wallpaperRight}"
#echo "wallpaperRight: $wallpaperRight"
# Apply the selected wallpaper
# hyprctl hyprpaper reload DP-1,"$wallpaperLeft" >/dev/null 2>&1 &
# hyprctl hyprpaper reload HDMI-A-2,"$wallpaperRight" >/dev/null 2>$1 &
# hyprctl hyprpaper reload DP-1,"$wallpaperLeft" >/dev/null
# hyprctl hyprpaper reload HDMI-A-2,"$wallpaperRight" >/dev/null

#echo -e "hyprctl hyprpaper $wallpaperLeft 'DP-1, ${currBGPath}, cover'"
#echo -e "hyprctl hyprpaper $wallpaperRight 'HDMI-A-2, ${currBGPath}, cover'"
#echo -e "hyprctl hyprpaper wallpaper 'DP-1, ${wallpaperLeft}, cover'"
#hyprctl hyprpaper wallpaper "DP-1, ${wallpaperLeft}, cover"
#hyprctl hyprpaper wallpaper "HDMI-A-2, ${wallpaperRight}, cover"
# uwsm app -- swaybg -o DP-1 -i ${currBGPath}${favDagccyBG} -m fill -o HDMI-A-2 -i ${currBGPath}${favNightBG} -m fill >/dev/null 2>&1 &
# uwsm app -- swaybg -o DP-1 -i $(find $currBGPath -type f | shuf -n1) -m fill -o HDMI-A-2 -i $(find $currBGPath -type f | shuf -n1) -m fill >/dev/null 2>&1 &
