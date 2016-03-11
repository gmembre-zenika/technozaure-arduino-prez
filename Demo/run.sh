#!/bin/sh -e
# Construit l'image et demarre le conteneur

docker build -t gme/technozaure-arduino .

. twitter.conf

docker run --rm -ti --device=/dev/ttyACM0 \
  -v /home/pirate/projets/technozaure-arduino:/src/ \
  -e TWITTER_CONSUMER_KEY=$TWITTER_CONSUMER_KEY \
  -e TWITTER_CONSUMER_SECRET=$TWITTER_CONSUMER_SECRET \
  -e TWITTER_ACCESS_TOKEN_KEY=$TWITTER_ACCESS_TOKEN_KEY \
  -e TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET \
  gme/technozaure-arduino \
  led-wait.js
