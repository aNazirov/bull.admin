FROM node:16.10-alpine3.11 as build-step

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN node --max_old_space_size=1024 ./node_modules/react-scripts/bin/react-scripts.js build

EXPOSE 3000
