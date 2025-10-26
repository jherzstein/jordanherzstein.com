+++
title = "Hosting your own Fonts and Accessable Theme Preferences"
summary = "Hosting fonts on the website while cutting out the middle-man, and allowing site themes to work with and without javascript."
date = 2025-01-07
lastmod = 2025-10-21T21:56:03-04:00
tags = ["webdev", "google-webfonts-helper", "themes"]
draft = false
[menu]
  [menu.posts]
    identifier = "hosting-your-own-fonts-and-accessable-theme-preferences"
+++

If you've been visiting my site for a while you may have noticed that I've revamped a few things here. For one, I've changed my site font to Roboto, and I've also made my site theme more robust for site visitors. I decided to host my own fonts since I no longer wanted to be restriced by the simple "web-safe" fonts, but also I didn't want to offload that onto a third party as, for example, Google Fonts collects user data (<a href="#citeproc_bib_item_1">CookeScript 2022</a>). Hosting your fonts is actually quite simple, here's how I did it:


## Self hosting fonts using google-webfonts-helper {#self-hosting-fonts-using-google-webfonts-helper}

I installed webfonts using [google-webfonts-helper](https://gwfh.mranftl.com/fonts), it is both an easy way to search for the fonts that you want for your site, and it's also self hostable (<a href="#citeproc_bib_item_2">Ranftl, n.d.</a>). Once I decided on the fonts that I wanted, Roboto and Roboto Mono, I installed them into my `/fonts/` folder and unzipped the files to get the woff2 format font files. I simply defined these fonts by using the `@font-face` rule in my css style sheet:

{{< highlight css >}}
/* roboto-regular - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/roboto-v32-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* roboto-mono-regular - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/roboto-mono-v23-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}
{{< /highlight >}}

Inside of `@font-face`, you can define how the font displays, in my case I use swap, which says that if the font is not loaded in time it will render a fallback font. The `font-family` defines a string to identify the font. `font-style` and `font-weight` define both the style and boldness of the font. Finally, in `src` you can define the url of where the font should be downloaded from, in my case this is simply the relative path of the font file hosted on my website.


## Respecting theme preferences for Javascript and CSS {#respecting-theme-preferences-for-javascript-and-css}

For making my site's light and dark themes more robust there were two things that I wanted to accomplish:

1.  Immediately detect browser theme preferences and set that as the theme and,
2.  Detect any system preference changes.

Site visitors can already override system preferences through the [theme toggle I added a while back](https://jordanherzstein.com/posts/light_theme_plus_i_hate_daylight_savings/), I just needed to make a couple of simple changes to respect requirement's 1 and 2 on the javascript side. For users that disable javascript on my site for whatever reason, I was able to get those requirements working for just css, the only thing that doesn't work is the theme toggle on the site website to override the browser preferences.

First when the visitor opens the page we define variable `i` as a string `theme`, which will define the key of the theme type saved in the browser. Variable `m` will contain the current theme which will check for the theme in `localStorage` if it exists, otherwise it will detect user preference using `matchMedia` and assign it to either `"light"` or `"dark"`.

{{< highlight javascript >}}
var i = "theme";
var m = localStorage.getItem(i) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark");
{{< /highlight >}}

This snippet also uses `matchMedia` to return the current colour theme preference as a `MediaQueryList`. Then there is an event listener which checks for changes in the `MediaQueryList`, when there is such a change the new colour scheme is set and if that is not the same as variable `m`, the `switchTheme()` function is called.

{{< highlight javascript >}}
// Listen for changes to the system color scheme preference
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "light" : "dark";
    if (newColorScheme !== m) {
	switchTheme();
    }
});
{{< /highlight >}}

Using the `prefers-color-scheme` media feature can check if the browser requests a light theme or dark theme, and swap the light/dark theme icons based on the id selectors `#light-icon` and `#dark-icon`. This allows site visitors to still change colour themes without needing to run javascript on their browser.

{{< highlight css >}}
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --color-bg: var(--dark-color-bg);
    --color-fg: var(--dark-color-fg);
    --color-txt: var(--dark-color-txt);
    --color-h1: var(--dark-color-h1);
    --color-h2:var(--dark-color-h2);
    --color-a: var(--dark-color-a);
    --color-a-hover: var(--dark-color-a-hover);
    --switch-icon: var(--dark-switch-icon);
  }

  :root:not(.light) #light-icon {
      display: none;
  }

  :root:not(.light) #dark-icon {
      display: block;
  }

}

@media (prefers-color-scheme: light) {
  :root:not(.dark) {
    --color-bg: var(--light-color-bg);
    --color-fg: var(--light-color-fg);
    --color-txt: var(--light-color-txt);
    --color-h1: var(--light-color-h1);
    --color-h2:var(--light-color-h2);
    --color-a: var(--light-color-a);
    --color-a-hover: var(--light-color-a-hover);
    --switch-icon: var(--light-switch-icon);
  }

  :root:not(.dark) #light-icon {
      display: block;
  }

  :root:not(.dark) #dark-icon {
      display: none;
  }

}

{{< /highlight >}}


## References {#references}

<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>CookeScript. 2022. “Are Google Fonts GDPR Compliant?” <a href="https://cookie-script.com/blog/google-fonts-and-gdpr">https://cookie-script.com/blog/google-fonts-and-gdpr</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>Ranftl, Mario. n.d. “Google Webfonts Helper.” <a href="https://gwfh.mranftl.com/fonts">https://gwfh.mranftl.com/fonts</a>.</div>
</div>
