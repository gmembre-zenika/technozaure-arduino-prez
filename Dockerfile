FROM gme/formation--framework

ADD entrypoint.sh /
RUN chmod +x /entrypoint.sh

CMD /entrypoint.sh
