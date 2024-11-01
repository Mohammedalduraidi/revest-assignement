FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci -d

COPY . .

RUN npm run build

EXPOSE 4444

CMD ["npm", "run", "start"]

