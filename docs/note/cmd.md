#### 网卡
```shell
sudo ifconfig en1 down
sudo ifconfig en1 up
sudo arp -d -a  
```

#### letms 项目启动不了
```shell
# 如果npm 安装依赖全局安装  不是安装到项目本地
npm config --global false 
# 方法1
# 1. 把package-lock.json 删除了
# 2. npm i 会报错 antd的依赖错误
# 3
npm i --legacy--peer-deps 
```

#### node version
```shell
#查看可用版本 n 模块
npm view node versions
n 16.10.0

sudo n 17.0.0 
sudo NODE_MIRROR=http://npm.taobao.org/mirrors/node n stable
sudo NODE_MIRROR=http://npm.taobao.org/mirrors/node n 18.0.0

# npm清除缓存
npm cache clear --force 
npm cache clean --force 
```

#### windows nvm
```shell
# 在这里下载exe 安装
https://github.com/coreybutler/nvm-windows/releases  
# 终端中配置镜像 
nvm npm_mirror https://npmmirror.com/mirrors/npm/W
nvm node_mirror https://npmmirror.com/mirrors/node/
# install 
nvm install 16.11.0  
nvm use 16.11.0
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


#### python
```shell

python -m venv venv

python 启动虚拟环境

source ./venv/bin/activate
退出
deactivate

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
#### nodejs 安装  注意不要装到 root 目录下,不然安装库时有权限问题 (官方文档)[https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally]
```shell
# https://nodejs.org/dist/v15.4.0/node-v15.4.0-linux-x64.tar.gz
wget --no-check-certificate https://nodejs.org/dist/v16.1.0/node-v16.1.0-linux-x64.tar.xz
# https://nodejs.org/dist/v14.4.0/node-v14.4.0-linux-x64.tar.gz
tar xf node-v16.1.0-linux-x64.tar.xz
# 如果解压报错 执行 yum install -y xz   或者  apt install -y xz-utils ,然后重新解压
cd node-v16.17.0-linux-x64
pwd                                                           //查看当前的目录 , 假设是 /Users/app
ln -s /home/edu-test/node-v16.17.0-linux-x64.tar.xz/bin/npm   /usr/local/bin/ 
ln -s /Users/app/bin/node    /usr/local/bin/
node -v          # v16.13.0
npm -v				   # 8.1.0
npm config set registry https://registry.npm.taobao.org      # 设置 npm 源


# 解决npm 全局安装后命令找不到问题 
vi /etc/profile
export NODE_PATH=/root/nodejs/node-v14.16.1-linux-x64/bin
export PATH=${PATH}:${NODE_PATH}
```

#### yum 更新 git
```shell
yum install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
#安装git
yum install git
#更新git
yum update git
```

####  linux 操作日志
```shell
tail -200f /var/log/messages
# cpu mem 占用
ps aux | sort -nrk 3,3 | head -n 5

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
    "https://docker.mirrors.ustc.edu.cn"
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com"
  ]
}
# 使配置生效
systemctl daemon-reload
# 重启Docker
systemctl restart docker
# 安装 docker-compose
# curl -L https://get.daocloud.io/docker/compose/releases/download/v2.10.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# curl -L https://github.com/docker/compose/releases/download/1.25.0/docker-compose-Linux-x86_64 > /usr/local/bin/docker-compose

 curl -k -L  https://download.fastgit.org/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### 启动容器
```shell
# mysql
docker run -itd --name mysql -p 3306:3306 --privileged=true  --restart=always -e MYSQL_ROOT_PASSWORD=root  -e TZ=Asia/Shanghai mysql:5.7 
# 使用 root 用户进入容器
docker exec --user root -it 18e541e99668 bash
# 启动 nginx
docker run -d -p 80:80  -v /usr/local/letmsHtml:/usr/local/letmsHtml -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf --name nginx nginx
# 保存容器 并且 load
docker save wise-llm-platform:0.3 | gzip -c >  wise-llm-platform-0.3.tar 
docker load -i edu-test-itsm-0.2.tar 
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
ls -S -lah | head -11 

# find 
find "." -name .DS_Store | xargs rm

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



#  git 批量修改所有的提交记录
git filter-branch -f --env-filter "GIT_AUTHOR_NAME='rookie'; GIT_AUTHOR_EMAIL='1181400768@qq.com'; GIT_COMMITTER_NAME='rookie'; GIT_COMMITTER_EMAIL='1181400768@email';" HEAD

```


#### gitlab runner 权限问题

```shell
# 把结果复制到这个目录失败,就修改它的 权限
chown -R gitlab-runner:gitlab-runner nginx
# 还有个办法是 修改 gitlab-runner 这个用户的权限,但是这种改动 影响范围 比较大
https://www.cnblogs.com/qiyebao/p/12105737.html
```


#### ntp
```shell
yum install ntp
systemctl enable ntpd
# 增加 -g -x 参数
vi /etc/sysconfig/ntpd
service ntpd restart
date
```

#### 网络
```shell
# 所有 ip 计时 程序 tcp 
netstat -anopt 
```




### git 不用多次输入账号密码

```sh
git config --global credential.helper store
# git 清除缓存
git rm -r --cached .
# 删除远程分支
git push origin --delete [branchname]
```








#### github 代理配置

```shell
git config --global http.https://github.com.proxy http://127.0.0.1:54621
// 文章地址       https://ericclose.github.io/git-proxy-config.html
# 单次克隆代理
git clone -c http.proxy="127.0.0.1:7890" https://github.com/labring/FastGPT.git
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



#### gmail gcp 荔盈街6及8号
4514 6175 0069 8636          54

// clash 加速地址
https://ghproxy.com/https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/reject.txt

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
bash <(curl -sL https://raw.githubusercontent.com/luciferkids/hijkpw-scripts/main/ss.sh)
// with plugin
wget -N --no-check-certificate -c -t3 -T60 -O ss-plugins.sh https://git.io/fjlbl
chmod +x ss-plugins.sh
./ss-plugins.sh

# 例子 
port: 1725
cipher: aes-256-cfb
password: slflsnfs@#$8fs

34.142.139.


Xray官网：https://xtls.github.io/
XUI的github页面：https://github.com/vaxilu/x-ui

好用的一键脚本：
wulabing的一键脚本（ws+tls）：https://github.com/wulabing/V2Ray_ws-tls_bash_onekey
make-a的八合一脚本：https://github.com/mack-a/v2ray-agent
jinwyp 的一键多协议脚本：https://github.com/jinwyp/one_click_script

其他：
hysteria协议：https://github.com/apernet/hysteria
REALITY协议：https://github.com/XTLS/REALITY
linux网络加速：https://github.com/ylx2016/Linux-NetSpeed
萌咖的一键DD脚本：https://github.com/veip007/dd
路由规则增强版：https://github.com/Loyalsoldier/v2ray-rules-dat
clash路由规则：https://github.com/Loyalsoldier/clash-rules

客户端：
V2rayN：https://github.com/2dust/v2rayN
# 获取基本信息,不测试网络
curl -sL yabs.sh | bash -s -- -i
```

#### 
```shell
# 清除 dns 缓存
sudo killall -HUP mDNSResponder
```


#### 查看当前路径下文件夹大小
```shell
# mac
du -d 1 -h
# linux
du -ah --max-depth=1.
```
