FROM nginx:1.23

# 挂载目录
VOLUME /home/xxx
# 创建目录
RUN mkdir -p /home/xxx
# 指定路径
WORKDIR /home/xxx

RUN rm -rf /usr/share/nginx/html/*  &&  rm -f /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
