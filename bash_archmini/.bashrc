# All the default Omarchy aliases and functions
# (don't mess with these directly, just overwrite them here!)
source ~/dotfiles/bash/bash/rc

# set editor
# export EDITOR=nvim
# export SUDO_EDITOR=$EDITOR
# Add your own exports, aliases, and functions here.
# exports
# export SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/ssh-agent.socket"
# checkKeys=$(
#   ssh-add -l >/dev/null
#   echo $?
# )
# keys2Load=("${HOME}/.ssh/omarchy_ed25219" "")
# if [[ -z $SSH_AUTH_SOCK ]]; then
#   echo "WARNING: Your ssh agent service is not up and running."
# else
#   # if ! ssh-add -l >/dev/null; then
#   if [[ "$checkKeys" -ne 0 ]]; then
#     ssh-add ${keys2Load[@]} #| sed 's/,//g' # >/dev/null
#     [[ $? -ne 0 ]] && echo "WARNING: not able to load ssh keys"
#     # else
#     # echo "SUCCESFULL: Added keys to ssh agent service"
#   fi
# fi
# aliases
# alias ll="ls -al"
# alias cl=clear
# alias vim=nvim
# alias dfnfs="df -Th | grep nfs"
# alias dfstat="nfsstat -m"
# Make an alias for invoking commands you use constantly
# alias p='python'
#
# Use VSCode instead of neovim as your default editor
# export EDITOR="code"
#
# Set a custom prompt with the directory revealed (alternatively use https://starship.rs)
# PS1="\W \[\e]0;\w\a\]$PS1"
eval "$(starship init bash)"
