# All the default Omarchy aliases and functions
# (don't mess with these directly, just overwrite them here!)
source ~/.local/share/omarchy/default/bash/rc

# Add your own exports, aliases, and functions here.
# exports
export SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/ssh-agent.socket"
# aliases
alias ll="ls -al"
alias cl=clear
alias vim=nvim
alias dfnfs="df -Th | grep nfs"
alias dfstat="nfsstat -m"
# Make an alias for invoking commands you use constantly
# alias p='python'
#
# Use VSCode instead of neovim as your default editor
# export EDITOR="code"
#
# Set a custom prompt with the directory revealed (alternatively use https://starship.rs)
# PS1="\W \[\e]0;\w\a\]$PS1"
eval "$(starship init bash)"
