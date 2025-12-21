# pull official base image
FROM node:24.12.0-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8

EXPOSE 8001

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
