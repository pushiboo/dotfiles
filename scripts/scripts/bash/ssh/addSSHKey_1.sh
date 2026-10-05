#!/bin/bash
# addKeys.sh — load SSH keys into a systemd-managed ssh-agent

# --- Socket path ---
if [[ -z "$XDG_RUNTIME_DIR" ]]; then
    echo "WARNING: XDG_RUNTIME_DIR is not set." >&2
    return 1 2>/dev/null || exit 1
fi

export SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/ssh-agent.socket"

# --- Validate socket exists ---
if [[ ! -S "$SSH_AUTH_SOCK" ]]; then
    echo "###----------------------------------------------------###"
    echo "  WARNING: ssh-agent socket not found at $SSH_AUTH_SOCK"
    echo "  Check: systemctl --user status ssh-agent.service"
    echo "###----------------------------------------------------###"
    return 1 2>/dev/null || exit 1
fi

# --- Check if keys already loaded ---
ssh-add -l &>/dev/null
rc=$?   # use plain variable if not in a function

case $rc in
  1)  # agent alive, no keys
      keys2Load=("${HOME}/.ssh/archmini_ed25519")
      ssh-add "${keys2Load[@]}" || echo "WARNING: not able to load ssh keys" >&2
      ;;
  2)  # agent unreachable (shouldn't happen if socket exists)
      echo "WARNING: ssh-agent is unreachable despite socket existing." >&2
      ;;
esac
