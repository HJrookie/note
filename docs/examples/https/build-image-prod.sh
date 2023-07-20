#!/bin/bash
# 这个脚本主要用来更新线上服务的镜像
echo "--------------begin to build ------------------------------------"
rm -rf dist  && npm run build:prod

echo "-------------- build success ------------------------------------"

pwd
cd docker/prod
rm -rf dist
cp -R ../../dist .
cd dist
mkdir admin
cd ..
echo "-------------- cp dist files success -----------------------------"

image_name="edu-test-product/letms-ppraise-web:v1.0"
#echo $image_name
docker build -t $image_name . --no-cache

echo "-------------- build docker image  success -----------------------"


docker login --username=菜菜成功 registry.cn-hangzhou.aliyuncs.com --password edu-test@123
docker tag $image_name  registry.cn-hangzhou.aliyuncs.com/$image_name
docker push registry.cn-hangzhou.aliyuncs.com/$image_name

rm -rf dist/
echo "-------------- push docker image  success -------------------------"
