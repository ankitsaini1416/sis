FROM nginx:1.17.6-alpine

EXPOSE 80

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]