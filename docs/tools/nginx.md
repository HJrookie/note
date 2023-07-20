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