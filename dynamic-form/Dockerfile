FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci -d

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

RUN npm install --production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
