+++
title = "nyaa_menu"
summary = "I made a lazy web scraping tool for collecting anime and manga while I was bored."
date = 2023-10-07
lastmod = 2024-02-22T21:48:08-05:00
tags = ["technology", "projects", "anime", "manga"]
draft = false
[menu]
  [menu.posts]
    identifier = "nyaa-menu"
+++

<figure>
    <center>
       <img src="/images/blog/nyaa_menu_screenshot.png" width="100%" />
       <figcaption>nyaa_menu scraping nyaa.si for "Chainsaw Man" english translated manga from most to least seeded.</figcaption>
    </center>
</figure>

I got quite bored a few days ago, and instead of staring at my 24 inch lightbulb I channeled a bit of my creative juices into making something... while staring at my 24 inch lightbulb. So, I sometimes watch anime and read manga from time to time, I also like [dmenu](https://tools.suckless.org/dmenu), and I don't like using my browser if I can avoid it; there often is an easier way of doing things if you're creative enough. Somewhat inspired by Bugswriter's [notflix](https://github.com/Bugswriter/notflix) project, I whipped up a shell script that scrapes anime and manga magnet links from [nyaa.si](https://www.nyaa.si) based on user search terms and flags. By default, the magnet link gets copied to your clipboard, or if you have your own transmission server you can also send the magnet link there automatically. If this utility sounds interesting to you go [check it out](https://github.com/jherzstein/nyaa_menu)!
