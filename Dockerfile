FROM node:14-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# for prod: RUN npm run build