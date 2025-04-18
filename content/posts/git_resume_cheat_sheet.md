+++
title = "Git Resume Cheat Sheet"
summary = "I've been using a local git server to organize and keep track of all versions of my resume. I keep track of some common commands that I use."
date = 2025-01-18
lastmod = 2025-04-18T11:51:26-04:00
tags = ["git", "resume"]
draft = false
[menu]
  [menu.posts]
    identifier = "git-resume-cheat-sheet"
+++

Since I've started my job hunt, I've been tracking all versions of my resume on git similar to [this guy](https://github.com/rothgar/track-your-resume-in-git). Personally, I don't feel comfortable recording all of my resumes with sensitive information on a non-local git repository, so I've been running forgejo at home for this. In case you are curious about how I generate my resume, I use [org-cv](https://titan-c.gitlab.io/org-cv/) on the backend, using the awesomecv template similar to [this guy](https://github.com/zzamboni/vita/). I do use a bit of an odd combindation of git commands and [magit](https://magit.vc) keybindings to get stuff done, but for me it's comfy. I thought it'd be a good idea to document some of my common git commands that I use to organize my resume on the repo here. I got the idea after seeing another [blog post](https://kishvanchee.com/git-cheat-sheet/) in a similar vein. If you're in a similar position as me this may give you some workflow ideas.

-   Create a new company branch with all files from current branch, then switches to the new branch

<!--listend-->

{{< highlight bash >}}
git checkout -b <branch>
{{< /highlight >}}

-   See names of all files on current branch

<!--listend-->

{{< highlight bash >}}
git ls-tree -r <branch> --name-only
{{< /highlight >}}

-   Restore file from another branch

<!--listend-->

{{< highlight bash >}}
git restore --source <branch> <file>
{{< /highlight >}}

-   See current branches, doubly verbose to highlight relationship between local and remotes

<!--listend-->

{{< highlight bash >}}
git branch -vv
{{< /highlight >}}

-   Set or get remote repo urls for origin for ssh

<!--listend-->

{{< highlight bash >}}
git remote set-url origin <user>@<host_domain_or_ip>:<ssh-port>/<username>/<repository>.git
git remote get-url origin
{{< /highlight >}}
