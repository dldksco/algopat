FROM node:18 as builder

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build --no-verify

FROM nginx:stable-alpine

WORKDIR /app

RUN mkdir build

COPY --from=builder /usr/src/app/dist ./build

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
