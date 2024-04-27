+++
title = "Using adb to Delete Vanadium on GrapheneOS"
summary = "I wanted to delete the system browser app Vanadium on my phone running Grapheneos for productivity and mental health reasons. Do this at your own risk."
date = 2024-04-27T00:01:00-04:00
lastmod = 2024-04-27T16:52:30-04:00
tags = ["technology", "tutorial", "adb", "android", "grapheneos"]
draft = false
[menu]
  [menu.posts]
    identifier = "using-adb-to-delete-vanadium-on-grapheneos"
+++

## Preamble {#preamble}

Phone bad. You know it, I know it, everyone and their grandma knows that phone bad. It spys on you, it ruins your attention span, it's crumbling democracy before our very eyes. But I need the phone. I need to run android in order communicate with my closest circle of people through Signal, I need the offline maps, and I need it because my bank is run by dinosaurs and won't let you use otp without their proprietary phone app or SMS (Hmph!). I do not want to go through the hassle of researching the perfect "dumb feature phone" that will allow me to degoogle everything and also have a reasonably up-to-date OS and spend a few hundred bucks just to try it out when I already got a phone less than 2 years ago.

My needs are very specific but also require some flexibility, with many clashing priorities between security, openness, modularity, and digital minimalism. The perfect combination of all of these priorities in a phone does not exist because smart phones are made for the general consumer and not hobbyists like me because then they wouldn't make any money. If you want to have the modularity of the FairPhone with the minimalism of a flip phone Motorolla and the modern security of a Pixel running degoogled GrapheneOS, it is a very tall order. If a phone can do one of these perfectly, it's a great phone; if it gets two priorities done decently it's an amazing acheivement; a phone with more than two of these done perfectly does not exist.

