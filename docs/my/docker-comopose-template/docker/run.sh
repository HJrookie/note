#!/bin/bash
echo "--------------begin to build ------------------------------------"
rm -rf dist  && npm run build:stage

echo "-------------- build success ------------------------------------"

pwd
cd docker
rm -rf dist
cp -R ../dist .
echo "-------------- cp dist files success -----------------------------"

mkdir -p logs
image_name="letms-ppraise/letms-ppraise-web:v1.0"
#echo $image_name
docker build -t $image_name . --no-cache

echo "-------------- build docker image  success -----------------------"


docker login 10.110.197.137 -u admin --password-stdin < ./pwd.txt
docker tag $image_name  10.110.197.137/$image_name
docker push 10.110.197.137/$image_name

echo "-------------- push docker image  success -------------------------"
echo "-------------- try to move files to /home/xxx/dockerProjects ---------"

# 删除目录,清空其中文件 然后 建立目录
# rm -rf /home/xxx/nginx
# mkdir -p /home/xxx/nginx
# 复制文件

pwd
cd ..
cp -R docker/* config.json /home/xxx/nginx
# cd /home/xxx/dockerProjects/  && ls -la
cd /home/xxx/nginx && ls -la
mkdir -p nginxFile

echo "-------------- move files success   ---------------------------------------"

docker-compose stop
docker-compose up -d
echo "-------------- start container  success ----------------------------"

echo "-------------- all finished   ---------------------------------------"
