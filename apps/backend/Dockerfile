FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN echo "DATABASE_URL=$DATABASE_URL"
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000

CMD ["node", "dist/main.js"]