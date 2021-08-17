FROM openresty/openresty:1.19.3.2-3-bionic

# RUN apt-get update -qq && apt-get install cron logrotate -qq
RUN luarocks install lua-resty-http

COPY mo ./mo
COPY conf.d /etc/nginx/conf.d
COPY conf.d.templates /etc/nginx/conf.d.templates

# CMD ["sh", "-c", "service cron start;", "/usr/local/openresty/bin/openresty -g daemon off;"]
CMD [ "sh", "-c", \
      "./mo < /etc/nginx/conf.d.templates/server.api.conf > /etc/nginx/conf.d/server.api.conf ; \
       ./mo < /etc/nginx/conf.d.templates/server.hns.conf > /etc/nginx/conf.d/server.hns.conf; \
       ./mo < /etc/nginx/conf.d.templates/server.skylink.conf > /etc/nginx/conf.d/server.skylink.conf ; \
       /usr/local/openresty/bin/openresty" \
    ]
