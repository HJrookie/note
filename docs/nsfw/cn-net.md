国际网络出入口 北上广
电信:  普通: 163骨干网 chinaNet  人多就炸,晚上爆炸
       优秀: CN2 　ＧＴ　半程CN2
       超级  CN2   GIA  全程cn2
       策略: 高峰期时,国际出口,按优先级,策略丢包,世界加钱可及
       国际出口一般是 202.97.*  AS4134节点
       普通用户国内走163,国外估计也是,网络很垃圾
       CN2 GT 国内走163,很有可能国际出口丢包,但是国际传输不会丢包,一般般
       CN2 GIA 国内走59.43,AS4809,不走163,很稳
       CN2 GIA 还分单,双,三网接入, 
       单网:  例子:         aliyun国际hk
       双网:  多了联通,例:   标准互联 圣何塞 CN2 GIA
       三网   全网接入 例:   BWG DC6,DC9
       缺点: 防御ddos不行

联通:   国际出口北上广
        出/回走 219.158, AS4837 (联通169网络)   /AS9929(A网路由)
        晚高峰丢包低不少
        美日线路性价比高,新加坡绕日本,NTT,很垃圾.aliyun除外
        日本走上海出口,IIJ线路很好,NTT垃圾（地区后面可以看出来）
        A网只在国内有用(政企)，国外全都走169,到了国内走A网.

移动     国内大多是AS9808,出口北上广,但是广州负载较大.北京移动主要是直连欧洲
         PCCW线路很好,只逊色于cn2 GIA

#### 一些测速脚本
```shell
wget -qO- bench.sh | bash
wget -qO- git.io/superbench.sh |bash


开启端口 sudo firewall-cmd --zone=public --add-port=10022/tcp --permanent
重载防火墙配置  sudo firewall-cmd --reload
查询端口状态:  sudo firewall-cmd --zone=public --query-port=10022/tcp
开放端口     sudo firewall-cmd --zone=public --add-port=55555/tcp --permanent
重启防火墙 sudo systemctl restart firewalld.service
开启防火墙  sudo  systemctl enable firewalld.service
查看所有开启的端口  sudo firewall-cmd --zone=public --list-ports
查看监听的端口   sudo  netstat -lnpt
查看端口占用 netstat -ant|grep 8080 
```

#### cloud-init
```log
Cloud-init顺序
cloud-init init --local
cloud-init init
cloud-init modules --mode=config
cloud-init modules --mode=final



打印日志的代码: **Internal name:** ``cc_final_message``
日志相关配置文件:           /etc/cloud/cloud.cfg.d/05_logging.cfg
日志文件的位置:                /var/log/cloud-init-output.log
各个模块,start,finish时间   /var/lib/cloud/data
不同阶段执行模块             /etc/cloud/cloud.cfg
所有的配置持久化             /run/cloud-init/instance-data.json
service文件的位置            /lib/systemd/system/*.service



$ cloud-init clean
$ rm -f /var/log/cloud*
$ cloud-init init --local
Cloud-init v. 18.2 running 'init-local' at Fri, 29 Jun 2018 07:29:58 +0000. Up 551.27 seconds.
$ cloud-init init
Cloud-init v. 18.2 running 'init' at Fri, 29 Jun 2018 07:30:02 +0000. Up 555.57 seconds.
ci-info: ++++++++++++++++++++++++++++++++++++++++Net device info++++++++++++++++++++++++++++++++++++++++
ci-info: +--------+------+------------------------------+-----------------+--------+-------------------+
ci-info: | Device |  Up  |           Address            |       Mask      | Scope  |     Hw-Address    |
ci-info: +--------+------+------------------------------+-----------------+--------+-------------------+
ci-info: |  ens2  | True |        10.15.121.133         | 255.255.255.254 | global | de:1a:20:20:20:03 |
...
$ cloud-init modules --mode=config
Cloud-init v. 18.2 running 'modules:config' at Fri, 29 Jun 2018 07:30:11 +0000. Up 564.70 seconds.
$ cloud-init modules --mode=final
Cloud-init v. 18.2 running 'modules:final' at Fri, 29 Jun 2018 07:30:16 +0000. Up 569.64 seconds.
status: running
Scaleway is happy to welcome you to a cloud-init enabled instance




打印日志的代码: **Internal name:** ``cc_final_message``
日志相关配置文件:           /etc/cloud/cloud.cfg.d/05_logging.cfg
日志文件的位置:                /var/log/cloud-init-output.log
各个模块,start,finish时间   /var/lib/cloud/data
不同阶段执行模块             /etc/cloud/cloud.cfg
所有的配置持久化             /run/cloud-init/instance-data.json
service文件的位置            /lib/systemd/system/*.service
Directory Layout:            /var/lib/cloud       这个目录是/etc/cloud/cloud.cfg中cloud_dir参数
cloud config data路径:       默认是/var/lib/cloud/instance/user-data.txt
user-data,metadata例子       /usr/share/doc/cloud-init/examples/seed
user-data默认指向              /var/lib/cloud/instance/user-data.txt


# This is expected to be a yaml formatted file
CLOUD_CONFIG = '/etc/cloud/cloud.cfg'

RUN_CLOUD_CONFIG = '/run/cloud-init/cloud.cfg'

Cloud-init顺序
cloud-init init --local
cloud-init init
cloud-init modules --mode=config
cloud-init modules --mode=final
ssh-keygen -t rsa -b 4096 -C "a851564002@gmail.com"


注意：cloud-init 只有第一次启动的时候会修改密码，也就是说第一次安装cloud-init，然后配置/etc/cloud/cloud.cfg，关机清理信息。再开机会强行修改密码。

接着再开机不会强行修改密码，即使删除cloud-init再重装配置也不行。

```