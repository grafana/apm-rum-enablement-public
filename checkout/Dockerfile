FROM node:26-alpine@sha256:40cd011b55415bc894e45b02fdd5a5dfde056921b7d23a64c74f80497af48797

WORKDIR /usr/src/app

EXPOSE 8003

COPY package.json package-lock.json ./
RUN npm ci
COPY ./app.js ./

CMD ["npm","start"]
