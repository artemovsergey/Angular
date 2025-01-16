# Dockerfile
```
# Используем Node.js как базовый образ
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в рабочую директорию
COPY . .

# Собираем приложение
RUN npm run build --prod

# Устанавливаем Angular CLI глобально
RUN npm install -g @angular/cli

# Открываем порт 4200 для доступа к приложению
EXPOSE 4200

# Запускаем приложение с использованием Angular CLI
CMD ["ng", "serve", "--host", "0.0.0.0"]

```

# Dockerfile with Nginx

```
# Этап 1: Строительство
FROM node:20 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в рабочую директорию
COPY . .

# Собираем приложение
RUN npm run build --prod

# Этап 2: Развертывание
FROM nginx:alpine

# Копируем собранное приложение из предыдущего этапа в nginx
COPY --from=build /app/dist/example.angular/browser /usr/share/nginx/html

# Копируем конфигурационный файл nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80 для доступа к приложению
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
```

# nginx.conf
```
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;

    server {
        listen 80;
        server_name localhost;

        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```

# Docker-compose
```
version: '1.0'

services:
  angular-app:
    build:
      context: .
      dockerfile: DockerfileNginx
    ports:
      - "80:80"
    environment:
      NODE_ENV: development
    # command: ["ng", "serve", "--host", "0.0.0.0", "--disableHostCheck", "true"]
```
