# One of my first shots

$archUserID=1000
$archGroupID=1000
$user="push"
$userID=1033
$groupID=10033

# # arch tools
# sudo pacman -S base-devel git --noconfirm
# sudo pacman -S starship --noconfirm
# sudo pacman -S kitty --noconfirm
# #sudo pacman -S ghostty --noconfirm
# #sudo pacman -S python-gobject gobject-introspection playerctl
# sudo pacman -S hyfetch --noconfirm
# sudo pacman -S tree --noconfirm
# sudo pacman -S stow --noconfirm
# #sudo pacman -S yazi --noconfirm
# sudo pacman -S nfs-utils --noconfirm
# sudo pacman -S dnsutils --noconfirm
# sudo pacman -S rsync --noconfirm
# sudo pacman -S lsof --noconfirm
# sudo pacman -S bitwarden --noconfirm
# sudo pacman -S awww --noconfirm

# decryptomarchy volume
# cryptsetup reencrypt --decrypt --header /run/media/push/USB/archmini_luks_header /dev/sda2
# cryptsetup reencrypt --decrypt --header /tmp/archmini_luks_header /dev/sda2

# if [ "$EUID" -eq 1033 ]; then Method 2: Using id Command (POSIX Compatible)
if [ "$EUID" -eq 1000 ]; then     #Method 1: Using $EUID (Fastest for Bash)
  echo "You need a omarchy boot device (USB Stick) and restart your archmini."
  echo "After your macmini start hold immediatly control + r (alt + r), then use the usb device"
  echo "Interrupt the default install message mount / read writable and proceed with the lines below:"
  echo ""
  echo "changing $user UID 1000 to $userID"
  # sudo mount -n -o remount,rw /
  # usermod -u 1033 push
  # find / -user 1000 -exec chown 1033 {} \;
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
# firstly install yay itself
#git clone https://aur.archlinux.org/yay.git
#cd yay
#makepkg -si
#yay --version
# tools install via yay
#yay -Sy brave-nightly
#yay -Sy brave-bin
#yay -Sy inkscape
#yay -Sy gimp
#yay -S tradingview

# git clone -b archmini --single-branch https://github.com/pushiboo/dotfiles.git

# [ ! -d ~/dotfiless/ ] && echo "Git clone of your repo didn't worked"  
if [ ! -d ~/dotfiles/ ] ; then
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



