FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