All of this is to say that my current smart phone, a Pixel 7 running GrapheneOS, is one that I use somewhat begrudgingly, a necessary occupational hazard for most humans living in the 2020's, the kind of life that I'm living at least. My current phone is pretty minimal: my phone launcher is the highly minimal [Olauncher](https://github.com/tanujnotes/Olauncher), no social media other than Discord for school, and I use [Molly-FOSS](https://molly.im/) signal client for communcation (<a href="#citeproc_bib_item_5">Tanujnotes 2024</a>; <a href="#citeproc_bib_item_4">Mira 2024</a>). I have been running into one particular issue though which is why I'm writing all of this out: the browser. I will enable the browser to troubleshoot some issue I have that someone has solved on stack overflow or Reddit (search engines be useless), and as soon as you know it I have 20 tabs open on my phone and I've been on Youtube for 2 hours. "How did this happen?" I'll wonder as I disable Vanadium in the settings knowing full well I'll cave in again 2 days later and re-enable it. A few weeks ago I decided to take a bit of a more extreme measure by deleting the default browser system app entirely through the use of Android Debug Bridge (adb) via usb debugging, a command-line tool can be used to communicate with any android device directly (<a href="#citeproc_bib_item_1">Android Developers 2024a</a>). I did all of this without having to root my phone.

So far it's actually been working pretty well, I have not reinstalled the browser besides doing it for the sake of the guide to see if I could, and I have been wasting less time. I've outlined everything that I did here, and it will be transferable to removing whatever OEM/carrier bloatware is on your device that you wish to get rid of.


## The Guide {#the-guide}

**Warning/Disclaimer**: Using adb on your phone to remove system apps could ruin certain functionality on the device; most Android developers including the ones at GrapheneOS would not suggest removing system apps. While I have not yet had any issues removing the default system browser from my phone, this guide is not responsible for anything here going wrong, it was made with educational intent in mind.

The following guide assumes you already have following:

-   An android phone (this guide uses a Pixel 7 phone with GrapheneOs running android 14)
-   A client computer running desktop OS as long as it has ADB installed (guide was tested in a QubesOS sys-usb qube based on the Fedora 39 Linux template)
    -   Linux/BSD:
        -   Debian based: `sudo apt install adb`
        -   RHEL based: `sudo yum install adb` or `sudo dnf install adb`
        -   Gentoo/portage: `sudo emerge -a dev-util/android`
        -   Alpine: `sudo apk add adb`
        -   Arch based: `sudo pacman -S android-tools`
        -   OpenSUSE: `sudo zypper install adb`
        -   OpenBSD: `doas pkg_add adb`
        -   FreeBSD: `pkg install android-tools`
    -   MacOS
        -   [Install Android SDK Platform Tools ZIP](https://dl.google.com/android/repository/platform-tools-latest-darwin.zip) or
        -   Use [homebrew](https://brew.sh/): `brew install android-platform-tools`
    -   Windows
        -   [Install Android SDK Platform Tools ZIP](https://dl.google.com/android/repository/platform-tools-latest-windows.zip) or
        -   Use [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/): `winget install adb`
-   A USB-C cable

While this guide was done on Linux, most of the commands will still apply to other operating systems.


### Phone Setup with Developer Mode and USB-debugging {#phone-setup-with-developer-mode-and-usb-debugging}

First we will want to enable developer mode on the phone. The steps to do this are assuming you're using a Google Pixel; other android OEMs do this slightly differently, but the idea is essentially the same (<a href="#citeproc_bib_item_2">Android Developers 2024b</a>). Open the Settings app on the Android phone and navigate to About Phone and find the Build number. Tap on the Build Number seven times to enable developer mode, you may be prompted to enter in your pin in order to enable it.

<figure>
    <center>
       <img src="/images/blog/android_developer_mode_1.png" width="50%" /><img src="/images/blog/android_developer_mode_2.png" width="50%" />
       <figcaption></figcaption>
    </center>
</figure>

Once Developer mode you will need to enable USB debugging by going into System &gt; Developer options, scroll down to USB debugging and toggle it (<a href="#citeproc_bib_item_2">Android Developers 2024b</a>).

<figure>
    <center>
       <img src="/images/blog/android_usb_debugging_1.png" width="30%" /><img src="/images/blog/android_usb_debugging_2.png" width="30%" /><img src="/images/blog/android_usb_debugging_3.png" width="30%" />
       <figcaption></figcaption>
    </center>
</figure>

Next we will want to start an adb server which will manage communications between the computer that will forward commands to the phone, and the daemon that runs on the phone to execute those commands (<a href="#citeproc_bib_item_1">Android Developers 2024a</a>). You may want to start your server in root in order to give it permissions.

{{< highlight sh >}}
$ adb start-server
*daemon not running; starting now at tcp:5037
*daemon started successfully
{{< /highlight >}}

Next we will need to see if our device is available from completing the previous steps:

{{< highlight sh >}}
$ adb devices
{{< /highlight >}}

If the device is unauthorized, your phone should prompt to accept an RSA key that allows debbugging from the client computer, otherwise turn usb debugging off and back on again (<a href="#citeproc_bib_item_1">Android Developers 2024a</a>). If it says that there are no permissions it means you must run adb server in root.


### adb commands to run on PC to uninstall system apps from user {#adb-commands-to-run-on-pc-to-uninstall-system-apps-from-user}

For the next few steps we will be using the adb shell with the `pm` package manager for android. First, we want to find the vanadium browser app:

{{< highlight sh >}}
adb shell pm list packages | grep "vanadium"
{{< /highlight >}}

There are three main Vanadium apps that GrapheneOS uses:
`app.vanadium.browser`
`app.vanadium.webview`
`app.vanadium.config`

We will obviously want to remove `app.vanadium.browser`. Do not remove the other packages as many apps use the hardened WebView rendering to run their apps. `app.vanadium.config` is a dependency for `app.vanadium.webview` (<a href="#citeproc_bib_item_3">GrapheneOS 2024</a>).

We may want to specify a user of the phone if for example, you are a parent lending your child your phone and have a secondary profile for them to do so. adb allows you to list current user profiles as follows:

{{< highlight sh >}}
adb shell pm list users
{{< /highlight >}}

Here are my users as an example:

{{< highlight nil >}}
Users:
        UserInfo{0:Owner:4c13} running
        UserInfo{10:Work:410}
{{< /highlight >}}

The user that I want to delete Vanadium for, "Owner", can be specified by the id 0.

Finally we run the following:

{{< highlight sh >}}
adb shell pm uninstall -k --user 0 app.vanadium.browser
{{< /highlight >}}

We keep data and cache using the `-k` flag in case we want to reinstall the app with its data in tact, and specify user with the `--user` flag.


### adb commands to run on PC to reinstall system apps for user {#adb-commands-to-run-on-pc-to-reinstall-system-apps-for-user}

Since we had previously only techincally removed the vandium browser for a user and did not fuly uninstall it, we can give the removed app back to the user. Execute the following:

{{< highlight nil >}}
$ adb shell pm install-existing app.vanadium.browser
Package app.vanadium.browser installed for user: 0
{{< /highlight >}}

That's it! Enjoy adb!


## References {#references}

<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>Android Developers. 2024a. “Androd Debug Bridge (Adb).” <a href="https://developer.android.com/tools/adb">https://developer.android.com/tools/adb</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>———. 2024b. “Configure on-Device Developer Options.” <a href="https://developer.android.com/studio/debug/dev-options#enable">https://developer.android.com/studio/debug/dev-options#enable</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_3"></a>GrapheneOS. 2024. “Features Overview | GrapheneOS.” <a href="https://grapheneos.org/features#vanadium">https://grapheneos.org/features#vanadium</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_4"></a>Mira, Oscar. 2024. “Molly.” <a href="https://molly.im/">https://molly.im/</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_5"></a>tanujnotes. 2024. “GitHub - Tanujnotes/Olauncher: Minimal AF Launcher for Android. Reduce Your Screen Time. Daily Wallpapers.” <a href="https://github.com/tanujnotes/Olauncher">https://github.com/tanujnotes/Olauncher</a>.</div>
</div>
