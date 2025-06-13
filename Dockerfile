# Imagen base de Puppeteer con Chrome ya instalado
FROM ghcr.io/puppeteer/puppeteer:latest

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Otorgar permisos al usuario pptruser (por defecto en esta imagen)
USER root
RUN chown -R pptruser:pptruser /app

# Volver al usuario sin privilegios (más seguro)
USER pptruser

# Instalar dependencias
RUN npm install

# Compilar TypeScript
RUN npm run build

# Exponer el puerto del servidor
EXPOSE 3001

# Comando por defecto para arrancar el servidor
CMD ["npm", "start"]
