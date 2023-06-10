FROM node:19.6 AS base
RUN apt-get update && apt-get install -y wait-for-it

WORKDIR /usr/src/app

COPY package.json ./

FROM base as dev

RUN yarn install
RUN yarn global add prisma

COPY . .
