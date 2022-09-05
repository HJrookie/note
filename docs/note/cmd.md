### docker

#### 启动 mysql5.7

--privileged=true

docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root  -e TZ=Asia/Shanghai mysql:5.7

docker exec --user root -it 18e541e99668 bash

```
# 启动 nginx
165 环境上 nginx 配置
nginx 配置文件位置: /usr/local/nginx
静态文件位置:   /usr/local/letmsHtml

docker run -d -p 80:80  -v /usr/local/letmsHtml:/usr/local/letmsHtml -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf --name nginx nginx

```





ls -lh --time-style="+%Y-%m-%d %H:%M:%S" -t





#### 修改源

https://www.cnblogs.com/reasonzzy/p/11127359.html



#### 测试环境 pve 批量操作页面

https://192.168.31.108:8006/pve-docs/api-viewer/letms-pve-admin.html

#### 8.html 操作页面 (如果虚拟机没开机,就会显示链接失败)

https://192.168.31.108:8006/pve-docs/api-viewer/8.html?studentId=126&QuestId=113

### 压缩文件

```shell
tar -zcvf dist.gz *
scp dist.tar.gz root@10.103.237.165:/usr/local/letmsHtml

```



#### FTP 下载服务器上的文件到本地

```shell
# 这时候是没有 ssh 连到远程服务器的,还是在本地
scp root@10.103.237.40:/usr/share/pve-docs/api-viewer/7.html .
```



#### tampermonkey 添加自定义样式

```js
// ==UserScript==
// @name         New Userscript
// @namespace    http://bbs.nga.cn/              // 这个不知道啥意思
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        bbs.nga.cn/**          // 这个代表匹配网站
// @icon         https://www.google.com/s2/favicons?domain=firefoxchina.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(1222222222)
    var style = document.createElement("style");
    style.type = "text/css";
    var text = document.createTextNode("* {background: white !important;}"); /* 这里编写css代码 */
    style.appendChild(text);
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
    // Your code here...
})();
```





#### Axure 9 注册码

https://www.chinavid.com/axure-authorizationcode.html



#### webpack-dev-server 支持其他设备访问配置

```js
devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    compress: true,
    host: HOST || config.dev.host,              //  这个要改成 本机 ip ,例如 192.168.1.183
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    watchOptions: {
      poll: config.dev.poll,
    }
  },
```





#### jenkins 命令

 用 root 用户进入镜像里        docker exec --user root -it 18e541e99668 bash



```shell
node -v &&
npm -v&&
npm config set registry https://registry.npm.taobao.org &&
npm install --unsafe-perm=true --allow-root &&
rm -rf dist &&
npm run build &&
cd dist &&
tar -zcvf dist.tar.gz *
```



```shell
cd app/front/admin-guizhou
rm -rf *
mv ../dist.tar.gz ./
tar -zxvf dist.tar.gz
rm -rf dist.tar.gz
```

####  SCP

scp dist.tar.gz root@10.103.237.32:/root/app/front/





#### centos 防火墙

https://www.cnblogs.com/heqiuyong/p/10460150.html

```shell
firewall-cmd --zone=public --add-port=80/tcp --permanent   # 开放5672端口
firewall-cmd --zone=public --remove-port=5672/tcp --permanent  #关闭5672端口
firewall-cmd --reload   # 配置立即生效
firewall-cmd --zone=public --list-ports     #查看防火墙所有开放的端口
```



#### #### app 启动命令

```shell
npm config set registry https://registry.npm.taobao.org
npm install -g pm2
npm install axios
npm install cors --save
npm install express --save

   40  2021-12-31 10:45:37 systemctl enable firewalld.service
   41  2021-12-31 10:45:49 systemctl start firewalld
   42  2021-12-31 10:45:53  firewall-cmd --state
   43  2021-12-31 10:46:13 firewall-cmd --zone=public --add-port=3000/tcp --permanent
   44  2021-12-31 10:46:18 firewall-cmd --reload
```









### hosts

```shell
vi /etc/hosts
```





### ssh 不断

```sh
vi  /etc/ssh/sshd_config

ClientAliveInterval 30

service sshd restart 
```



### mohss _web 打包命令

```shell
npm run build  && cd build && tar -zcvf dist.tar.gz *

scp dist.tar.gz root@10.103.237.32:/root/app/front/

tar -zxvf dist.tar.gz


```



### mohss _admin  打包命令

```shell
npm run build  && cd dist && tar -zcvf dist.tar.gz *

scp dist.tar.gz root@10.103.237.32:/root/app/front/

tar -zxvf dist.tar.gz


```



#### 配置yum 源

```shell
# 163 教程 https://mirrors.163.com/.help/centos.html
# 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
cd /etc/yum.repos.d
wget https://mirrors.163.com/.help/CentOS7-Base-163.repo
yum clean all
yum makecache

```



#### centos 安装 docker

```shell
// 官方  https://docs.docker.com/engine/install/centos/

sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

// 安装完发现没启动 
systemctl start docker            
systemctl enable docker   
chown lenovo:lenovo directory


// 修改镜像源      看下面这个文章
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

#### git 配置用户名密码

```shell
git config --global user.name "xxx"(输入你的用户名)
git config --global user.email "xxx"(输入你的邮箱)
git config --list
```





#### gitlab 权限问题

```shell
# 把结果复制到这个目录失败,就修改它的 权限
chown -R gitlab-runner:gitlab-runner nginx


