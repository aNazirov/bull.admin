FROM node:16.10-alpine3.11 as build-step

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN node --max_old_space_size=1024 ./node_modules/react-scripts/bin/react-scripts.js build

FROM nginx:1.20.1
COPY --from=build-step /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000:80
