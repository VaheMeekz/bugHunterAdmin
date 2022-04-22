FROM node:16
MAINTAINER @underdef


WORKDIR /app
COPY . /app

RUN npm update && npm install && npm run build

EXPOSE 3000

CMD ["npm", "start"]
