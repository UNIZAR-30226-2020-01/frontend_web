FROM node:9.11.1-alpine

# Instalamos el sevidor HTTP para el contenido estático
RUN npm install -g http-server

WORKDIR /app

# Copiamos el package.json y el package-lock.json
COPY cliente-vue/package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install
RUN npm install jquery --save

# Copiamos los ficheros y directorios del proyecto al directorio actual
COPY cliente-vue/./ ./
COPY cliente-vue/src ./

# Construimos la aplicacion para la producción minificada
#RUN npm run build

# Exponemos el puerto 8080 para las conexiones
EXPOSE 8080

ENTRYPOINT ["npm", "run", "serve"]
