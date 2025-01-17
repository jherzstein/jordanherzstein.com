#!/bin/bash
export HUGOxPARAMSxGITxLAST_COMMITxHASH=$(git rev-parse --short HEAD)
export HUGOxPARAMSxGITxLAST_COMMITxDATE=$(git log -1 --format=%ci | cut -b 1-10)
hugo 
read -r -p "Do you want to sync changes to the server and update git? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    neocities push ./public/
    git add .
    git commit -m "auto updating site"
    git push origin master
else
    exit 0
fi
