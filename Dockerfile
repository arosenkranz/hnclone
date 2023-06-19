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

# change user
USER node

WORKDIR /usr/src/app

# copy package.json and change ownership to node
COPY --chown=node:node package.json ./

# copy prisma directory
COPY --chown=node:node prisma ./prisma

# copy .env
COPY --chown=node:node .env ./

# copy tsconfig.json
COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node . .

RUN yarn install
RUN yarn global add prisma @datadog/datadog-ci
