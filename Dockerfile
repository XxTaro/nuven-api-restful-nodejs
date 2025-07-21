FROM node:18-slim AS builder

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json  ./

COPY prisma ./prisma/

RUN npm install 
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]