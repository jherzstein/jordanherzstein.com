+++
title = "My Setup"
author = ["Jordan Herzstein"]
date = 2024-02-06
draft = false
[menu]
  [menu.mysetup]
    identifier = "my-setup"
+++

## This Site {#this-site}

This is my personal website which I've been hosting on neocities since late 2022. I also started hosting my website on github pages in early 2024, initially through jordanherzstein.xyz but then changed my domain to [jordanherzstein.com](http://jordanherzstein.com). I might eventually migrate my website to a machine that I own such as a VPS and built through some Forgejo runner while keeping it on github as an additional mirror. The site itself is made with [Org Mode](https://orgmode.org/) using [Hugo](https://gohugo.io/) (static site generator) and [ox-hugo](https://ox-hugo.scripter.co/) (an Org exporter to Markdown for Hugo on Emacs).


## VPC {#vpc}

I'm currently using a ROCKpro64 with it's respective NAS case and PCI-e SSD interface card. It runs DietPi, which is a distrobution of Debian optimized for arm SBCs.

I recently built a PC with [dasharo coreboot firmware](https://www.dasharo.com/) that I plan to use as a hypervisor server running [Proxmox](https://www.proxmox.com/en/) for local LLM inferencing and other intensive tasks. Here is the build:

-   **Case:** Corsair 4000D Airflow
-   **Motherboard:** MSI Pro Z790-P
-   **CPU:** Intel i7 12700K
-   **Cooler:** Thermalight Peerless Assasin 120 SE
-   **GPU:** Radeon RX 7900 XTX
-   **Power Supply:** Corsair RM860e
-   **RAM:** 32 GB DDR5

I also have a lynksys router at home that I use to run openwrt for it's security, performance, and customizability, especially compared to the default modems provided by ISPs.

I'm currently using a free Oracle VPS using an Ampere quad core CPU and 24GB of RAM to host my other website [yortnet.com](https://yortnet.com). Right now I'm using it to host various internet services including my forgejo instance, a SearXNG instance, and [a private Minecraft server for free](/posts/oracle_mc_server). I hope to host more services with it in future.


## Personal Computer / Hardware {#personal-computer-hardware}

Right now I'm mosting using a Thinkpad T430 running Qubes OS with an i7-3840QM and 16GB of RAM that I corebooted myself. Last year I was daily-driving a [librebooted](https://libreboot.org/) ThinkPad T400, [specially modded](https://vid.puffyan.us/watch?v=Fs4GjDiOie8) with a quad core CPU. It runs Debian 12, and I'm guessing the only non-free software running on it is the trackpad firmware. I also have a ThinkPad P15s that dual boots Arch Linux and Windows 10. I generally use this machine a lot less because the keyboard and mouse are broken and I haven't bothered to get it fixed for the past year and a half. I like listening to music while I study or run, for that I use an ipod nano 2g with [RockBox](https://www.rockbox.org/), a free firmware replacement for music players that can also play Doom. Recently I've been loading a lot of books, manga, and even school materials onto my Kobo Libra 2 (which I keep offline). It's has been really nice on my eyes, maybe I'll get around to trying the [PineNote](https://www.pine64.org/pinenote/) for it's full consumer release.


## Cell Phone {#cell-phone}

I own an unlocked Pixel 7 running [GrapheneOS](https://grapheneos.org). The Pixel series of phones are probably the best to run either a default AOSP experience or custom ROMs to deliver the premium degoogled android experience, which is ironically on Google's very own hardware. The software experience is the best that I could ask for though the form factor and screen size are a little big for my liking. Regardless, the stuff that the GrapheneOS team are doing is very impressive, if you're interested in using it make sure you purchase a compatable pixel device that is **unlocked**. [I also removed the browser from my phone using adb](/posts/adb_vanadium/) so that it is less distracting, but if you wish to do the same proceed at your own risk.


## Software {#software}

In terms of software, Emacs is a huge part of my productivity environment, and acts as my IDE, document writer, RSS feed, and I even made this site with it! I of course use evil mode due to the extramarital affair I have with Vim. I've used a couple of window managers including dwm and awesomewm, but I'm sure I'll get to using wayland one of these years. My shell is bash, never really bothered to use anything else really. For browsing I use Librewolf, a fork of Firefox with more privacy protections by default.
