FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y nginx

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app

RUN npm run build

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

RUN mv dist/* /var/www/html

RUN mv proxy.conf /etc/nginx/conf.d/
RUN mv entrypoint.sh /
RUN chmod 775 /entrypoint.sh
RUN rm -Rf /etc/nginx/sites-enabled/default

RUN rm -Rf /usr/src/app

ENTRYPOINT /entrypoint.sh