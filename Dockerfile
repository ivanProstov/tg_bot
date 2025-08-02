# Используем официальный Node.js образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn .yarn
COPY .pnp.* ./

# Включаем Corepack
RUN corepack enable

# Подготавливаем нужную версию Yarn (указанную в package.json)
RUN corepack prepare yarn@4.9.2 --activate

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

RUN yarn build
#
## Запускаем приложение
CMD ["yarn", "start"]




