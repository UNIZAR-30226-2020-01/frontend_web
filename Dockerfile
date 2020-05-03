# FROM node:9.11.1-alpine

# # Instalamos el sevidor HTTP para el contenido estático
# #RUN npm install -g http-server

# WORKDIR /app

# # Copiamos el package.json y el package-lock.json
# COPY cliente-vue/package*.json ./

# # Instalamos las dependencias del proyecto
# RUN npm install
# #RUN npm install jquery --save
# #RUN npm install bootstrap jquery popper.js


# # Copiamos los ficheros y directorios del proyecto al directorio actual
# COPY cliente-vue/./ ./
# #COPY cliente-vue/src ./

# # Construimos la aplicacion para la producción minificada
# #RUN npm run build

# # Exponemos el puerto 8080 para las conexiones
# EXPOSE 8080

# ENTRYPOINT ["npm", "run", "serve"]

FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY ./cliente-vue/package*.json ./
RUN npm install
COPY ./cliente-vue/ ./
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf