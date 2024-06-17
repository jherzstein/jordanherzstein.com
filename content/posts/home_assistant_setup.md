+++
title = "Booting DietPi on an SSD and installing Home Assistant in Docker"
summary = "Setting up home assistant with docker compose on a Raspberry Pi 4 running DietPi."
date = 2024-06-16
lastmod = 2024-06-16T23:33:01-04:00
tags = ["rpi", "home-assistant", "dietpi", "technology", "tutorial"]
draft = false
[menu]
  [menu.posts]
    identifier = "booting-dietpi-on-an-ssd-and-installing-home-assistant-in-docker"
+++

I have been eyeing home assistant for quite a bit but haven't had the oppourtunity to do something with it until a family member wanted to set up some iot appliances and wanted all of them to be integrated into one interface, and I was more than happy to get involved. I first wanted to get a more advanced router set up to isolate everything iot from the main lan. I ended up copying my an openwrt archive from the linksys router I got [last year](/posts/summer_2023_projects/#img-src-images-blog-openwrt-icon-dot-png-width-10-openwrt). Unfortunately I got the wrong linksys router by accident at my first go at it which set me back by about a week. Alas, I was still able to boot up a Raspberry Pi 4 with Home Assistant to start tinkering with, which I spent a little time a couple of Saturdays ago doing. I since have moved over some lutron configurations which I may write about if I think it's interesting enough and doesn't divulge anything too private. This guide should get you to a simple starting place (most of which is just taken from DietPi and Home Assitant documentation) but I will document it here regardless.


## Prerequisites {#prerequisites}

This guide assumes that you already have the following:

-   A Raspberry Pi 4
-   An external SSD
-   A usb to sata connector
-   A separate computer or laptop with a usb port.
-   Optional: Ethernet cable


### Flashing DietPi onto an SSD {#flashing-dietpi-onto-an-ssd}

First it's important to mention that my choice to boot from an SSD was intentional, as Home Assistant will be doing a lot of writes, it's important to choose a storage device that is less prone to wearing out than a micro SD card. Additionally, despite needing to adapt from a USB 3.0 port, read/write speeds should also be faster than a micro SD card. Doing this from a Raspberry Pi 4 is fairly simple, it only required me to flash the operating system to the drive and then turn on the pi. You can download their Raspberry Pi 2/3/4/Zero 2 Dietpi image from their website and mostly follow documentation for the installation steps (<a href="#citeproc_bib_item_1">DietPi Team 2024a</a>). The installation steps on their site show you how to install the image via balenaEtcher or rufus, though in my case using linux I simply used `dd` to flash the image (<a href="#citeproc_bib_item_3">DietPi Team 2024c</a>).

{{< highlight bash >}}
sudo dd bs=4M if=/path/to/DietPi_RPi-ARMv8-Bookworm.img of=/dev/xvdi oflag=sync status=progress
{{< /highlight >}}

Here `bs` denotes the block size, `oflag=sync` syncs after each output block, and `status=progress` shows the progress of writing the image to the SSD (though the full write should take only about 30 seconds).

Next you should have two new partitions on your SSD, one will be your root file system and the other will contain the `/boot` partition. In my case I needed to make some changes to my system before booting to make sure that I could headlessly access the device, so I mounted the `/boot` partition to my computer to change some settings. Since I don't have the proper router I wanted at the time of doing this I didn't make any changes to the static ip settings in `dietpi.txt`. You can change this later in a number of ways such as assigning the static ip on the router side or through `dietpi-config`. I did enable `AUTO_SETUP_NET_WIFI_ENABLED` just in case ethernet didn't work, and I added my wifi SSID and password in `dietpi-wifi.txt` as the documentation tells you how to do (<a href="#citeproc_bib_item_3">DietPi Team 2024c</a>). Keep in mind that `dietpi-wifi.txt` will remove itself after first boot so make sure you've entered everything correctly.

After unmounting the drive, I connected the SSD to the USB 3.0 port which will be one of the blue USB ports on the pi 4. I connected an ethernet cable directly from the pi to my router. Be patient during the first boot process as it might take a bit to boot up, the pi should start with a small red and green led turning on, then the green port will turn off, and the red led will start slightly flickering but it's very subtle. If you look at the ethernet port on the router, a solid green LED means that a connection has been established, and the orange or green led flickering means that data is being transmitted. From here the dietpi documentation tells you how to find the pi using `nmap`, though I was also able to find the pi through my router's web portal. If you haven't changed the DietPi's default hostname through `dietpi.txt`, you should be able to find the proper device and it's local ip address easily by finding its hostname "DietPi". Then I simply used ssh to connect to the pi:

