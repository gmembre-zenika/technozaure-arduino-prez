#!/bin/bash -e

cd /data

if [ ! -e ok ];
then
  npm install grunt
fi

touch ok


grunt displaySlides
