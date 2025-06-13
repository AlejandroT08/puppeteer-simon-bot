# 1. Imagen base con Node.js y npm
FROM node:20

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar dependencias
COPY package*.json ./
RUN npm install

# 4. Copiar el resto del proyecto
COPY . .

# 5. Compilar TypeScript
RUN npm run build

# 6. Exponer el puerto si usas HTTP (opcional)
EXPOSE 3000

# 7. Comando de inicio
CMD ["npm", "start"]
