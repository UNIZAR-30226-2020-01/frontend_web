FROM node:9.11.1-alpine as build-stage

# Instalamos el sevidor HTTP para el contenido estático
RUN npm install -g http-server

WORKDIR /app

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos los ficheros y directorios del proyecto al directorio actual
COPY . .

# Construimos la aplicacion para la producción minificada
RUN npm run build

# Exponemos el puerto 8080 para las conexiones
EXPOSE 8080

ENTRYPOINT ["http-server", "dist"]

# Etapa de produccion usando NGINX
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
