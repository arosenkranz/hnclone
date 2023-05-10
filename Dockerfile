FROM node:19.6 AS base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as dev

RUN yarn install
RUN yarn global add prisma

COPY . .


