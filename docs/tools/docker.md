#### docker 缓存注意事项
- 如果不想使用缓存,可以在`docker build`的时候增加参数`--no-cache`  
- `对于 ADD 和 COPY 指令`, 镜像中的文件中的 content(内容) 会被检查 并且 每个文件都会计算出一个 checksum,
并且计算时并不会考虑文件的 `last-modified 和 last-accessed 时间`.  在 缓存检查 的时候,新计算出的checksum
会和已有镜像的checksum 进行比较. 如果 有任何值发生了变化,`例如 内容 和 元数据` ,那么 cache 就会失效;

- 在检查缓存的时候,除了`ADD 和 COPY 指令`,其他的指令都不会检查文件的内容; 例如,当检查`RUN apt-get -y update`的时候,只会比较这个字符串是否发生了变化;  
- 前一个 layer 失效时,后面的那些 layer 也会失效.  

#### 
```shell
# 删除不用的镜像`
docker volume prune -f  
docker image prune -a  
# 已停止的也会被删除 
docker system prune -a -f

docker save XXX:xx | gzip -c > xxxxx.tar

docker build -t nextjs-docker .  
docker run -p 3000:3000 nextjs-docker  

# platform
docker build --build-arg name=app  -t  wise-llm-platform:0.51 . 

docker save wise-llm-platform:0.51 | gzip -c > wise-llm-platform-0.51.tar
scp wise-llm-platform-0.51.tar root@47.98.144.126:/root/fastgpt-docker/
bytviQ-mykki1-wiqjob
# assistant

```