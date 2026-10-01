-- Keep only your personal keybinding overrides here. Add new bindings or
-- unbind defaults before replacing them.

-- See current bindings and descriptions:
--   omarchy menu keybindings --print

-- To disable every Omarchy default binding, set this in
-- ~/.config/hypr/hyprland.lua before require("default.hypr.omarchy"), then add
-- only the bindings you want below:
--   omarchy_default_bindings = false

-- To disable all preinstalled app/webapp bindings, set:
--   omarchy_preinstalled_bindings = false

-- Add a new binding.
-- o.bind("SUPER + SHIFT + R", "SSH", "alacritty -e ssh your-server")

-- Change an existing binding by unbinding it first, then binding the key again.
-- This example changes SUPER+SPACE from the launcher to the Omarchy root menu.
-- hl.unbind("SUPER + SPACE")
-- o.bind("SUPER + SPACE", "Omarchy menu", "omarchy-menu toggle root")

-- Disable a default binding without replacing it.
-- hl.unbind("SUPER + SHIFT + B")
-- Logitech MX Keys examples:
-- o.bind("SUPER + SHIFT + S", nil, "omarchy-capture-screenshot")
-- o.bind("SUPER + H", nil, "voxtype record toggle")
-- o.bind("SUPER + PERIOD", nil, "omarchy-shell shell toggle omarchy.emojis")
--
-- Lock Screen Explorer Plugin
hl.unbind("SUPER + SHIFT + L")
o.bind("SUPER + SHIFT + L", "Lock screen explorer", "omarchy-shell lock explore")

-- Tradingview
hl.unbind("SUPER + SHIFT + T")
o.bind("SUPER + SHIFT + T", "Tradingview", "tradingview")

-- E-Mail Tool Thunderbird
hl.unbind("SUPER + SHIFT + E")
o.bind("SUPER + SHIFT + E", "Thunderbird E-Mail, Calander ans Schedluer", "thunderbird")

-- Bitwarde App
hl.unbind("SUPER + SHIFT + K")
o.bind("SUPER + SHIFT + K", "Bitwarden", "bitwarden")
