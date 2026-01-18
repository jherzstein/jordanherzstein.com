+++
title = "Getting my Wii U Gamecube Controller to work on Bazzite"
author = ["Jordan Herzstein"]
summary = "Getting my antiquated Gamecube controller adapter to work on the modern Image-based Linux distro Bazzite (and gushing about it)"
date = 2026-01-17
lastmod = 2026-01-17T21:25:29-05:00
tags = ["technology", "bazzite", "unversal-blue", "gaming"]
draft = false
[menu]
  [menu.posts]
    identifier = "getting-my-wii-u-gamecube-controller-to-work-on-bazzite"
+++

## A Preamble on my Bazzite Exprience {#a-preamble-on-my-bazzite-exprience}

Post COVID I slowly got back into playing games after a very long break. When I was teenager I dedicated a lot of my time to competitive Smash Bros., but when the pandemic hit I lost interest due to everything being online. Fast forward 5 years I've just finished university, I just built a PC to be used for some machine learning tasks, and almost exclusively on Linux inside the home. With some of this newfound time and available hardware I thought it was time to create a nice Linux setup to start enjoying games again.

For this system, I chose a Linux OS I thought would be easiest out of the box for games and landed on [Bazzite](https://bazzite.gg/) to use as a guest VM on my Proxmox host via gpu passthrough. I've been using this setup for the past few months, and besides all my games working seamlessly under Steam with Proton, Bazzite has blown me away with how close to zero maintenance it has been as well as it's stability. I've been quite comfortable using Linux systems for quite some time now, I'm not the type of person to shy away from tinkering with my system, but even so when I needed an OS specifically to get out of my way of playing games, Bazzite has been a _first-class_ experience.

To explain why Bazzite has been a first-class experience, "it just works!"™ Linux OS, it has to be understood where Bazzite comes from and how it's developed. Bazzite, aside from being a gaming focused Linux distro, comes from a family of custom images based on the Fedora Atomic Destkop created by the commuity project [Universal Blue](https://universal-blue.org/) (<a href="#citeproc_bib_item_4">Bazzite project, Universal Blue, n.d.</a>; <a href="#citeproc_bib_item_11">Universal Blue, n.d.</a>). Universal Blue doesn't just create a fork the Fedora Atomic OSes, but has a special focus on creating bootable containers "cloud native technologies" in a continuous deployment model which I find extremely innovative for the Linux Desktop. What this means is Universal Blue projects like Bazzite are essentially software and services packaged in a container (via bootc) and distributed through GitHub (<a href="#citeproc_bib_item_5">CNCF, n.d.</a>; <a href="#citeproc_bib_item_2">bazzite project, n.d.-a</a>). Each commit automatically builds a new container image with Fedora Atomic Desktop as a base. These container images are installed on the end user's system in the background and applied on reboot (<a href="#citeproc_bib_item_7">Nicknamenick 2025</a>). Updates are applied atomically, which I'd describe as being "all-or-nothing" in the sense that updates either work or they don't but they never break mid-way.

The benefits of this atomic system deployed via bootable containers with an automated approach are numerous. For one, if you find problems with the new update, you can easily rollback your system to the previous bootable image kept on your system while retaining user data, or any of the images kept on the repository which, in the case of Bazzite, are retained over the past ninety days (<a href="#citeproc_bib_item_9">Red Hat, Inc., n.d.</a>; <a href="#citeproc_bib_item_4">bazzite project, Universal Blue, n.d.</a>). The image that you are using is essentially the same that everyone else is using, including the developers themselves. It also allows for a lot of you want to try out a new desktop but don't want to mess up your system or lose your data, simply rebase your image onto one that uses a different destkop. It's fantastic.

This kind of approach may seem kind of strange to a typical Linux geek that hasn't come across it and has mostly used traditional Linux distros like Arch or Ubuntu, but it's truly something that you need to get your hands on yourself to understand. Every day I've been using Bazzite and learning more about Universal Blue I've found myself becoming more of a believer, and I'm honestly pretty tempted to move a lot of my other systems and servers over as well.


## Guide Prerequisites {#guide-prerequisites}

This guide assumes the following:

-   You're running a Bazzite system on `bazzite` or `bazzite-gnome`, though I'd expect virtually any Universal Blue desktop image to work fine. (Not sure if this works with gamescope)
    -   ergo systemd.
-   You're using an official GameCube Controller Adapter for Wii U. The device ID is `057e:0337`, you can confirm your device with `lsusb`.

You can probably do a lot of the same stuff here with other systems and setups, but a lot of this guide assumes we're working with an immutable filesystem rather than a traditional Linux distro. In other words, if you're not on Bazzite there are probably simpler ways to do this.


### Creating a DistroBox Environment {#creating-a-distrobox-environment}

The first way we can get the tool working on our system is by building from source as suggested on the github repo, however, in order to get the proper build tool dependencies on Bazzite would be by installing packages with `rpm-ostree`, generally referred to as "layering" for fedora atomic OSes (<a href="#citeproc_bib_item_9">Red Hat, Inc., n.d.</a>). Layering is not recommended for Bazzite and should be used as a last resort for system level changes, otherwize sticking to containers, flatpaks, and user-space changes to get things to work on your system (<a href="#citeproc_bib_item_3">Bazzite project, n.d.-b</a>). Thus, in spirit of sticking to containerized workflows with ublue OSes I decided to do this with distrobox instead (<a href="#citeproc_bib_item_6">Distrobox 2024</a>). Distrobox allows you to deploy virtually any Linux distro in a container. We can compile the package from source inside the container or in my case use an Arch Linux container to install it through the AUR (<a href="#citeproc_bib_item_1">Aurweb Development Team, n.d.</a>).

Bazzite comes with [DistroShelf](https://github.com/ranfdev/DistroShelf), a GUI frontend for distrobox, so you can install your container through there, or through the traditional cli method (<a href="#citeproc_bib_item_8">Ranfdev, n.d.</a>). We will call our container `Arch` based on the `ublue-os/arch-distrobox:latest` image.

{{< highlight sh >}}
distrobox-create --name Arch --image ghcr.io/ublue-os/arch-distrobox:latest
{{< /highlight >}}

Wait for the container to set up, then we can enter our new container.

{{< highlight sh >}}
distrobox enter Arch
{{< /highlight >}}


### Installing wii-u-gc-adapter with the AUR {#installing-wii-u-gc-adapter-with-the-aur}

The tool we will be using to get our adapter to work is called `wii-u-gc-adapter`, the purpose of the tool is pretty self explainatory (<a href="#citeproc_bib_item_10">ToadKing, n.d.</a>). For this we need to first install the `yay` onto our system to access the AUR.

{{< highlight sh >}}
sudo pacman -S git base-devel

git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si
{{< /highlight >}}

Finally, we install the `wii-u-gc-adapter` tool.

{{< highlight sh >}}
yay -S wii-u-gc-adapter
{{< /highlight >}}

Try to run `wii-u-gc-adapter` still in the container with the adapter connected, and you should see the following

{{< highlight nil >}}
adapter 0x55d493db4a70 connected
connecting on port 0
{{< /highlight >}}

You can verify everything is working by opening steam in big picture mode, it should be immediately recognized by Steam.


### Make a Systemd Daemon {#make-a-systemd-daemon}

Since we don't want to manually enter a command each time we want to play a game with a gamecube controller, we can set it up as a user-level daemon to run in the background with systemd. Create a new file using the following `~/.config/systemd/user/wii-u-adapter.service`.

{{< highlight systemd >}}
[Unit]
Runs=Tool for using the Wii U GameCube Adapter on Linux.

[Service]
Type=simple
ExecStart=distrobox enter Arch -- wii-u-gc-adapter
ExecStop=distrobox stop --yes Arch
Restart=always
RestartSec=5

[Install]
WantedBy=default.target
{{< /highlight >}}

Very simply, this systemd service will start to execute on the startup process, by entering the distrobox container and running `wii-u-gc-adapter`. When the daemon is stopped, it will force stop the container and any of it's processes.

Now enable and start the service.

{{< highlight sh >}}
systemctl --user enable wii-u-gc-adapter.service
systemctl --user start wii-u-gc-adapter.service
{{< /highlight >}}

You can view the status of the service to see it active and running.

{{< highlight sh >}}
systemctl status wii-u-gc-adapter.service
{{< /highlight >}}

Ok that's it, happy gaming on Bazzite with your decade+ old gamecube controller adapter!


## References {#references}

<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>aurweb Development Team. n.d. “AUR Home.” <a href="https://aur.archlinux.org/">https://aur.archlinux.org/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>bazzite project. n.d.-a. “Dictionary and Terminology - Bazzite Docs.” <a href="https://docs.bazzite.gg/General/terms/">https://docs.bazzite.gg/General/terms/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_3"></a>———. n.d.-b. “Installing and Managing Applications - Bazzite Docs.” <a href="https://docs.bazzite.gg/Installing_and_Managing_Software/">https://docs.bazzite.gg/Installing_and_Managing_Software/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_4"></a>bazzite project, Universal Blue. n.d. “Bazzite - the Operating System for the next Generation of Gamers.” <a href="https://bazzite.gg/">https://bazzite.gg/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_5"></a>CNCF. n.d. “Bootc-Dev/Bootc: Boot and Upgrade via Container Images.” <a href="https://github.com/bootc-dev/bootc">https://github.com/bootc-dev/bootc</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_6"></a>Distrobox. 2024. “Distrobox.” <a href="https://distrobox.it/">https://distrobox.it/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_7"></a>nicknamenick. 2025. “Updating Guide - Bazzite Docs.” <a href="https://docs.bazzite.gg/Installing_and_Managing_Software/Updates_Rollbacks_and_Rebasing/updating_guide/">https://docs.bazzite.gg/Installing_and_Managing_Software/Updates_Rollbacks_and_Rebasing/updating_guide/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_8"></a>ranfdev. n.d. “DistroShelf.” <a href="https://github.com/ranfdev/DistroShelf">https://github.com/ranfdev/DistroShelf</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_9"></a>Red Hat, Inc. n.d. “OSTree Overview.” <a href="https://ostreedev.github.io/ostree/introduction/">https://ostreedev.github.io/ostree/introduction/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_10"></a>ToadKing. n.d. “Wii-U-Gc-Adapter: Tool for Using the Wii U GameCube Adapter on Linux.” <a href="https://github.com/ToadKing/wii-u-gc-adapter">https://github.com/ToadKing/wii-u-gc-adapter</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_11"></a>Universal Blue. n.d. “Universal Blue - Powered by the Future, Delivered Today.” <a href="https://universal-blue.org/">https://universal-blue.org/</a>.</div>
</div>
