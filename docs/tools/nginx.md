### 1.mac 上 nginx 的各种目录
1. 配置文件目录   `/usr/local/etc/nginx  `
2. 日志目录       `/usr/local/var/log/nginx/access.log  `
3. 静态文件目录   `/ /usr/local/var/www/static`

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

docker run -d --restart=always --privileged=true -p 80:80 -v /home/lenovoedu/front-end-nginx/static:/usr/share/nginx/html  -v /home/lenovoedu/front-end-nginx/nginx.conf:/etc/nginx/nginx.conf --name nginx  nginx

# 
docker run -d --restart=always --privileged=true -p 80:80 -v /home/lenovoedu/nginx/static:/usr/share/nginx/html  -v /home/lenovoedu/nginx/nginx.conf:/etc/nginx/nginx.conf  -v /home/lenovoedu/nginx/logs:/var/log/nginx  --name nginx  nginx

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


#### nginx 配置
```nginx
 add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
```