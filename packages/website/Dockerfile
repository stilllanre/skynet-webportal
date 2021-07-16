FROM node:16.3.0-alpine

RUN apk update && apk add autoconf automake build-base libtool nasm pkgconfig

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

ENV GATSBY_TELEMETRY_DISABLED 1
ENV CYPRESS_INSTALL_BINARY 0
RUN npm i

COPY data ./data
COPY src ./src
COPY static ./static
COPY gatsby-browser.js .
COPY gatsby-config.js .
COPY gatsby-node.js .
COPY gatsby-ssr.js .
COPY postcss.config.js .
COPY tailwind.config.js .

RUN npm run build

EXPOSE 9000

CMD ["sh", "-c", "npm run serve -- --host 0.0.0.0"]
