### mohss _web 打包命令

```shell
npm run build  && cd build && tar -zcvf dist.tar.gz *

scp dist.tar.gz root@10.103.237.32:/root/app/front/

tar -zxvf dist.tar.gz

```


### mohss _admin  打包命令

```shell
npm run build  && cd dist && tar -zcvf dist.tar.gz *

scp dist.tar.gz root@10.103.237.32:/root/app/front/

tar -zxvf dist.tar.gz
```