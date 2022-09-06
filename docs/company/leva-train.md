
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



