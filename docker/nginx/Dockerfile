FROM openresty/openresty:1.19.3.2-3-bionic

RUN luarocks install lua-resty-http && \
    luarocks install lua-resty-auto-ssl

RUN mkdir /etc/resty-auto-ssl && \
    openssl req -new -newkey rsa:2048 -days 3650 -nodes -x509 \
     -subj '/CN=sni-support-required-for-valid-ssl' \
     -keyout /etc/resty-auto-ssl/resty-auto-ssl-fallback.key \
     -out /etc/resty-auto-ssl/resty-auto-ssl-fallback.crt

COPY mo ./mo
COPY conf.d /etc/nginx/conf.d
COPY conf.d.templates /etc/nginx/conf.d.templates

CMD [ "bash", "-c", \
      "PORTAL_CERT=${NGINX_PORTAL_API_NAME/\\*/wildcard_} SERVER_CERT=${NGINX_SERVER_API_NAME/\\*/wildcard_} ./mo < /etc/nginx/conf.d.templates/server.api.conf > /etc/nginx/conf.d/server.api.conf ; \
       PORTAL_CERT=${NGINX_PORTAL_HNS_NAME/\\*/wildcard_} SERVER_CERT=${NGINX_SERVER_HNS_NAME/\\*/wildcard_} ./mo < /etc/nginx/conf.d.templates/server.hns.conf > /etc/nginx/conf.d/server.hns.conf; \
       PORTAL_CERT=${NGINX_PORTAL_SKY_NAME/\\*/wildcard_} SERVER_CERT=${NGINX_SERVER_SKY_NAME/\\*/wildcard_} ./mo < /etc/nginx/conf.d.templates/server.sky.conf > /etc/nginx/conf.d/server.sky.conf ; \
       /usr/local/openresty/bin/openresty '-g daemon off;'" \
    ]
