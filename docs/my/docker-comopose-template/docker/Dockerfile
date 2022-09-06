FROM nginx:1.23

# 挂载目录
VOLUME /home/lenovo
# 创建目录
RUN mkdir -p /home/lenovo
# 指定路径
WORKDIR /home/lenovo

RUN rm -rf /usr/share/nginx/html/*  &&  rm -f /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
