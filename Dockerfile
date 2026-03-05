# --- Этап 1: Сборка (Builder) ---
FROM node:22-alpine AS builder
# libc6-compat нужен для корректной работы некоторых node_modules в Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Отключаем телеметрию и собираем standalone билд
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Этап 2: Запуск (Production/Runner) ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Создаем системного пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Устанавливаем wget для работы healthcheck в docker-compose
RUN apk add --no-cache wget

# Копируем только результат сборки
# Папку public не копируем, так как её нет в проекте
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запуск напрямую через node для скорости и безопасности
CMD ["node", "server.js"]