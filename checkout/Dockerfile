FROM node:20-alpine@sha256:b88333c42c23fbd91596ebd7fd10de239cedab9617de04142dde7315e3bc0afa

WORKDIR /usr/src/app

EXPOSE 8003

COPY package.json package-lock.json ./
RUN npm ci
COPY ./app.js ./

CMD ["npm","start"]
