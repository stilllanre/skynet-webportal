FROM node:16.5.0-alpine

ENV HOST=0.0.0.0

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY public ./public
COPY src ./src

CMD ["sh", "-c", "yarn build && yarn start"]
