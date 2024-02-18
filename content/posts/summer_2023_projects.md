+++
title = "My Little Techy Projects Summer 2023"
summary = "I did some fun stuff this summer, including hacking my switch, switching to Qubes OS, and switching to OpenWRT on my router. Overall, a lot of switching."
date = 2023-09-20
lastmod = 2024-02-18T14:37:19-05:00
tags = ["technology", "personal", "qubes-os", "openwrt", "switch"]
draft = false
[menu]
  [menu.posts]
    identifier = "my-little-techy-projects-summer-2023"
+++

Not gonna lie I had an extremely baller summer and I'm sad that the 21st is coming soon to take it away from me. Regardless, here is a quick summary of what I was able to accomplish:

<figure>
    <center>
       <img src="/images/blog/switch_hacks_and_skulls.jpg" width="30%" />
       <figcaption>Switch? Hacked. Coreboot? Flashed. Hotel? Trivago.</figcaption>
    </center>
</figure>


## <img src="/images/blog/Switch_Logo.png" width="10%" /> Switch hacks {#img-src-images-blog-switch-logo-dot-png-width-10-switch-hacks}

I hacked my day 1 Switch with a piece of literal tinfoil.


### Some boring skippable personal info {#some-boring-skippable-personal-info}

For some reason, while everyone doubled down on gaming extra during the COVID years, I stopped almost entirely. I used to play smash bros competitively as a kid, almost exclusively to any other game and when COVID happened I was no longer able to attend tournaments. This coupled with getting sick of the Nintendo Switch online service and I was no longer having fun playing. Additionally, wider community controversy and its ensuing aftermath gave me a more negative view of the scene which deterred me from wanting to return. Pretty much quit after that, and since I was not really into any other kinds of games I stopped gaming for a couple of years unless I was at a friend's place.


### <img src="/images/blog/reentry_racoon.png" width="10%" />Actual Switch hacks {#img-src-images-blog-reentry-racoon-dot-png-width-10-actual-switch-hacks}

I know that the switch modding scene has had the past 6-7 years to mature but I did not expect it to be this easy. Of course, I reccommend following a written guide that's constantly updated (such as the [rentry](https://rentry.co/SwitchHackingIsEasy) guide) to avoid bricking your device, but it really wasn't that complicated (<a href="#citeproc_bib_item_7">Unknown 2021</a>). The basics of the hack are to short two pins in the right joycon rail and presing the + and power button to put the device in recovery mode (RCM), which I did using a literal peice of tinfoil, though there are RCM jig devices on amazon that are easier to use. Burned onto the Tegra bootROM on all early Switches has a buffer overflow vulnerability that allows hackers to slip by the bootloader signature check, allowing unsigned payloads to be pushed to the device (<a href="#citeproc_bib_item_6">Qyriad 2018</a>).

So far I've installed Atmosphere and Android on the switch with the extra microSD storage that I added, and allowing some old nintendo DS emulation as well. As an aside, BW and B2W2 were the peak of the entire franchise, with HGSS being a close second, anyone who disagrees with me here is wrong by every objective measure. Also, by complete coincidence the new Zelda game leaked the next day. I also just so happened to beat the final boss day of launch which I also started to play day of launch. Hmmmm... curious.


## <img src="/images/blog/Qubes_OS_Logo.png" width="10%" /> Now daily driving Qubes on Thinkpad T430 {#img-src-images-blog-qubes-os-logo-dot-png-width-10-now-daily-driving-qubes-on-thinkpad-t430}

I found a listing on kijiji.ca for a Thinkpad T430 for $100CAD and jumped at the oppountunity to get it. One coreboot mod and an SSD later and I'm now running Qubes OS on it! Qubes OS is a reasonably secure operating systems that compartmentalizes your digital life into different virtual machines or "qubes"(<a href="#citeproc_bib_item_9">Unknown 2024b</a>). Qubes OS is mainly focused on security, and, to be honest, made for people with threat models much higher than mine. Regardless, given my computer God complex and years of linux knowledge, Qubes OS has been working quite nicely for me. I love how much control it has given me in the little time that I've used it, it just works so much more seamlessly than a regular host OS with virtualbox or virt-manager running multiple machines. I can run multiple different environments from school to work and personal activities without making a complete mess of my computer, still sharing the same applications, and still running only one desktop environment. VMs are colour coded to create a mental separation between activities. I can easily configure how each virtual environment connects to the internet, whether it does at all, uses a vpn, or tor. I can securely share files and text between qubes with a bit of overhead, but not hard to get used to. If I want to distrohop, test another OS and/or programs without messing with my regular configuration Qubes empowers me to do that.

The coreboot image I used this time around was Skulls which I flashed using my own RaspberryPi 3B+ (<a href="#citeproc_bib_item_4">Kepplinger 2021</a>). It was easy enough to install, certainly easier than having to build my own coreboot image. It's quick to boot up compared to the stock Lenovo BIOS and I have the peice of mind that I don't have a proprietary firmware subsystem running on my computer that has several known vulnerabilities (<a href="#citeproc_bib_item_5">Newman 2017</a>; <a href="#citeproc_bib_item_2">Denis Carikli 2018</a>).

