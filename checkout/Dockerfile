FROM node:24-alpine@sha256:cd6fb7efa6490f039f3471a189214d5f548c11df1ff9e5b181aa49e22c14383e

WORKDIR /usr/src/app

EXPOSE 8003

COPY package.json package-lock.json ./
RUN npm ci
COPY ./app.js ./

CMD ["npm","start"]
