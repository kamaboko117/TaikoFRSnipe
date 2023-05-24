FROM debian:buster

RUN apt-get update && apt-get install -y \
    nginx

COPY ./nginx.conf etc/nginx/sites-available/default

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]