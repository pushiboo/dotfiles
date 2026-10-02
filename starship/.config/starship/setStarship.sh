# o get started configuring starship, create the following file: ~/.config/starship.toml.
mkdir -p ~/.config && touch ~/.config/starship/starship.toml
# Pastel Powerline Preset
starship preset pastel-powerline -o ~/.config/starship/starship.toml

# Gruvbox Rainbow Preset
starship preset gruvbox-rainbow -o ~/.config/starship/starship.toml

# Catppuccin Powerline Preset
# By default this preset uses the Mocha flavour of Catppucin, but you can specify any of the flavours by modifying the value of palette:
# catppuccin_mocha
# catppuccin_frappe
# catppuccin_macchiato
# catppuccin_latte

# starship preset catppuccin-powerline -o ~/.config/starship/starship.toml:gruvbox-rainbow
starship preset catppuccin-powerline -o ~/.config/starship/starship.toml:pastel-powerline
