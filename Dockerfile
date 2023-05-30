FROM node

WORKDIR /nodejs-hw-rest-api

COPY . /nodejs-hw-rest-api

RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start", ":dev" ]