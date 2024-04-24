FROM node:20-alpine3.17
WORKDIR /src

COPY package*.json ./

COPY . . 

RUN npm install

EXPOSE 4000

CMD ["npm","run", "start"]