# Etapa de construcción
FROM node:18-slim

# Instalar dependencias necesarias para Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Seteamos la variable para descargar Chromium con Puppeteer
ENV PUPPETEER_SKIP_DOWNLOAD=false

# Seteamos el directorio de trabajo
WORKDIR /app

# Copiamos package.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos el proyecto
RUN npm run build

# Exponemos el puerto
EXPOSE 3001

# Ejecutamos la aplicación
CMD ["node", "dist/index.js"]
