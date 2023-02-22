FROM node:14.17.5-alpine

WORKDIR /app
COPY ./streaming-frontend /app

RUN npm install
RUN npm run build

WORKDIR /app/build
EXPOSE 3000
CMD ["npx", "serve", "-s", "."]
