### HTTP协议常见状态码
- 200 OK
- 201 Created,所需要的资源已经建立,其URI已经跟随Location头信息返回 
- 202 Accepted,但还没处理,不确定会不会被执行
- 301 永久重定向,Moved Permanently
- 302 Found
- 413 Request Entity Too large
- 502 Bad Gateway
- 503 Service  Unavailable  
- 504 Gateway Time-out

#### 幂等性
HEAD,PUT,GET,Delete,Options

### Long PUll
也是轮询，但是是阻塞的。没有消息的时候，就不返回，一直等待。直到拿到想要的结果

### Ajax 轮询
隔一段时间，请求一次  
同步请求,立即响应

## Long PUll,和Ajax轮询非常消耗资源,每次都要鉴权,建立连接,很麻烦

### HTTP 1.0 1.1 1.2
#### 1.0 => 1.1
缓存 部分 host 长链接 状态码 
1. 缓存处理.1.0中主要是用header里的If-Modified-SInce,Expires来作为缓存判断的标准,1.1引入了更多的缓存控制策略,Etag,If-Unmodified-Since,If-Match,If-None-Match  
2. 带宽优化,以及网络连接的使用.客户端可以请求对象的某一部分,1.1中请求头中多了range,可以只请求资源的一部分.返回206,Partial Content  
3. 错误通知的管理.1.1中多了24个错误状态响应码;410 Gone.    
4. Host头处理,1.0中认为每台服务器中都绑定唯一的ip地址,因此,  
   请求头url中没有主机名.但是由于虚拟主机技术的的发展,一台物理  
   服务器上可以有多个虚拟主机,并且共享一个IP地址.HTTP 1.1得请求消息,  和相应详细都应支持Host头域,否则返回400  
5. 长连接,keep_alive,和请求的流水线处理(Pipelining).在一个tcp连接上可以传送多个http请求和响应,减少了建立和关闭连接的消耗和延迟.1.1中默认开启connection,keep-alive
   


### HTTP2.0
1. 性能更好，传输更快。  
2. 新的二进制格式。HTTP 1.x的解析是基于文本，基于文本协议的格式解析存在天然缺陷，文本  
的表现形式很多，不容易做到健壮。二进制只认0,1.
3. 多路复用。连接共享。一个连接上可以有多个request，每个request对应一个id，server根据id  让不同的服务再去处理
4. header压缩，http1.1的header中有大量信息，每次都要重复发送，2.0里面使用encoder减少需要传输  
的header大小，并且双方各自cache header fields表，避免了重复header的传输，也减小了需要传输的大小  
5. 服务端推送
### 2.0多路复用，和1.1的pipeling
pipeling: 多个请求排队,串行化,单线程处理.多个请求可以一起发送,但是响应要按照请求的顺序返回,**浏览器默认是关闭的**   
如果这个请求超时了,后续请求被阻塞.即通常说的线头阻塞;  
2.0: 在同一个连接上,并发,大家一起发请求,互不影响.
### 服务端推送 
服务端推送能把客户端所需要的资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤。  
正因为没有发起请求，建立连接等操作，所以静态资源通过服务端推送的方式可以极大地提升速度。具体  
正常的过程: 
1. client -> server 要index.html
2. server 发给了client
3. client -> 要main.js,
4. server发给了client
服务端推送: 
1. client -> server 要index.html
2. server 发给了client,main,js也给你吧.  
### 头部压缩 
假定一个页面有100个资源需要加载（这个数量对于今天的Web而言还是挺保守的）, 而每一次请求都有1kb的消息头（这同样也并不少见，因为Cookie和引用等东西的存在）, 则至少需要多消耗100kb来获取这些消息头。HTTP2.0可以维护一个字典，差量更新HTTP头部，大大降低因头部传输产生的流量

# [上述http不同版本差异详见](https://juejin.im/entry/5981c5df518825359a2b9476)
