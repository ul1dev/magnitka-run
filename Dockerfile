FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Этап 2: Запуск (Production) ---
FROM node:22-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "start"]
