FROM node:19
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm","run","prod"]