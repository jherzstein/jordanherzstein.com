#!/bin/bash
emacs -Q --script ~/Website/build-site.el
 read -r -p "Do you want to sync changes to the server and update git? [y/N] " response
 if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
 then
#     rsync -arP --delete public/ <user>@<servername>:/usr/local/www/site/
     neocities push ~/Website/public/
     git add .
     git commit -m "auto updating site"
     git push
 else
     exit 0
 fi
