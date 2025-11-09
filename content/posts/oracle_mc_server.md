+++
title = "Minecraft Java Edition Server For Free"
summary = "Minecraft free forever in a docker container with 24 GB of ram and 4 CPU cores."
date = 2024-06-26
lastmod = 2025-11-08T19:56:37-05:00
tags = ["vps", "technology", "oracle", "tutorial", "minecraft"]
draft = false
[menu]
  [menu.posts]
    identifier = "minecraft-java-edition-server-for-free"
+++

## Preamble {#preamble}

So I've been playing around recently with a free Oracle VPS, which if you want to play around with virtual private servers running Linux, don't care about the company, and don't have much cash to spare; Oracle has by far the most generous forever-free tier cloud offerings I've come across. For no cost whatsoever you too can run a 24GB of ram and 4 CPU cores VPS, and additionally you have to explicitly upgrade your account to access paid features, so you won't be getting any unexpected charges. Just be wary that if your server is not active Oracle can shut down your server, and from what I've heard their customer service isn't great. If you want to get into hosting your own VPS, I would go for a service that has a more consistant pricing structure, such as Hetzner.

Anyway to get away from that tangent, I was having some analysis-paralysis as to what kind of project I should use it for and finally decided to spin up a minecraft server as it would be something I'd be able to share with friends and family. It makes it all the more tragic, however, that I have not used Mincraft in about 4 years, meaning that I missed the train on transitioning my Mojang account over to Microsoft, and I no longer have access to an account to install and play Minecraft. Given that ~~my parents~~ I had already paid for a copy over a decade ago at this point for the game I should own, I think there is one word that can aptly describe what has been done here it's just leaving my mind at the moment... Oh yes, that's **stealing**. Forced arbitration is one thing, but even Youtube is still able to offer old Youtube accounts to upgrade to Google accounts (<a href="#citeproc_bib_item_4">The Lady from UN 2021</a>).

Anyway, it isn't the end of the world, I will find a way to play Minecraft one way or another, even if that means repaying for a game I should already have ownership over. However, if you own minecraft you shouldn't have to pay anything at all to play on a server with your friends, and it doesn't have to be difficult to deploy as well. This guide will outline how to deploy a minecraft server using docker compose on an Oracle VPS in the way that I have.


## The Guide {#the-guide}

The following guide assumes you already have an Oracle VPS you can ssh into running an apt-based operating system such as Ubuntu 22.04, the operating system I will be using for this guide. I recommend following the guide that exists on FMHY to set one up (<a href="#citeproc_bib_item_5">Cevoj35548 2022</a>).


### Installing docker for Ubuntu {#installing-docker-for-ubuntu}

First update your packages list.

{{< highlight sh >}}
sudo apt update
{{< /highlight >}}

Install the proper dependencies.

{{< highlight sh >}}
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
{{< /highlight >}}

Download the GPG key for Docker to sign packages.

{{< highlight sh >}}
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
{{< /highlight >}}

Add the Docker repository to your sources

{{< highlight sh >}}
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
{{< /highlight >}}

Install Docker engine, docker compose, and their dependencies.

{{< highlight sh >}}
sudo apt update && sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
{{< /highlight >}}


### Create a new docker user and group {#create-a-new-docker-user-and-group}

We will create a new user and group for this docker container called minecraft.

{{< highlight sh >}}
sudo useradd -r minecraft
sudo groupadd -r minecraft
{{< /highlight >}}

Next we will add the new docker user to the default group (in this case, ubuntu).

{{< highlight sh >}}
sudo usermod -a -G minecraft ubuntu
{{< /highlight >}}


### Configuring yaml file for docker compose and deploy {#configuring-yaml-file-for-docker-compose-and-deploy}

For the sake of this guide we will be deploying a minecraft java edition server using the minecraft server image from itzg. They also have a bedrock image available, however, some of the server management commands will be different. You can create a new directory to put your compose file in, you can call it `compose.yml`, and it will contain something similar to the following (<a href="#citeproc_bib_item_6">Iztg 2024a</a>):

{{< highlight yml >}}
version: "3"

services:
  minecraft-server:
    image: itzg/minecraft-server
    restart: unless-stopped
    tty: true
    stdin_open: true
    environment:
      EULA: TRUE
      SERVER_NAME: "server-name"
    ports:
      - "25565:25565"
    volumes:
      - ./data:/data
    user: minecraft:minecraft
{{< /highlight >}}

Deploy the docker container as a daemon.

{{< highlight sh >}}
docker compose up -d
{{< /highlight >}}


### Oracle Networking Firewall Rules {#oracle-networking-firewall-rules}

We want to add a firewall rule in our server's subnet to port forward a TCP connection to our server. This will be the port specified in the compose file, in this case 25565.

On your Oracle Cloud admin page, you want to navigate to your server instance through the dashboard.

<figure>
    <center>
       <img src="/images/blog/oracle-dashboard-instances.png" width="100%" />
       <figcaption></figcaption>
    </center>
</figure>

Inside of your instance, scroll down to resources and find `Attached VNICs`. Under the attached VNICs you should find an attached subnet, click on it to navigate to the subnet page.

<figure>
    <center>
       <img src="/images/blog/oracle-attached-vnics.png" width="100%" />
       <figcaption></figcaption>
    </center>
</figure>

In the subnet page you should find security lists. Click on the default security list that was created.

