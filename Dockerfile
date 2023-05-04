FROM node:19.6 AS base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install && \
  npm run postinstall

COPY . .

CMD ["npm", "run", "dev"]