# 还有个办法是 修改 gitlab-runner 这个用户的权限,但是这种改动 影响范围 比较大
https://www.cnblogs.com/qiyebao/p/12105737.html
```







### git 不用多次输入账号密码

```sh
git config --global credential.helper store
sunpeng@lenovoedu.com
gsnysbslzr1234560.aA

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
            autoindex on;
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





### DNS配置



```
cat /etc/resolv.conf
// 这里是网卡的配置,优先级比较高
cd  /etc/sysconfig/network-scripts/ && ll     

```





#### zsh 配置

```shell
vi ~/.zshrc 
```



#### windows server 2012

VDNYM-JBKJ7-DC4X9-BT3QR-JHRGY



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
//获取本地ip
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





### Letms 发版

```shell
// 先在 本地 
npm run build:prod  
// 压缩
cd build && tar zcvf dist.tar.gz * && cp dist.tar.gz .. && cd ..

scp dist.tar.gz root@10.103.237.202:/usr/local

ssh root@10.103.237.202
cd /usr/local/letmsHtml

//  删除的时候一定要慎重
rm -rf ./*
cp ../dist.tar.gz  .
tar zxvf dist.tar.gz 
rm -f config.json
cp ../config.json.back  config.json
```













### centos7 安装Python3 

https://blog.csdn.net/elija940818/article/details/79238813  (重装 python 的命令不对, 注意python-* 位置)

https://vault.centos.org/7.7.1908/os/x86_64/Packages/     找文件的地址,需要根据对应镜像来找

#### 卸载 python2 并且用 rpm 重新安装

https://www.cnblogs.com/wangjunjiehome/p/9239005.html



#####  激活虚拟环境

1. linux 

   ```shell
   Source bin/active
   ```

   deactivate

2. Windows 10:

```text
> cd venv
> .\Scripts\activate.bat
```



#### 安装依赖

```shell
# 更新pip
pip install pip -U  -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com

```



python -m pip install 这样子安装

```shell
1.  pip3 install mysqlclient 
   可能会报错说 mysql_config 没有找到   , 执行  yum install mysql-devel gcc gcc-devel python-devel
2. pip3 install -r requirements.txt


```

pip3 install -r requirements.txt    安装依赖

pip3 install django-cors-headers      

pip3 install python-dateutil 

#### 启动安防项目

 python3 manage.py runserver 0.0.0.0:4800

python3 manage.py runsslserver 0.0.0.0:4800









1. cd 到   /root/app/security/intelligent-security-server 目录,   输入  python3 manage.py runsslserver 0.0.0.0:4800    ,启动后端

2. cd 到   /root/app/security/intelligent-security-web ,   输入  vi src/ajax.js +6        , 编辑请求配置

   原地址为   baseURL: "https://10.103.237.156:4800"      , 修改为   baseURL: "https://当前机器的 ip:4800"

   保存并退出,

   然后执行 npm  run dev 

3. 在浏览器打开   https://前端项目所在机器的 ip:8002/  ,即可打开本项目,  但是请求会报错

4. 在浏览器打开   https://机器的 ip:4800/  ,  确认接受使用不安全的证书

5. 在浏览器打开   https://leva.lenovoedu.cn/    , 确认接受使用不安全的证书

6. 切换到前端页面, 输入账号密码 登录





目前剩余问题

1. 语音助手 

   1.1 实时语音识别问题

   ​	     该项目固有问题,修起来很麻烦,这周差不多能修好

2. 智能安防

   2.1 后端 需要手动启动问题

   ​        需要想解决方案(后端我不大熟悉)

   2.2 退出按钮

   ​       做起来比较快,这周可以做,目前还没做,在修 letms 问题

   2.3 多摄像头切换

   ​      需要确定是否要做,再确定方案,以及是否需要添加接口

3. 家庭呵护

   3.1 添加照片  高频失败

   ​      这里的逻辑是 拍摄图片,将图片转 base64,然后调接口;

   ​	  高频失败是因为该接口返回值中报错

   ```js
   message: "The 1th picture failed"
   result: "{}"
   status: -1
   ```

   ​    文档中没有相关信息,报错原因并不明确,猜测是拍摄的照片不清晰

4. 其他的问题  都是由于 leva 人脸识别接口引起的,该接口修复后,那些问题  自然会修复















### 1. git 克隆大文件失败问题

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





####  prisma

```shell
npx prisma migrate dev --name init
```





### 晓峰部署时kubectl get nodes 报错 

要先启动 node 节点,然后把他们的 ip 改对,然后再启动 master 节点, 要不然的话,master 节点先起来,就看到自己没有子节点了,就会重新起服务





#### 天津大赛  docker 仓库



```sh
$ docker login --username=菜菜成功 registry.cn-hangzhou.aliyuncs.com
lenovo@123
$ docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/deu-lenovo-project/signup:[镜像版本号]
$ docker push registry.cn-hangzhou.aliyuncs.com/deu-lenovo-project/signup:[镜像版本号]

$ docker pull registry.cn-hangzhou.aliyuncs.com/deu-lenovo-project/signup:[镜像版本号]
```





#### 新机器步骤

```shell
# 1. 修改 yum 源 
https://developer.aliyun.com/mirror/centos/
# 2. yum update 
# 3. yum upgrade 
# 4. 装 docker
https://docs.docker.com/engine/install/centos/
```







kubectl  edit cm -n leva ai-auth-cfg  





头肩检测用的CPU ，姿势评估为GPU









#### docker registry查看镜像和版本

查看镜像列表
http://ip:5000/v2/_catalog
查看镜像所有tag版本
http://ip:5000/v2/zhjg/镜像名/tags/list

https://dockerhub.lenovoedu.cn/v2/leva/ai-portal-i18n/tags/list