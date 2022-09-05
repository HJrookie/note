#### 1. 安装 docker compose 

http://get.daocloud.io/#install-compose

```
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.10.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```







```shell
rpm -i fff.rpm
# 卸载 rpm ,先查看所有的  ,再卸载
rpm -aq|grep gitlab    
rpm -e --nodeps gitlab-runner-15.1.0-1.i686    



```

1. 打开    https://docs.gitlab.com/runner/install/linux-manually.html    

2. 在 https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html   这个页面 找到对应的文件并且下载, x86_64 对应的是 i686 版本,   

3. ```
   curl -LJO "https://gitlab-runner-downloads.s3.amazonaws.com/latest/rpm/gitlab-runner_${arch}.rpm"
   ```

4. ```shell
   rpm -i gitlab-runner_<arch>.rpm
   ```

5. 然后再注册 runner

6. https://docs.gitlab.com/runner/register/index.html#linux  具体页面是这个 

7. ```shell
   # 执行这个注册
   sudo gitlab-runner register  
   
   // 最好是直接注册为 root 权限,但是不知道命令,下面这个不能用
   gitlab-runner install --working-directory /home/gitlab-runner --user root
   ```

   

8. 会有一个让输入各种参数的 环节    

9. ```shell
   # 1. 输入 url
   http://10.103.237.65/
   # 2. 描述信息  可以随便写
   # 3. tag  很重要  可以写成 front-end ,这个和 gitlab-ci.yml 中的 tag 相对应  
   # 4. 输入 executor   Enter an executor: parallels, shell, ssh, docker+machine, custom, docker, docker-ssh, virtualbox, docker-ssh+machine, kubernetes:  
   这里写 shell  然后回车 
   
   输入gitlab-runner list 可以看到一些 runner, 刷新 gitlab 对应项目的 ci/cd 可以看到 runner
   ```

10. 