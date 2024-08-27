#### 0. centos yum 安装的 nginx 各种目录
(1) Nginx配置路径：/etc/nginx/  
(2) PID目录：/var/run/nginx.pid  
(3) 错误日志：/var/log/nginx/error.log  
(4) 访问日志：/var/log/nginx/access.log  
(5) 默认站点目录：/usr/share/nginx/html  
### 1.mac 上 nginx 的各种目录
1. 配置文件目录   `/usr/local/etc/nginx  `
2. 日志目录       `/usr/local/var/log/nginx/access.log  `
3. 静态文件目录   `/usr/local/var/www/`

### 2. docker 上 nginx 的各种目录
1. 配置文件目录   `/etc/nginx/nginx.conf  `
2. 日志目录       `/var/log/nginx  `
3. 静态文件目录   `/usr/share/nginx/html`

### 启动命令
```shell
#32 上贵州项目的 nginx 命令
docker run -d -p 8088:80 -v /root/app/front:/usr/share/nginx -v /etc/docker-app/nginx/nginx-guizhou.conf:/etc/nginx/nginx.conf --name nginx-guizhou  nginx
docker run -d --restart=always --privileged=true -p 80:80 -v /root/app/nginx/static:/etc/nginx/html -v /root/app/nginx/nginx.conf:/etc/nginx/nginx.conf -v /root/app/nginx/log:/var/log/nginx --name nginx  nginx


docker run -d --restart=always --privileged=true -p 80:80 -v /usr/local/letmsHtml:/usr/local/letmsHtml -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf -v /usr/local/file:/usr/local/file --name nginx  nginx

// 天津大赛 7 月在云服务上部署时的命令  
docker run -d --restart=always --privileged=true -p 80:80 -v /etc/localtime:/etc/localtime -v /home/xxx/dockerProjects/nginx/nginx.conf:/etc/nginx/nginx.conf -v /usr/local/file:/usr/local/file -v /home/xxx/dockerProjects/nginx/static:/usr/share/nginx/html -v /home/xxx/dockerProjects/nginx/logs:/var/log/nginx --name nginx  nginx:1.23

docker run -d --restart=always --privileged=true -p 80:80 -v /home/edu-test/front-end-nginx/static:/usr/share/nginx/html  -v /home/edu-test/front-end-nginx/nginx.conf:/etc/nginx/nginx.conf --name nginx  nginx

# 
docker run -d --restart=always --privileged=true -p 80:80 -v /home/edu-test/nginx/static:/usr/share/nginx/html  -v /home/edu-test/nginx/nginx.conf:/etc/nginx/nginx.conf  -v /home/edu-test/nginx/logs:/var/log/nginx  --name nginx  nginx

# lf
 docker run -d --restart=always --privileged=true -p 80:80 -v  /root/nginx/static:/usr/share/nginx/html -v /root/nginx/nginx.conf:/etc/nginx/nginx.conf -v /root/nginx/logs:/var/log/nginx --name nginx nginx
```

img
### 2.常用命令
##### 2.1 linux上常用命令
1. 重启       `sudo nginx -s stop && sudo nginx  `
2. 拷贝文件    `cd dist &&  cp -R . /usr/local/var/www && cd ..`

