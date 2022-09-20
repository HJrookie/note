#### 常见的坑
- 超时,因此要`设置超时时间` 
- 413,Request Entity Too Large,`client_max_body_size 20M`  
- nginx 内存不足,`小文件(<200M)一下可用,再大需要切片`  

#### 切片怎么做
1. chunkSize ,`File.prototype.slice`来切片,维护好当前第几片,已上传的片,  
2. 有一个接口,获取未上传的片,对于上传失败的片,后端要丢弃脏数据,让前端重新上传  
3. Promise.all 批量上传  
4. axios 的 onUploadProgress可以拿来检测上传进度  
5. 前端通知后端合并文件,


后来还是不行,还是报错,我就去看nginx去了,因为这个文件全部放在内存里,top命令看nginx的内存占用,30多的占用时,内存占用一下下来了,看日志,去百度搜,说nginx进程重启了,  
这方法有问题,小文件没啥问题  
大文件不好,切片来做.File原型对象的slice方法来做,start,end, 
设置切片的大小,文件总大小,Math.ceil算切片的总个数,    
