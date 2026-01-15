FROM node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c

WORKDIR /usr/src/app

EXPOSE 8003

COPY package.json package-lock.json ./
RUN npm ci
COPY ./app.js ./

CMD ["npm","start"]
