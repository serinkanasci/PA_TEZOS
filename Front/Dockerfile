FROM node:12.16.3-stretch-slim  
# AS build

WORKDIR /Front

COPY . .
COPY package.json .
RUN npm install

EXPOSE 3000

CMD [ "npm", "start"]
