FROM node:24-alpine@sha256:4f696fbf39f383c1e486030ba6b289a5d9af541642fc78ab197e584a113b9c03

WORKDIR /usr/src/app

EXPOSE 8003

COPY package.json package-lock.json ./
RUN npm ci
COPY ./app.js ./

CMD ["npm","start"]
