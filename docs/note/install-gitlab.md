#### 大概的安装步骤
- 老版本需要 tag 这种东西,新版本就不需要了  
- 老版本的 runner 的 token 是对应到每一个项目的,新版本是全局配置的

1. 打开  `https://docs.gitlab.com/runner/install/linux-repository.html#installing-gitlab-runner` ,下载runner        
2. 注册 runner `https://docs.gitlab.com/runner/register/index.html`  


------ 

<!-- 2. 在 https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html   这个页面 找到对应的文件并且下载, x86_64 对应的是 i686 版本,   
3. ```
   curl -LJO "https://gitlab-runner-downloads.s3.amazonaws.com/latest/rpm/gitlab-runner_${arch}.rpm"
   ```
4. ```shell
   rpm -i gitlab-runner_<arch>.rpm
   ```
5. 然后再注册 runner,  https://docs.gitlab.com/runner/register/index.html#linux  具体页面是这个 
```shell
# 执行这个注册
sudo gitlab-runner register  
// 最好是直接注册为 root 权限,但是不知道命令,下面这个不能用
gitlab-runner install --working-directory /home/gitlab-runner --user root
```
6. 会有一个让输入各种参数的 环节     -->

<!-- ```shell
# 1. 输入 url
http://10.103.237.65/
# 2. 描述信息  可以随便写
# 3. 输入 executor   Enter an executor: parallels, shell, ssh, docker+machine, custom, docker, docker-ssh, virtualbox, docker-ssh+machine, kubernetes:  
这里写 shell  然后回车 
输入gitlab-runner list 可以看到一些 runner, 刷新 gitlab 对应项目的 ci/cd 可以看到 runner
``` -->

------ 




### 新版本的 ci 配置
```yaml
stages: # 分段
  - install
  #  - eslint
  - build
#  - deploy
cache:
  paths:
    - node_modules/
    - dist
install-job:
  stage: install
  script:
    - echo "-------------------------------- begin to install ----------------------------"
    - npm config set registry "https://registry.npm.taobao.org/"
    - npm install
build-job:
  stage: build
  script:
    - echo "-------------------------------- begin to build ----------------------------"
    - bash docker/run.sh
```

#### run.sh 中的内容