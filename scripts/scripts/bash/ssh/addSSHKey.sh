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
  echo "WARNING: ssh-agent socket not found at $SSH_AUTH_SOCK" >&2
  echo "  Check: systemctl --user status ssh-agent.service" >&2
  return 1 2>/dev/null || exit 1
fi

# --- Load keys if none present ---
if ! ssh-add -l &>/dev/null; then
  ssh-add -l &>/dev/null
  rc=$?
  case $rc in
    1)  # agent alive, no keys
      ssh-add "${HOME}/.ssh/archmini_ed25519" || echo "WARNING: not able to load ssh key" >&2
      ;;
    2)  # agent unreachable (shouldn't happen if socket exists)
      echo "WARNING: ssh-agent is unreachable despite socket existing." >&2
      ;;
  esac
fi
