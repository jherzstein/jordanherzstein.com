+++
title = "Mapping Caps Lock to Esc and CTRL in Xorg"
summary = "Guide on switching keymaps using xkb in Xorg"
date = 2022-10-22
tags = ["technology", "emacs", "x11", "tutorial"]
draft = false
[menu]
  [menu.posts]
    identifier = "mapping-caps-lock-to-esc-and-ctrl-in-xorg"
+++

The Emacs editor was designed in the 1980's in the era of old unix keyboards when the control key was next to the "A" key, a lot of functionality in Emacs was designed around CTRL keybindings. While there are hobbyist keyboards for that kind of layout, no real usable laptop these days would oblige without some serious changes. This has had the undesireable outcome of exasterbating repetitive strain injury (RSI) in some pretty famous programmers(<a href="#citeproc_bib_item_2">Lee 2022</a>).

Now I'm regularly using evil mode to edit files with Emacs so it shouldn't be as big of an issue for someone like myself, however, I'm not interesting in running the risk having RSI on my pinky by the time I'm 50 because I used `C-x C-f` too many times. One solution would be switching to Doom or Spacemacs or otherwise changing my `init.el` file in emacs to use the control key much less. Many people use xmonad to change keyboard layouts as well. However, I feel like those solutions are a bit overkill, and I found a decent solution for my case without having to change very much about my system using xkb, which is how keyboard codes are handled in Xorg(<a href="#citeproc_bib_item_3">Unknown 2024</a>).


## The Guide {#the-guide}

The main inspiration of this tutorial comes from Ben Davis on github who outlined a very similar guide but for making Capslock into an Esc and Mod4 key(<a href="#citeproc_bib_item_1">Davis 2018</a>).


### Requirements {#requirements}

This guide assumes you're using GNU/Linux or a BSD distrobution that uses xkb for the keyboard layout. You will also need `setxkbmap` installed, though that should come with Xorg by default. I'm using dwm as my window manager though everything outlined here should work on any desktop environment (I hope, please correct me if I'm wrong), even if other DE's have different ways of updating keyboard layout options as is outlined in Ben Davis's guide(<a href="#citeproc_bib_item_1">Davis 2018</a>).


### Creating user defined layout in xkb {#creating-user-defined-layout-in-xkb}

First we define our custom layout by creating the file `/usr/share/X11/xkb/symbols/custom_opts`. We put in the following to map Capslock to escape, and make it act as a control key when in combination with other keys.

```nil
// Make Caps another escape key when pressed once while simultaneously having functionality of control.
xkb_symbols "ctrl_esc" {
    key <CAPS> { [ Escape ] };
    modifier_map Control { <CAPS>};
};
```

Now edit `/usr/share/X11/xkb/rules/evdev` and add a new line in the `! option = symbols` section:

```nil
custom:ctrl_esc = +custom_opts(ctrl_esc)
```

Edit `/usr/share/X11/xkb/rules/evdev.lst` and add a new line the `! option` section:

```nil
custom:ctrl_esc  Make Caps Lock an additional ESC and CTRL
```


### Updating Keyboard layout {#updating-keyboard-layout}

We can apply these changes from the command line using `setxkbmap`. `setxkbmap` specifies the keyboard layout to be used based on the specified based on the components in `/usr/share/X11/xkb/` that we were just changing. Run the command with the `-option` flag and the name of our custom layout rules:

```sh
setxkbmap -option "custom:ctrl_esc"
```

To run this automatically at the start of your xorg session, go into your `.xinitrc` file (either in your home directory or `/etc/X11/xinit/xinitrc`) and add the above command. Now when your Xorg session is restarted this keymapping will begin working.


## References {#references}

<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>Davis, Ben. 2018. “Mapping Caps Lock to Simultaneous Esc and Super (Mod4) · GitHub.” <a href="https://gist.github.com/bendavis78/e8cc8371499b52ac276fbe864247fdb7">https://gist.github.com/bendavis78/e8cc8371499b52ac276fbe864247fdb7</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>Lee, Xah. 2022. “Famous Programers with Repetitive Strain Injury.” <a href="http://xahlee.info/emacs/emacs/emacs_hand_pain_celebrity.html">http://xahlee.info/emacs/emacs/emacs_hand_pain_celebrity.html</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_3"></a>Unknown. 2024. “X Keyboard Extension - ArchWiki.” <a href="https://wiki.archlinux.org/title/X_keyboard_extension">https://wiki.archlinux.org/title/X_keyboard_extension</a>.</div>
</div>
