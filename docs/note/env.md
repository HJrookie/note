### 服务器列表
```shell
1. 阿里云服务器  # 上面启动了 dify 环境,
101.227.48.37
root  GXhan*2024

```


#### dify  
```shell
# ip 地址 
http://101.227.48.37:15001/signin
# web 界面 管理员用户 账号密码  
# 账号: tenant1_admin@gmail.com
# 密码: tenant1_admin
# 

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

