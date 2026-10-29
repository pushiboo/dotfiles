# One of my first shots

$archUserID=1000
$archGroupID=1000
$user="push"
$userID=1033
$groupID=10033

# # arch tools
if [ "$EUID" -eq 1000 ]; then #Method 1: Using $EUID (Fastest for Bash)
  echo "You need a omarchy boot device (USB Stick) and restart your archmini."
  echo "After your macmini start hold immediatly control + r (alt + r), then use the usb device"
  echo "Interrupt the default install message mount / read writable and proceed with the lines below:"
  echo ""
  echo "changing $user UID 1000 to $userID"
  echo "
  1. Check current UID
  id -u youruser          # e.g. 1000

  # 2. Change UID (and GID to match)
  sudo usermod -u $userID $user
  sudo groupmod -g $groupID $user

  # 3. Fix file ownership outside /home (usermod handles the home dir automatically)
  sudo find / -user $archUserID -exec chown $userID {} \;
  sudo find / -group$archGroupID -exec chgrp -h $groupID {} \; 
  "
fi
# install any tools via yay
if [ ! -d ~/dotfiles/ ]; then
  echo "Git clone of your repo didn't worked"
else
  rm ~/.bash_*
  cd ~/dotfiles/
  stow bash_archmini/

  stow systemd/

  mv ~/.config/omarchy/ ~/.config/omarchy_org/
  stow omarchy/

  mv ~/.config/hypr/ ~/.config/hypr_org/
  stow hypr/

fi
