FROM node:18.14.2-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Ajustar la configuración de Vite para que se ejecute correctamente en el contenedor
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

RUN npm run build

CMD [ "vite","npm", "run", "start" ]
