FROM node:14

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY app.js .
COPY api ./api
COPY static ./static

RUN npm install

EXPOSE 3000

CMD npm run start