<figure>
    <center>
       <img src="/images/blog/oracle-security-lists.png" width="100%" />
       <figcaption></figcaption>
    </center>
</figure>

In the security list there are ingress rules. Add an ingress rule with source type CIDR, Source CIDR as `0.0.0.0/0` if you want to allow all ip addresses. Of course the IP protocol type will be TCP. Keep source port range empty and specify a destination port range as the ip address in our compose file, 25565. You may add an optional description such as `Minecraft Server TCP connection`.

<figure>
    <center>
       <img src="/images/blog/oracle-ingress-rules.png" width="100%" />
       <figcaption></figcaption>
    </center>
</figure>

Finally save all of your changes and your minecraft server to the world. All we need to do is test it.


### Ping minecraft server {#ping-minecraft-server}

There are many websites that can check your minecraft server status and check it's connection, such as [mcsrvstat.us](https://mcsrvstat.us). You will need the IP address of the oracle instance, if you are in an ssh session on the server you can check the ip address using `curl ipinfo.io`, or you can see the ip address of the server through the main instances webpage under `Instance access`.


### Whitelist users {#whitelist-users}

Generally it is a good idea to enable a whitelist on your server if it is just private between friends so random users don't join and grief your world.


#### Method 1: Using rcon {#method-1-using-rcon}

You can access the rcon-cli on the server side through docker exec (<a href="#citeproc_bib_item_7">Iztg 2024b</a>).

{{< highlight sh >}}
docker exec -it <name-of-server-container> rcon-cli
{{< /highlight >}}

If you don't know the name of your container, list existing containers using `docker ps` and find the container name that is using the `itzg/minecraft-server` docker image.

You should now be in a separate console that will start with `>`. Input the following command into the console to enable the server's use of the whitelist (<a href="#citeproc_bib_item_2">Minecraft Wiki 2024b</a>).

{{< highlight text >}}
whitelist on
{{< /highlight >}}

To add users using the `whitelist add` command, the syntax is as follows (<a href="#citeproc_bib_item_2">Minecraft Wiki 2024b</a>).

{{< highlight text >}}
whitelist add <targets>
{{< /highlight >}}

See your whitelisted users (<a href="#citeproc_bib_item_2">Minecraft Wiki 2024b</a>).

{{< highlight text >}}
whitelist list
{{< /highlight >}}

You can add users as operators so they can execute server commands whilte in the game (<a href="#citeproc_bib_item_1">Minecraft Wiki 2024a</a>).

{{< highlight text >}}
op <targets>
{{< /highlight >}}


#### Method 2: Editing server.properties and whitelist.json {#method-2-editing-server-dot-properties-and-whitelist-dot-json}

You will want to find the configuration files that exist in the `/data` volume that you specified in your compose configuration file.

First edit the server.properties file to enable the server white list.

{{< highlight text >}}
white-list=true
{{< /highlight >}}

Edit whitelist.json to add user names and UUIDs you wish to add. You can search for UUIDs for each username through [minecraftuuid.com](https://minecraftuuid.com). The template should look as follows (<a href="#citeproc_bib_item_3">Minecraft Wiki 2024c</a>):

{{< highlight json >}}
[
  {
    "uuid": "f430dbb6-5d9a-444e-b542-e47329b2c5a0",
    "name": "username"
  },
  {
    "uuid": "e5aa0f99-2727-4a11-981f-dded8b1cd032",
    "name": "username"
  }
]
{{< /highlight >}}

Restart the server using the `docker restart` command.

{{< highlight sh >}}
docker restart <name-of-server-container>
{{< /highlight >}}


## References {#references}

<style>.csl-entry{text-indent: -1.5em; margin-left: 1.5em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>Minecraft Wiki. 2024a. “Commands/Op - Minecraft Wiki.” <a href="https://minecraft.fandom.com/wiki/Commands/op">https://minecraft.fandom.com/wiki/Commands/op</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>———. 2024b. “Commands/Whitelist - Minecraft Wiki.” <a href="https://minecraft.fandom.com/wiki/Commands/whitelist">https://minecraft.fandom.com/wiki/Commands/whitelist</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_3"></a>———. 2024c. “Whitelist.Json - Minecraft Wiki.” <a href="https://minecraft.fandom.com/wiki/Whitelist.json">https://minecraft.fandom.com/wiki/Whitelist.json</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_4"></a>The Lady from UN. 2021. “How to Claim a Legacy YouTube Account | 2021 - YouTube.” <a href="https://www.youtube.com/watch?v=WQejhyQZNr8&t=0s">https://www.youtube.com/watch?v=WQejhyQZNr8&#38;t=0s</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_5"></a>cevoj35548. 2022. “🚀 Free Lifetime 200GB VPS, 4x CPU Cores, 24GB Memory 🚀.” <a href="https://rentry.co/oraclevps">https://rentry.co/oraclevps</a>.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_6"></a>iztg. 2024a. “Minecraft Server on Docker (Java Edition).” https://docker-minecraft-server.readthedocs.io/en/latest/#using-docker-compose.</div>
  <div class="csl-entry"><a id="citeproc_bib_item_7"></a>———. 2024b. “Sending Commands - Minecraft Server on Docker (Java Edition).” <a href="https://docker-minecraft-server.readthedocs.io/en/latest/commands/">https://docker-minecraft-server.readthedocs.io/en/latest/commands/</a>.</div>
</div>
