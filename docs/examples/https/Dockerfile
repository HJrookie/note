FROM nginx:1.23
#ENV FLASK_APP app.py
#ENV FLASK_RUN_HOST 0.0.0.0

# 挂载目录
VOLUME /home/edu-test
# 创建目录
RUN mkdir -p /home/edu-test
# 指定路径
WORKDIR /home/edu-test

RUN rm -rf /usr/share/nginx/html/*  &&  rm -f /etc/nginx/nginx.conf
ADD dist/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/nginx.conf

#ENTRYPOINT ["sh","-c","exec java -Djava.security.egd=file:/dev/./urandom -jar /home/edu-test/admin.jar ${ACTIVE}"]