##### 2.2 win上常用命令
> 要先把 路径 加到path中  
##### 2.3 命令列表
1. 启动  `start nginx` 
2. nginx -s [cmds]   [nginx 文档](http://nginx.org/en/docs/beginners_guide.html)    
3. `nginx -s reload` 不用重启,配置就能生效


### 4. nginx 性能优化
##### 4.1 gzip 压缩
```nginx
gzip on;
gzip_min_length 1k;
gzip_buffers 4 16k;
#gzip_http_version 1.0;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_vary off;
gzip_disable "MSIE [1-6]\.";
```
##### 4.2 图片过滤模块  [stack-overflow](https://stackoverflow.com/questions/40574866/docker-nginx-ngx-http-image-filter-module)
模块地址在 nginx 镜像的 `/etc/nginx/modules/`, nginx 的镜像里默认会带
```nginx
load_module /etc/nginx/modules/ngx_http_image_filter_module.so;  # 放到 nginx 配置文件顶部
```


### 8. nginx镜像里的问题
#### 8.1 没有 vi
1. apt-get 换源  `sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list`  
2. `apt-get update            apt-get upgrade`  
3. apt-get install vim


#### nginx 知识
1. `http - server - location`会有继承  
2. nginx 怎么处理 多个 server 以及 server_name ?  
```nginx.conf
server {
    listen      192.168.1.1:80;
    server_name example.org www.example.org;
}
server {
    # 不同端口可以有不同的默认 server
    listen      192.168.1.1:80 default_server; 
    server_name example.net www.example.net;
}
server {
    # 不同端口可以有不同的默认 server
    listen      192.168.1.2:80 default_server;
    server_name example.com www.example.com;
}
```
> 1. 先看 ip 和端口,即一个请求有目标 ip 和端口,然后和 listen 比对. 比对完之后,再根据 HOST 来比对 server_name .如果没找到 server_name,就让默认 server处理;  
> 2. 一个来自`192.168.1.1:80`端口,并且Host 是`www.example.com`会被 `192.168.1.1:80`处理,就是第一个 server,因为80 端口上没有相对应的域名;

3. 负载均衡
```nginx
http {
    upstream myapp1 {
        # 默认是随机的
        least_conn;  # 最少连接策略,不会让一个server 请求太多
        ip_hash;   # 请求发送到上次接受请求的服务器;
        # 加权.  5 = 3 1 1 
        server srv1.example.com weight=3;
        server srv2.example.com;
        server srv3.example.com;
    }
    server {
        listen 80;
        location / {
            proxy_pass http://myapp1;
        }
    }
}
```








#### nginx 配置实例

```js
// 前端 baseUrl 配置为  /secure
location /secure/ {
  proxy_pass "http://10.103.237.156:4800/";
  # proxy_pass "http://localhost.localdomain:4800/";
}
#user  nobody;
worker_processes  2;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    client_max_body_size 100M;
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  1800;
    client_max_body_size 1024M;
    proxy_connect_timeout       600;
    proxy_send_timeout          600;
    proxy_read_timeout          600;
    send_timeout                600;
    #gzip  on;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 5;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location / {
            #root   /root/letmsHtml;
            try_files $uri $uri/ /index.html;
            # root   /usr/local/letmsHtml;
            root   /usr/share/nginx/html;
            index  index.html;
        }
        location /api/ {
            #基础服务  a.com/api/bbb 会替换到  http://10.103.237.165:8080/bbb
            proxy_pass       http://10.103.237.165:8080/;    
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location /file/ {
            add_header Access-Control-Allow-Origin *;
            alias   /usr/local/file/;
            # alias /usr/local/file/2022/02/24/;
            # autoindex on;
            autoindex_exact_size off;
        }
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
以上的配置会按以下规则转发请求( GET 和 POST 请求都会转发):
将 http://example.com/mail/ 下的请求转发到 http://example.com:portmail/
将 http://example.com/com/ 下的请求转发到 http://example.com:portcom/main/
将其它所有请求转发到 http://example.com:portdefault/
————————————————
```

https://zhuanlan.zhihu.com/p/137146854

如果 URI 结构是 https://domain.com/ 的形式，尾部有没有 / 都不会造成重定向。因为浏览器在发起请求的时候，默认加上了 / 。虽然很多浏览器在地址栏里也不会显示 / 。这一点，可以访问百度验证一下。
如果 URI 的结构是 https://domain.com/some-dir/ 。尾部如果缺少 / 将导致重定向。因为根据约定，URL 尾部的 / 表示目录，没有 / 表示文件。所以访问 /some-dir/ 时，服务器会自动去该目录下找对应的默认文件。如果访问 /some-dir 的话，服务器会先去找 some-dir 文件，找不到的话会将 some-dir 当成目录，重定向到 /some-dir/ ，去该目录下找默认文件。
