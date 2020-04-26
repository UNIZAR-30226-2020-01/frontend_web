#!/bin/bash

# Script que ejecutara travis para hacer el deploy si el build pasa.

USER='PS'
IP='s7-rest.francecentral.cloudapp.azure.com'

FILE="./travis_rsa"

chmod 0600 $FILE

#yes | ssh -i $FILE $USER@IP 'pwd'
ssh -i $FILE -o 'StrictHostKeyChecking no' $USER@$IP << EOF
  cd ~PS/frontend_web
  git pull origin master
EOF
