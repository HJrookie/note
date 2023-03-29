#### 网卡
```shell
sudo ifconfig en1 down
sudo ifconfig en1 up
```

#### node version
```shell
#查看可用版本
npm view node versions
n 16.10.0
```

#### macos cli 配置代理
```shell
vi  ~/.zshrc
#  配置 代理
alias proxy='export all_proxy=socks5://127.0.0.1:54621'
alias unproxy='unset all_proxy'
# 加载上面的命令
source ~/.zshrc
# 执行 让代理生效
proxy
# 禁用代理  
unproxy
```

#### 配置yum 源

```shell
# 163 教程 https://mirrors.163.com/.help/centos.html
# 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
cd /etc/yum.repos.d
wget https://mirrors.163.com/.help/CentOS7-Base-163.repo
#  wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum clean all
yum makecache
# 只升级所有包，不升级软件和系统内核
yum -y upgrade 
```
#### pm2
```shell
npm install -g pm2
pm2 start app.js  --name test
pm2 startup
pm2 save 
# pm2 list      pm2 logs  app
#运行 `pm2 startup`，即在`/etc/init.d/`目录下生成`pm2-root`的启动脚本，且自动将`pm2-root`设为服务。
#运行 `pm2 save`，会将当前pm2所运行的应用保存在`/root/.pm2/dump.pm2`下，当开机重启时，运行`pm2-root`服务脚本，并且到`/root/.pm2/dump.pm2`下读取应用并启动。
```
#### nodejs 安装
```shell
# https://nodejs.org/dist/v15.4.0/node-v15.4.0-linux-x64.tar.gz
wget --no-check-certificate https://nodejs.org/dist/v16.17.0/node-v16.17.0-linux-x64.tar.xz
tar xf node-v16.17.0-linux-x64.tar.xz  
# 如果解压报错 执行 yum install -y xz   或者  apt install -y xz-utils ,然后重新解压
cd node-v16.17.0-linux-x64.tar.xz
pwd                                                           //查看当前的目录 , 假设是 /Users/app
ln -s /home/lenovo/node-v16.17.0-linux-x64.tar.xz/bin/npm   /usr/local/bin/ 
ln -s /Users/app/bin/node    /usr/local/bin/
node -v          # v16.13.0
npm -v				   # 8.1.0
npm config set registry https://registry.npm.taobao.org      # 设置 npm 源
```

#### yum 更新 git
```shell
yum install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
#安装git
yum install git
#更新git
yum update git
```


#### centos 安装 docker

```shell
# 官方文档  https://docs.docker.com/engine/install/centos/
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
# 安装完发现没启动 
systemctl start docker            
systemctl enable docker   
chown xxx:xxx directory
# 修改镜像源  
vi /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://xx4bwyg2.mirror.aliyuncs.com",
    "http://f1361db2.m.daocloud.io",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
# 使配置生效
systemctl daemon-reload
# 重启Docker
systemctl restart docker
# 安装 docker-compose
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.10.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### 启动容器
```shell
# mysql
docker run -itd --name mysql -p 3306:3306 --privileged=true -e MYSQL_ROOT_PASSWORD=root  -e TZ=Asia/Shanghai mysql:5.7 
# 使用 root 用户进入容器
docker exec --user root -it 18e541e99668 bash
# 启动 nginx
docker run -d -p 80:80  -v /usr/local/letmsHtml:/usr/local/letmsHtml -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf --name nginx nginx
```


#### docker-compose 每次都拉最新镜像
```shell
# 0. 停止
docker-compose  -f docker-web-prod.yml  stop
# 1. 拉镜像 
docker-compose  -f docker-web-prod.yml  pull
# 2. 启动
docker-compose  -f docker-web-prod.yml  up -d
docker-compose -f nginx-dev.yml down --rmi all
```





### ls 命令 查看详细时间
```shell
ls -lh --time-style="+%Y-%m-%d %H:%M:%S" -t
```



### 压缩文件

```shell
tar -zcvf dist.tar.gz *
scp dist.tar.gz root@10.103.237.165:/usr/local/letmsHtml
tar zxvf dist.tar.gz
```



#### scp 下载服务器上的文件到本地

```shell
# 这时候是没有 ssh 连到远程服务器的,还是在本地
scp root@10.103.237.40:/usr/share/pve-docs/api-viewer/7.html .
```



#### tampermonkey 添加自定义样式

```js
// ==UserScript==
// @name         New Userscript
// @namespace    http://bbs.nga.cn/              
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        bbs.nga.cn/**          // 这个代表匹配网站
// @icon         https://www.google.com/s2/favicons?domain=firefoxchina.cn
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var style = document.createElement("style");
    style.type = "text/css";
    var text = document.createTextNode("* {background: white !important;}"); /* 这里编写css代码 */
    style.appendChild(text);
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
})();
```


#### npm 基本配置
```shell
npm config set registry https://registry.npm.taobao.org
npm -v
```

#### centos 防火墙

```shell
# 网页  https://www.cnblogs.com/heqiuyong/p/10460150.html
firewall-cmd --zone=public --add-port=80/tcp --permanent   # 开放5672端口
firewall-cmd --zone=public --remove-port=5672/tcp --permanent  #关闭5672端口
firewall-cmd --reload   # 配置立即生效
firewall-cmd --zone=public --list-ports     #查看防火墙所有开放的端口
systemctl status firewalld.service  # 查看防火墙状态
```



#### Nodejs 项目部署

```shell
# 一般采用 pm2
npm config set registry https://registry.npm.taobao.org
npm install -g pm2
npm install axios
npm install cors --save
npm install express --save
```







#### git 配置用户名密码

```shell
git config --global user.name "xxx"(输入你的用户名)
git config --global user.email "xxx"(输入你的邮箱)
git config --list
```


#### gitlab runner 权限问题

```shell
# 把结果复制到这个目录失败,就修改它的 权限
chown -R gitlab-runner:gitlab-runner nginx
# 还有个办法是 修改 gitlab-runner 这个用户的权限,但是这种改动 影响范围 比较大
https://www.cnblogs.com/qiyebao/p/12105737.html
```







### git 不用多次输入账号密码

```sh
git config --global credential.helper store
# git 清除缓存
git rm -r --cached .
# 删除远程分支
git push origin --delete [branchname]
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





