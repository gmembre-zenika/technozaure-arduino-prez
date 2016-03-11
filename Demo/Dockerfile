# docker build -t gme/technozaure-arduino .
FROM hypriot/rpi-node

RUN npm install johnny-five twitter

WORKDIR /src/

VOLUME /src/

ENTRYPOINT ["node"]
