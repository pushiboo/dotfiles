#!/bin/bash
# echo "check if ssh key is already added."
checkKeys=$(
  ssh-add -l &>/dev/null
  echo $?
)
# echo "checkKeys: $checkKeys"
# define the keys you want to load, include like this var=("firstkey" "secondkey" ...)
keys2Load=("${HOME}/.ssh/archmini_ed25519")
# echo "keys2Load: $keys2Load"
# validate if a running socket exist
loadKeys() {
  if [[ -z "$SSH_AUTH_SOCK" ]]; then
    echo "###----------------------------------------------------###"
    echo "  WARNING: Your ssh agent service is not up and running."
    echo "  Please check: systemctl --user status ssh-agent.service"
    echo "###----------------------------------------------------###"
  else
    if [ "$checkKeys" -ne 0 ]; then
      ssh-add ${keys2Load[@]} #| sed 's/,//g' # >/dev/null
      [ $? -ne 0 ] && echo "WARNING: not able to load ssh keys"
    # else
    #   echo -e "success: Added keys to ssh agent service"
    #   echo -e "$(ssh-add -l)"
    fi
  fi
}
