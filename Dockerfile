FROM node:21

WORKDIR /

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

LABEL image="knight-challenge-back"