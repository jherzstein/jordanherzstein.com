+++
title = "Overengineering Waking Up: ESPHome RGB Lightbulb in Home Assistant"
summary = "I got bored, so I've decided to overcomplicated my morning routine"
date = 2025-08-13
lastmod = 2025-08-13T21:45:27-04:00
tags = ["technology", "tutorial", "home-assistant"]
draft = false
[menu]
  [menu.posts]
    identifier = "overengineering-waking-up-esphome-rgb-lightbulb-in-home-assistant"
+++

I used to have one of those sunrise alarm clocks in high school, I mainly stopped using it because micro-usb port for powering it was pretty flimsy and would fall out constantly. However, I still want to have something similar so instead of getting a new one like a normal person I decided to overengineer my own alarm clock with a wifi RGB LED lightbulb. Using that I made an [automation blueprint](https://github.com/jherzstein/ha_exponential_sunrise_alarm) to tie it all together, which I've been using since May and you are free to use for yourself.


## Guide {#guide}

For this guide assumes that you have the following prerequesites:

-   Athom Technology [E14 Color Bulb for ESPHome](https://www.athom.tech/blank-1/e14-color-bulb-for-esphome)
-   A device running Home Assistant core
-   Docker compose


### Athom RGBCT Light start {#athom-rgbct-light-start}

-   Power on Athom Light
-   Connect to Athom Light AP
-   Go to 192.168.4.1
-   Put in 2.4GHz wifi SSID and password
-   Take note of the domain, it should be automatically assigned to something like <http://athom-rgbct-light-xxxxxx.lan/>. I suggest going into your router or whatever you have managing dns and dhcp and setting up a route so that the ip and mac address of the Athom light bulb always uses that domain.


### Setting up ESPHome Server {#setting-up-esphome-server}

Put the following in `compose.yaml`

{{< highlight yaml >}}
version: '3'
services:
  esphome:
    container_name: esphome
    image: esphome/esphome
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: always
    privileged: true
    network_mode: host
{{< /highlight >}}

ESPHome should start on port 6052 by default, so make sure you have that port open on your machine's firewall. Then simply start up the container in the background with `docker compose up -d`. Open up your browser and you should start with the following:

<center>
  <div style="max-width: 100%;" >
    <figure class="frame" style="max-width: 100%;">
      <img src="/images/blog/Screenshot_Dashboard-ESPHome.png"  />
    </figure>
  </div>
</center>


### Athom Light Configuration {#athom-light-configuration}

First, inside the folder you assigned for your `/config` docker volume for esphome server, fill out the following in `secrets.yaml`

{{< highlight yaml >}}
# Your Wi-Fi SSID and password
wifi_ssid: "IOT-WiFi-SSID"
wifi_password: "Password"
{{< /highlight >}}

Next, you can find athom's RGBCT light configurations on their github under [athom-rgbct-light.yaml](https://github.com/athom-tech/athom-configs/blob/main/athom-rgbct-light.yaml). Place this file in the configuration folder.

There are a few changes I've made to the default configuration file for the athom light. Namely, I've included my own 32-byte base64-encoded string as the api key which I define in the yaml file:

{{< highlight yaml >}}
api:
  encryption:
    key: # Place 32-byte base64-encoded string for your api key
{{< /highlight >}}

I also like to put my IOT devices on a separate hidden wifi network isolated from my other devices, so I put in the configuraiton to search for wifi networks with hidden SSIDs and put in our secrets from earlier as well.

{{< highlight yaml >}}
...
wifi:
  networks:
    - hidden: True
      ssid: !secret wifi_ssid
      password: !secret wifi_password
  domain: "${dns_domain}"
...
{{< /highlight >}}

Next you can compile and install. You also have the option of grabbing your API key here from the UI as we definined in the configuration yaml file.

<center>
  <div style="max-width: 100%;" >
    <figure class="frame" style="max-width: 100%;">
      <img src="/images/blog/Screenshot_Dashboard-ESPHome_Install.png"  />
    </figure>
  </div>
</center>

If you put in the domain of the athom light correctly, you can install the update wirelessly through ESPHome.

<center>
  <div style="max-width: 100%;" >
    <figure class="frame" style="max-width: 100%;">
      <img src="/images/blog/Screenshot_Dashboard-ESPHome_Wireless_OTA_Install.png"  />
    </figure>
  </div>
</center>


### ESPHome Home Assistant Integration {#esphome-home-assistant-integration}

From Home assistant go into ****Settings &gt; Devices &amp; services &gt; Add Integration****. Enter "ESPHome" into the search bar for an ESPHome integration.

<center>
  <div style="max-width: 100%;" >
    <figure class="frame" style="max-width: 100%;">
      <img src="/images/blog/Screenshot_HA_Add_ESPHome_Integration.png"  />
    </figure>
  </div>
</center>

From there select ESPHome as your integration, then enter the hostname/ip address and port for your api (default 6053).

<center>
  <div style="max-width: 100%;" >
    <figure class="frame" style="max-width: 100%;">
      <img src="/images/blog/Screenshot_HA_Enter_RGB_Lightbulb_IP.png"  />
    </figure>
  </div>
</center>

Then enter in the encryption key we defined in our athom light yaml configuration.

<center>
  <div style="max-width: 100%;" >
    <figure class="frame" style="max-width: 100%;">
      <img src="/images/blog/Screenshot_HA_Enter_RGB_Lightbulb_API.png"  />
    </figure>
  </div>
</center>

That's it, you've now set up an RGB lightbulb running ESPHome in Home Assistant!
