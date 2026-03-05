# --- Этап 1: Сборка (Builder) ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# --- Этап 2: Запуск (Production) ---
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

COPY --from=builder /app/public* ./public/

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "start"]
