### 四. 配置 HTTPS 

本项目根目录执行`openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`  

注意不要一直按回车,需要输入一些信息

```js

-----

Country Name (2 letter code) []:

State or Province Name (full name) []:

Locality Name (eg, city) []:

Organization Name (eg, company) []:

Organizational Unit Name (eg, section) []:

Common Name (eg, fully qualified host name) []     // 重要,这里写 127.0.0.1

Email Address []:

```




    docker run -d --restart=always --privileged=true -p 80:80 -v /root/yq/nginx/static:/usr/share/nginx/html  -v /root/yq/nginx/nginx.conf:/etc/nginx/nginx.conf  -v /root/yq/nginx/https:/usr/https --name nginx  nginx


