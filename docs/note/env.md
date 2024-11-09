### 111




### 服务器列表
```shell
1. 电信服务器  # 上面启动了 dify 环境,
101.227.48.37
root  GXhan*2024

2. 阿里云  
dify 
8.155.16.135   root  aliyun*2024

8.155.19.71   root  aliyun*2024  
```

#### 数据中台
地址： dp.linghu-ai.com    
http://117.50.17.115:19001/sdp-web/login   
测试账号 ceshi0814 密码是ceshi0814123    
admin    4BlQG1fe5597RAzz1qaz  

#### super sonic 
```shell
http://8.155.16.135:18005/webapp/login
mvn -f pom.xml dependency:copy-dependencies
# 执行这个命令去build,用bash
sh assembly/bin/supersonic-build.sh webapp
# G:\project\supersonic\webapp 目录下--->   supersonic-webapp.tar
# build 的脚本生成的静态文件存放在:  webapp\packages\supersonic-fe\supersonic-webapp

# 135部署地址 在/data/supersonic/su.../docker
#1.Named Volumes are best for persistent data managed by Docker.
      # - supersonic_data:/usr/src/app/supersonic-standalone-${SUPERSONIC_VERSION:-latest}
      - ./supersonic-webapp:/usr/src/app/supersonic-standalone-${SUPERSONIC_VERSION:-latest}/webapp
```
#### 指标中台
```shell
dv.linghu-ai.com  
http://117.50.17.115:18002/     
试用账号  data001 SHZN!23qaz  
管理员账号 admin SHZN!23qaz8712  
这两用户可以配合使用，data001是客户演示角色，可以用admin调整这个角色的权限。目前配置了数据集以及行列权限，可以体验。  
指标创建和指标可视化都可以参考【5.客户演示域】  
```
#### dify  
```shell
# ip 地址 
http://101.227.48.37:15001/signin
# web 界面 管理员用户 账号密码  
# 账号: 0001-hongyaokeji@gmail.com
# 密码: 0001-hongyaokeji
# 0002-qiuguojiudian@gmail.com  0002-qiuguojiudian
# 国网AIGC 统一账号  0005-dangxiaopeixun@gmail.com 0005-dangxiaopeixun


jdbc:postgresql://101.227.48.37:15005/dify
PGUSER=postgres
POSTGRES_PASSWORD=difyai123456



# 前端容器启动端口 3003  
# 前端容器启动命令  
docker run -d \
  --name dify-web-ui \
  --restart always \
  -e CONSOLE_API_URL=${CONSOLE_API_URL:-} \
  -e APP_API_URL=${APP_API_URL:-} \
  -e SENTRY_DSN=${WEB_SENTRY_DSN:-} \
  -e NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED:-0} \
  -e TEXT_GENERATION_TIMEOUT_MS=${TEXT_GENERATION_TIMEOUT_MS:-60000} \
--network docker_default   --net-alias web    --net-alias dify-web-ui -p 3003:3000 0.9.1-ui-1

```

#### 开发原型图
[链接地址](https://rp.mockplus.cn/run/rjyvZ_WhDj/BYtcU-cx-2/PvoDqtluJh?cps=expand&dt=none&ha=0&la=0&nav=1&out=0&rps=expand&rt=1&as=true)  

