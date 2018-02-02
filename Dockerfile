FROM node:9.3-alpine

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn
RUN yarn global add pm2

COPY src src
COPY pm2.json .

CMD [ "pm2-docker", "start", "pm2.json" ]