#### github 代理配置

```shell
git config --global http.https://github.com.proxy http://127.0.0.1:54621
// 文章地址       https://ericclose.github.io/git-proxy-config.html
```


#### zsh 配置

```shell
vi ~/.zshrc 
```



### Esxi虚拟机网络配置

```shell
vi /etc/sysconfig/network-scripts/ifcfg-ens32
  
ONBOOT 改成 yes
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=none
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens192
UUID=8cdf9766-cfaa-4261-ab14-50930eb74dc5
DEVICE=ens192
ONBOOT=yes
IPADDR=10.110.197.137
PREFIX=24
GATEWAY=10.110.197.254
DNS1=114.114.114.114
systemctl restart network
# 然后再修改 dns
```




### js 部署时获取 ip

```js
//获取本地ip  挺少用的
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
```



###  1. git 克隆大文件失败问题

 报错如下所示

```log
Receiving objects:   0% (1/1536)
Receiving objects:  17% (262/1536), 1.28 MiB | 2.55 MiB/s
Receiving objects:  17% (270/1536), 2.95 MiB | 2.92 MiB/s
Receiving objects:  18% (277/1536), 2.95 MiB | 2.92 MiB/s
Receiving objects:  19% (292/1536), 2.95 MiB | 2.92 MiB/s
Receiving objects:  20% (308/1536), 2.95 MiB | 2.92 MiB/s
Receiving objects:  21% (323/1536), 2.95 MiB | 2.92 MiB/s
Receiving objects:  22% (338/1536), 2.95 MiB | 2.92 MiB/s
Receiving objects:  23% (354/1536), 2.95 MiB | 2.92 MiB/s
error: 331 bytes of body are still expected
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: index-pack failed
```



#### 1.1 解决方案

https://stackoverflow.com/questions/21277806/fatal-early-eof-fatal-index-pack-failed



#### 2. 最终方法

git clone --depth=1 -b stu-learning http://10.103.237.65/edu/letms/letms-web.git



### 3. jenkins 官方给的方法

https://www.jenkins.io/files/2016/jenkins-world/large-git-repos.pdf


#### FTP 下载服务器上的文件到本地

```shell
# 这时候是没有 ssh 连到远程服务器的,还是在本地
scp root@10.103.237.40:/usr/share/pve-docs/api-viewer/7.html .
```




####  prisma

```shell
npx prisma migrate dev --name init
```


#### 天津大赛  docker 仓库



```sh
$ docker login --username=菜菜成功 registry.cn-hangzhou.aliyuncs.com
$ docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/deu-xxx-project/signup:[镜像版本号]
$ docker push registry.cn-hangzhou.aliyuncs.com/deu-xxx-project/signup:[镜像版本号]
$ docker pull registry.cn-hangzhou.aliyuncs.com/deu-xxx-project/signup:[镜像版本号]
```


#### docker registry查看镜像和版本

查看镜像列表
http://ip:5000/v2/_catalog
查看镜像所有tag版本
http://ip:5000/v2/zhjg/镜像名/tags/list

https://dockerhub.xxx.cn/v2/leva/ai-portal-i18n/tags/list



#### 卸载 rpm 包,
```shell
rpm -i fff.rpm
# 卸载 rpm ,先查看所有的  ,再卸载
rpm -aq|grep gitlab    
rpm -e --nodeps gitlab-runner-15.1.0-1.i686    
```

#### git  修改.gitignore 后立即生效
```shell
git rm -r --cached .  
git add .
git status
```

#### npm 代理
npm config set proxy=http://127.0.0.1:54621
npm config set https-proxy http://server:port
npm config delete proxy
npm config delete https-proxy



### ssh 不断

```sh
vi  /etc/ssh/sshd_config

ClientAliveInterval 30

service sshd restart 
```


#### gmail



```shell
sudo su
vi /etc/ssh/sshd_config
# 改成 yes
PermitRootLogin no
PasswordAuthentication no
service sshd restart
passwd root
gsnysbslzr@123qwe
//  ss no混淆
bash <(curl -sL https://raw.githubusercontent.com/Miuzarte/hijk.sh/main/Original/ss.sh)
// with plugin
wget -N --no-check-certificate -c -t3 -T60 -O ss-plugins.sh https://git.io/fjlbl
chmod +x ss-plugins.sh
./ss-plugins.sh
```

#### 
```shell
# 清除 dns 缓存
sudo killall -HUP mDNSResponder
```