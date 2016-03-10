#!/bin/sh

docker rm -f /technozaure-arduino-prez

docker run  -ti -p 80:8000 -v /home/pirate/projets/technozaure-arduino-prez/Gruntfile.js:/data/Gruntfile.js -v /home/pirate/projets/technozaure-arduino-prez/Slides/:/data/Slides/ -v /home/pirate/projets/technozaure-arduino-prez/package.json:/data/package.json -v /home/pirate/projets/technozaure-arduino-prez/CahierExercices:/data/CahierExercices -v /home/pirate/projets/technozaure-arduino-prez/PDF:/data/node_modules/zenika-formation-framework/pdf --restart=always --name=technozaure-arduino-prez gme/formation--framework grunt displaySlides


#gme/prez

echo "ecoute sur le port 8000"