{{< highlight sh >}}
ssh root@<local-ip-address-of-pi>
{{< /highlight >}}


### After booting up, installing docker and docker compose and creating a Home Assistant Container. {#after-booting-up-installing-docker-and-docker-compose-and-creating-a-home-assistant-container-dot}

I followed the DietPi TUI setup process which was pretty straight forward (<a href="#citeproc_bib_item_3">DietPi Team 2024c</a>). I installed the docker and docker compose packages through `dietpi-software` which should become available as the last step of the installation process (<a href="#citeproc_bib_item_2">DietPi Team 2024b</a>). I did this more or less because it was the laziest and most automatic way of doing it as DietPi has scripts to install everything needed which saved me 2 minutes. If you'd rather avoid using `dietpi-software` you can also follow the official steps to install docker (<a href="#citeproc_bib_item_4">Docker Inc. 2024</a>).

As an aside, after installation, I would suggest changing your ssh server to prevent root logins as this is generally good practice for preventing brute force ssh logins. Assuming you're using the default ssh server that DietPi uses, `dropbear`, you can disable root password logins by going into `/etc/default/dropbear` and changing a single line in the configuration (<a href="#citeproc_bib_item_7">Sarmisak 2015</a>).

{{< highlight nil >}}
DROPBEAR_EXTRA_ARGS=-g -w
{{< /highlight >}}

`-w` prevents root logins of any kind and `-g` prevents password root logins (<a href="#citeproc_bib_item_6">Johnson, n.d.</a>).

Regardless, next I would switch to another user with sudo privilleges, such as `dietpi`, using `su - dietpi`. I created a new subdirectory in  to put my `compose.yml` to launch home assistant in docker, and I launched the container in this directory as follows.

{{< highlight sh >}}
mkdir -p ~/dockerapps/Home\ Assistant/
cd ~/dockerapps/Home\ Assistant/
{{< /highlight >}}

Using the template provided by Home Assistant, I made one minor change to their yml file to change the config directory to be the one I just created (<a href="#citeproc_bib_item_5">Home Assistant 2024</a>).

{{< highlight yml >}}
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
      - /run/dbus:/run/dbus:ro
    restart: unless-stopped
    privileged: true
    network_mode: host
{{< /highlight >}}

Then start up docker compose.

{{< highlight sh >}}
sudo docker compose up -d
{{< /highlight >}}

From here it should take a few minutes to pull all of the proper docker images and extract them. Once it has finished setting up, your home assistant onboarding portal should be at `http://<local-ip-address-of-pi>:8123`. You now have a starting place to use Home Assistant; happy home assisting!


## References {#references}

<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>DietPi Team. 2024a. “DietPi - Lightweight Justice for Your SBC!” <a href="https://dietpi.com/#download">https://dietpi.com/#download</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>———. 2024b. “Getting Started with DietPi - DietPi.Com Docs.” <a href="https://dietpi.com/docs/getting_started/#dietpi-software-choose-the-software-you-need">https://dietpi.com/docs/getting_started/#dietpi-software-choose-the-software-you-need</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_3"></a>———. 2024c. “How to Install DietPi - DietPi.Com Docs.” <a href="https://dietpi.com/docs/install/">https://dietpi.com/docs/install/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_4"></a>Docker Inc. 2024. “Install Docker Engine on Debian | Docker Docs.” <a href="https://docs.docker.com/engine/install/debian/#install-using-the-repository">https://docs.docker.com/engine/install/debian/#install-using-the-repository</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_5"></a>Home Assistant. 2024. “Linux - Home Assistant.” <a href="https://www.home-assistant.io/installation/linux#docker-compose">https://www.home-assistant.io/installation/linux#docker-compose</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_6"></a>Johnson, Matt. n.d. “Dropbear(8): Lightweight SSH2 Server - Linux Man Page.”</div>
  <div class="csl-entry"><a id="citeproc_bib_item_7"></a>sarmisak. 2015. “Optional Security - Disable Root Login - General Discussion - DietPi Community Forum.” <a href="https://dietpi.com/forum/t/optional-security-disable-root-login/34">https://dietpi.com/forum/t/optional-security-disable-root-login/34</a>.</div>
</div>