I got the T430 for multiple reasons: my current T400 would not be able to support Intel VT-x or VT-d to make Qubes work, it goes up to 16GB of RAM, and most Qubes certified laptops are from the Thinkpad xx30 generation (<a href="#citeproc_bib_item_10">Unknown 2024c</a>, <a href="#citeproc_bib_item_8">2024a</a>). It is also extremely modular (<a href="#citeproc_bib_item_3">Gee 2018</a>). Of course this is no gaming machine, but Qubes isn't made for that use case anyways, and 98% of the time I don't feel I need that extra power. This is also the first Lenovo Thinkpad is that it doesn't officially come with the classic Thinkpad keyboards, but this is possible to mod this in the future. I recently upgraded the laptop RAM 8GB to 16GB, got a 9-cell battery, and replaced the i5 with an i7-3840QM.

Honestly this experience made me realize how scammed for when I purchased my thinkpad T400 for about $200. The ebay sellers know too well the value of their products and you need the average Joe from Kijiji that just wants to throw out their old laptop to get a great deal. Thanks Kijiji.

<small>This blog is (not) sponsored by <a href="https://kijiji.ca"><img src=/images/blog/Kijiji_Logo.png width="3%"/></a></small>


## <img src="/images/blog/openwrt_icon.png" width="10%" /> Openwrt {#img-src-images-blog-openwrt-icon-dot-png-width-10-openwrt}

I've wanted to get around to replacing my ISP router for a while. Your average ISP "router" is really more of a router, modem, and firewall all baked into one. ISP companies want to make these devices cheaply, convenient to use to reduce support calls, and with infrequent updates, but this comes at the expense of security, additional features, and user control over the device and network. So, I bought a Lynksys EA8450 router, installed openwrt on it, and put my ISP router in bridge mode hopefully permanently.

OpenWRT is a linux-based OS targeted for small embedded devices such as routers with a fully writable filesystem and a package management system that makes it easy to install additional software (<a href="#citeproc_bib_item_1">Brown 2024</a>). So far, I've configured my network into segmented VLANs to isolate creepy IoT devices around the house, create a guest network, and a regular LAN for everyday desktop, laptop, and cellular devices. I also changed my DNS servers to which support DoH, and installed a wireguard VPN to access my self-hosted services and do remote administration for when I'm away from home.

Overall, I don't have much else to say other than trying out OpenWRT has been a great learning experience and I'm enjoying the feturaes I've gotten out of it. I would encourage others to replace their ISP router with one running secure custom firmware. Of course, not everyone is used to the learning curve, nor have the knowledge or time to configure OpenWRT, and for those people there are many projects that come more ready out of the box such as DD-WRT.


## Do I do anything other than be a big autistic nerd? {#do-i-do-anything-other-than-be-a-big-autistic-nerd}

Yes, I actually worked at a summer camp for most of the summer which I may write about in the future, but I make no promises to all 0 of my readers and my 3 imaginary ones.


## References {#references}



<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>Brown, Rich. 2024. “[OpenWrt Wiki] Welcome to the OpenWrt Project.” <a href="https://openwrt.org/">https://openwrt.org/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>Denis Carikli, Molly de Blanc. 2018. “The Intel Management Engine: An Attack on Computer Users’ Freedom.” <a href="https://www.fsf.org/blogs/sysadmin/the-management-engine-an-attack-on-computer-users-freedom">https://www.fsf.org/blogs/sysadmin/the-management-engine-an-attack-on-computer-users-freedom</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_3"></a>Gee. 2018. “The Definitive T430 Modding Guide.” <a href="https://medium.com/@n4ru/the-definitive-t430-modding-guide-3dff3f6a8e2e">https://medium.com/@n4ru/the-definitive-t430-modding-guide-3dff3f6a8e2e</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_4"></a>Kepplinger, Martin. 2021. “Skulls - Thinkpad T430.” <a href="https://github.com/merge/skulls/blob/master/t430/README.md#first-time-installation">https://github.com/merge/skulls/blob/master/t430/README.md#first-time-installation</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_5"></a>Newman, Lily Hay. 2017. “Intel Management Engine Flaws Leave Millions of PCs Exposed | WIRED.” <a href="https://www.wired.com/story/intel-management-engine-vulnerabilities-pcs-servers-iot/">https://www.wired.com/story/intel-management-engine-vulnerabilities-pcs-servers-iot/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_6"></a>Qyriad. 2018. “Fusée Gelée.” <a href="https://github.com/Qyriad/fusee-launcher/blob/master/report/fusee_gelee.md">https://github.com/Qyriad/fusee-launcher/blob/master/report/fusee_gelee.md</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_7"></a>Unknown. 2021. “Switch Hacking Is Easy.” <a href="https://rentry.co/SwitchHackingIsEasy">https://rentry.co/SwitchHackingIsEasy</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_8"></a>———. 2024a. “Certified Hardware | Qubes OS.” <a href="https://www.qubes-os.org/doc/certified-hardware/">https://www.qubes-os.org/doc/certified-hardware/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_9"></a>———. 2024b. “Introduction | Qubes OS.” <a href="https://www.qubes-os.org/intro/">https://www.qubes-os.org/intro/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_10"></a>———. 2024c. “System Requirements | Qubes OS.” <a href="https://www.qubes-os.org/doc/system-requirements/">https://www.qubes-os.org/doc/system-requirements/</a>.</div>
</div>
