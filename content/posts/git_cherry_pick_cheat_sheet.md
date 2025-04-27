+++
title = "Git Cherry Pick Cheat Sheet"
summary = "More git things"
date = 2025-04-27
lastmod = 2025-04-27T10:45:23-04:00
tags = ["git", "tutorial"]
draft = false
[menu]
  [menu.posts]
    identifier = "git-cherry-pick-cheat-sheet"
+++

More recently I've been wanting to include single commit changes of one branch into the main branch without merging the entire branch or replace entire files. Git has a very useful tool for this called `git-cherry-pick`, allowing you to apply changes from hashes from existing commits in any branch you wish to apply them (<a href="#citeproc_bib_item_1">Git, n.d.</a>).

I am too lazy to draw so I will try to illustrate how this would work visually with mediocre ascii art.

Before cherry pick:

{{< highlight text >}}
  (cherry-pick branch)
     B -> D -> E
     ^
     |
A -> B -> C
  (main branch)
{{< /highlight >}}

After cherry pick:

{{< highlight text >}}
  (cherry-pick branch)
     B -> D - > E
     ^     \
     |       \
A -> B -> C -> D
  (main branch)
{{< /highlight >}}

First make you necessary changes in the `cherry-pick` branch, make the commit you want to cherrypick, and retrieve the commit hash to save for later.

{{< highlight bash >}}
git add <files-and-folders-to-stage-for-commit>

git commit -m "commit D message in cherry-pick branch"

git rev-parse HEAD # get the hash
<commit-D-hash>
{{< /highlight >}}

The simplest way to then apply the cherrypick to main is to switch to the main branch and do the cherry-pick, optionally `git pull` if your main branch is not up to date with the remote.

{{< highlight bash >}}
git switch main

git pull # In case you are not up to date on main branch, important for managing merge conflicts.

git cherry-pick <commit-D-hash>
{{< /highlight >}}

Alternatively, I will sometimes checkout main to another branch to cherry pick a commit first and merge after in order to make sure my changes work how I want and I can manage merge conflicts if they come up. This is also necessary if you are sharing a repo with multiple people and need to create a PR for review before it can be merged into main.

{{< highlight bash >}}
git switch main

git pull

git checkout -b test-cherry-pick

git cherry-pick <commit-D-hash>

{{< /highlight >}}

If you do have merge conflicts, deal with them manually, stage and commit changes, and then continue the cherry-pick.

{{< highlight bash >}}
# First deal with merge conflicts
git add <files-with-merge-conflicts>

git commit -m "Final changes after merge conflicts."

git cherry-pick --continue
{{< /highlight >}}

Alternatively, if you would like to abort the process you can use `git cherry-pick --abort`.

Now either `git push` and create a new pull request into main or merge into main locally before push.

{{< highlight bash >}}
git switch main

git merge test-cherry-pick

git push
{{< /highlight >}}

Ok those were the basics of applying individual changes using `git-cherry-pick`. Happy cherry-picking!


## References {#references}

<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>Git. n.d. “Git - Git-Cherry-Pick Documentation.” <a href="https://git-scm.com/docs/git-cherry-pick">https://git-scm.com/docs/git-cherry-pick</a>.</div>
</div>
