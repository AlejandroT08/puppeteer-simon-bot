# Usa una imagen base con Node
FROM node:18-alpine

# Crea y usa el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

# Instala dependencias
RUN npm install

# Compila TypeScript
RUN npm run build

# Expón el puerto (debe coincidir con el usado en tu servidor, por ejemplo 3001)
EXPOSE 3001

# Comando para correr la app compilada
CMD ["node", "dist/index.js"]
