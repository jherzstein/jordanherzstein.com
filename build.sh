#!/bin/bash
hugo 
read -r -p "Do you want to sync changes to the server and update git? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    neocities push ~/Website/public/
    git add .
    git commit -m "auto updating site"
    git push origin master
    git checkout gh-pages
    git checkout master ~/Website/public/
    git commit -m "updating for hugo"
    git push origin gh-pages
else
    exit 0
fi
