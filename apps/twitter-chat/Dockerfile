FROM node:16.15.1-alpine as node-build

RUN apk update && apk add curl && apk add --no-cache bash

RUN curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN bash ./prisma/generate-client.sh twitter TWITTER_POSTGRES_URL

RUN yarn build:twitter

# RUN npm prune --production

FROM node:16.15.1-alpine

WORKDIR /usr/src/app

COPY --from=node-build /usr/src/app/.env ./.env
COPY --from=node-build /usr/src/app/dist/apps/twitter ./dist
COPY --from=node-build /usr/src/app/node_modules ./node_modules

# RUN chmod +x ./node_modules/@prisma

CMD ["node", "dist/main"]
