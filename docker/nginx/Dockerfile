FROM openresty/openresty:1.19.3.1-8-bionic

# RUN apt-get update -qq && apt-get install cron logrotate -qq
RUN luarocks install luasocket

# CMD ["sh", "-c", "service cron start;", "/usr/local/openresty/bin/openresty -g daemon off;"]
CMD ["sh", "-c", "curl -s https://ssl-config.mozilla.org/ffdhe2048.txt -o /data/dhparam.pem;", "/usr/local/openresty/bin/openresty -g daemon off;"]
