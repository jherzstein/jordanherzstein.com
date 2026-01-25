+++
title = "/uses"
author = ["Jordan Herzstein"]
date = 2026-01-25
lastmod = 2026-01-25T15:29:51-05:00
draft = false
[menu]
  [menu.uses]
    identifier = "uses"
+++

Technology stuff that I am using, inspired by [uses.tech](https://uses.tech).


## Site Mirrors and Tools {#site-mirrors-and-tools}

Right now I deploy this website via github pages and then mirror all of it on neocities.

-   [Github](https://docs.github.com/en/pages) ([Mirror](https://jordanherzstein.com))
-   [Neocities](https://neocities.org) ([Mirror](https://jordanherzstein.neocities.org))
-   [Hugo](https://gohugo.io/) - Static site generator
-   [ox-hugo](https://ox-hugo.scripter.co/) - Org exporter to Markdown for Hugo on Emacs


## My Machines {#my-machines}

This includes computers for my personal use as well as homelab/server things.


### My Laptop {#my-laptop}

My current laptop is a Thinkpad T430 that got me through my last 1<sup>1/2</sup> years of undergrad. I bought it for $100 off of Kijiji in Summer 2023, and have spent more money on a few upgrades and repairs since then. I started with Qubes-OS to compartmentalize my workflows, and now I'm using Secureblue Sericea (Sway). I always love using window managers for efficiency on my laptops, I used AwesomeWM on Qubes and I now use Sway with Secureblue.

-   **Thinkpad T430**
-   **CPU:** Intel(R) Core(TM) i7-3840QM (4) @ 3.80 GHz
-   **RAM:** 16GB DDR3
-   **OS:** Secureblue (previously Qubes-OS)
-   **Storage:** 500GB
-   **[fastfetch output](/images/fastfetch.png)**

I previously used a Thinkpad T400 that I librebooted but it died like a year ago. 🙁


### PC (Destkop+Homelab) {#pc--destkop-plus-homelab}

I built a PC that I use as a hypervisor server running Proxmox for local LLM inferencing, gaming on Bazzite, Jellyfin LXC for hardware transcoding, and backup PiHole+Unbound DNS.
Here is the build:

-   **Case:** Corsair 4000D Airflow
-   **Motherboard:** MSI Pro Z790-P
-   **CPU:** Intel i7 12700K
-   **Cooler:** Thermalight Peerless Assasin 120 SE
-   **GPU:** Radeon RX 7900 XTX
-   **Power Supply:** Corsair RM860e
-   **RAM:** 32 GB DDR5
-   **OS:** Proxmox VE 9


### PC (Homelab+NAS) {#pc--homelab-plus-nas}

I got a somewhat ancient hand-me-down of a PC which I've repurposed as a NAS for the family and use for my homelab stuff. Nothing to super write home about but it gets the job done.

-   **CPU:** Intel i5-4570 (4) @ 3.600GHz
-   **RAM:** 32GB DDR3
-   **OS:** Proxmox VE 9
-   **Storage:** 500GB SSD (OS), 2x4TB ZFS Mirror Pool (Storage, managed by TrueNAS VM)


### SBC (Homelab) {#sbc--homelab}

I first started homelabbing with my RockPro64 running DietPi, still mess around with it but it's not running anything too mission critical currently.


### Firewall/Router {#firewall-router}

I have a custom router at home for better customizability and security compared to the default modems provided by ISPs. I use this for setting firewall rules, VLANs, Wi-Fi Networks, and VPN access.

-   **Linksys E8450**
-   **OS:** OpenWrt


## General Software Tools {#general-software-tools}

Software that I use for practical purposes, mostly on my laptop.

-   **Browser:** [Trivalent](https://github.com/secureblue/Trivalent) (previously [LibreWolf](https://librewolf.net/))
-   **Documents:** [LibreOffice](https://www.libreoffice.org/)
-   **Editors:**
    -   [GNU Emacs](https://www.gnu.org/software/emacs/)
    -   [Vim](https://www.vim.org/)
-   **Notes:** [Org-roam](https://www.orgroam.com/)
-   **Password Manager:** [KeePassXC](https://keepassxc.org/)
-   **Shell:** bash
-   **Terminal:** [foot](https://codeberg.org/dnkl/foot)
-   **Terminal Multiplexer:** [tmux](https://github.com/tmux/tmux)


## Mobile Phone {#mobile-phone}

-   **Phone**: Google Pixel 7 (unlocked)
-   **Android OS**: [GrapheneOS](https://grapheneos.org/)
-   **App Stores**: [Aurora Store](https://store.auroraoss.com/), [F-Droid](https://f-droid.org/)
    -   Notable Apps
        -   [Antennapod](https://antennapod.org/) - Podcasts
        -   [Brave Browser](https://brave.com/) (previously [none](/posts/adb_vanadium/)) - Internet
        -   Google Messages - Because not everyone uses Signal (SMS, MMS, and RCS)
        -   [Logseq](https://logseq.com/) - Able to see my Org Roam files on the go
        -   [Magic Earth](https://www.magicearth.com/) - GPS navigation, offline maps
        -   [Molly](https://molly.im) - A Signal fork for Android with security enhancements
        -   [ReadYou](https://github.com/ReadYouApp/ReadYou) - A material you style Android RSS reader
        -   [Sheltr](https://gitea.angry.im/PeterCxy/Shelter) - Separate my Work Profile apps
        -   [Termux](https://termux.dev/en/) - A Linux-like terminal on my phone
        -   [Syncthing](https://syncthing.net/) - syncs files shared with Org Roam on laptop
        -   [Wormhole](https://github.com/wormhole-app/wormhole) - transfer some files via magic-wormhole to my other machines


## Self-Hosted Services {#self-hosted-services}

-   [**Authelia:**](https://www.authelia.com/) For SSO authentication with OIDC
-   **Arr Stack** (media request and management)
    -   [**Bazarr:**](https://www.bazarr.media/) Manages Subtitles for TV/Movie collection
    -   [**BookShelf:**](https://github.com/pennydreadful/bookshelf) Book Collection Manager (Readarr's _successarr_)
    -   [**Flaresolverr:**](https://github.com/FlareSolverr/FlareSolverr) Solves CAPTCHA
    -   [**Jellyseerr**:](https://seerr.dev/) Open-source media request and discovery manager
    -   [**Lidarr:**](https://lidarr.audio/) Music Collection Manager
    -   [**Prowlarr:**](https://prowlarr.com/) The Ultimate Indexer Manager
    -   [**Radarr:**](https://radarr.video/) Movie Collection Manager
    -   [**Sonarr:**](https://sonarr.tv/) TV Collection Manager
-   **Downloaders:**
    -   [**SABnzbd:**](https://sabnzbd.org/) Usenet Downloader
    -   [**Transmission:**](https://transmissionbt.com/) Torrenting Client
-   [**FreshRSS:**](https://www.freshrss.org/) For all my RSS feeds
-   [**Immich:**](https://immich.app/) Photo backup solution
-   [**Home Assistant OS:**](https://github.com/home-assistant/operating-system) Home Automation
-   [**Jellyfin:**](https://jellyfin.org/) Media server of choice
-   [**Nextcloud All-in-One:**](https://github.com/nextcloud/all-in-one) For files
-   [**Nginx Proxy Manager:**](https://nginxproxymanager.com/) Reverse Proxy+SSL certificates
-   [**PiHole+Unbound:**](https://docs.pi-hole.net/guides/dns/unbound/) For local DNS and adblocking
-   [**TrueNAS:**](https://www.truenas.com/) For managing ZFS storage, network shares, backups


## Other Services {#other-services}

-   Code Hosting: Github
-   Domains: [Porkbun](https://porkbun.com) (previously [Namecheap](https://namecheap.com)) and [Duck DNS](https://www.duckdns.org/)
-   Email: [Proton Mail](https://mail.proton.me/)+[SimpleLogin](https://simplelogin.io/)
-   Search: [DuckDuckGo](https://duckduckgo.com/)
-   SSL: [Let's Encrypt](https://letsencrypt.org) and [Duck DNS](https://www.duckdns.org/)
-   VPN:
    -   [Tailscale](https://tailscale.com/)
    -   [Mullvad](https://mullvad.net)
    -   [Wireguard](https://www.wireguard.com/)
-   VPS: [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
