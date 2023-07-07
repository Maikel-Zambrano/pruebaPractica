FROM node:12-alpine

WORKDIR /usr/src/app


COPY package*.json ./


RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3001

ENTRYPOINT [ "yarn", "start:prod" ]
