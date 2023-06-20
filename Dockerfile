FROM node:19.6 AS base
RUN apt-get update && apt-get install -y \
  wait-for-it \
  libgtk2.0-0 \
  libgtk-3-0 \
  libgbm-dev \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./
COPY  prisma ./prisma
COPY .env ./
COPY tsconfig.json ./
COPY . .

RUN yarn install
RUN yarn global add prisma @datadog/datadog-ci
