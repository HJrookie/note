### 简介
docker-compose 的模板项目,大概写了如何进行前端项目的配置,以及结合 gitlab-runner 实现工程化的部署,以及 build image, 配置 compose 文件实现一次 build,处处运行

####  .gitlab-ci.yml
@[code yaml](./docker/.gitlab-ci.yml)


####  run.sh
@[code shell](./docker/run.sh)



####  Dockerfile
@[code docker](./docker/Dockerfile)


####  docker-compose.yml
@[code yaml](./docker/docker-compose.yml)

#### 前端项目配置
@[code js](../docker-comopose-template/code/api.js)
