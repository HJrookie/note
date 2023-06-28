[书籍-High Performance Browser Networking](https://hpbn.co/)
### HTTP协议常见状态码
- 201 Created,所需要的资源已经建立,其URI已经跟随Location头信息返回 
- 202 Accepted,但还没处理,不确定会不会被执行
- 206 Partial Content   (cache)
- 301 永久重定向,Moved Permanently
- 302 Found
- 304 Not Modified  (cache)
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
1. 缓存处理.1.0中主要是用header里的If-Modified-SInce(last-modified),Expires来作为缓存判断的标准,1.1引入了更多的缓存控制策略,Etag,If-Unmodified-Since,If-Match,If-None-Match  
2. 带宽优化,以及网络连接的使用.客户端可以请求对象的某一部分,1.1中请求头中多了range,可以只请求资源的一部分.返回206,Partial Content  
3. 错误通知的管理.1.1中多了24个错误状态响应码;410 Gone.    
4. Host头处理,1.0中认为每台服务器中都绑定唯一的ip地址,因此,请求头url中没有主机名.但是由于虚拟主机技术的发展,一台物理服务器上可以有多个虚拟主机,并且共享一个IP地址.HTTP 1.1得请求消息,  和相应详细都应支持Host头域,否则返回400  
5. 长连接,keep_alive,和请求的流水线处理(Pipelining).在一个tcp连接上可以传送多个http请求和响应,减少了建立和关闭连接的消耗和延迟.1.1中默认开启connection,keep-alive
   
#### http1.1常见的优化 [优化文章](https://hpbn.co/http1x/)
- 多域名,现代浏览器单个域名最多支持六个 http 请求,[rfc 规定是俩](http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html#sec8.1.4),因此需要拆分资源到多个不同的域名,来提升加载速度(`dns 查找和 tcp 慢启动是隐患`)    
- 合并资源,spriting, 可以减少 http 请求,但是`资源更新,缓存,spriting 预处理,很麻烦`  
- 资源内联(`data:`)  
- cdn gzip cache  避免重定向


`在 HTTP/1.x 中没有多路复用的情况下，浏览器可能会天真地对客户端上的所有 HTTP 请求进行排队，通过单个持久连接一个接一个地发送。然而，在实践中，这太慢了。因此，浏览器供应商别无选择，只能并行打开多个 TCP 会话` 


### spdy
Google 为了解决 http 1.1 问题,其作为实验性协议, 后来 HTTP/2 作为成熟协议,共同发展

### HTTP2.0  [http 解释](https://web.dev/performance-http2/)
1. 性能更好，传输更快。  
2. [二进制解释](https://stackoverflow.com/questions/58498116/why-is-it-said-that-http2-is-a-binary-protocol) http2中的数据包(帧)是高度结构化的,帧有特定的格式(`流 id,块大小,等`),且 http2 消息可以分布到多个帧来发送;  
`http1.1则是非结构化格式,由 ascii 文本行构成,以换行符分割,基本上是一个字符流,且消息必须作为一个完整的数据流发送;     `
3. 多路复用。连接共享。一个连接上可以有多个request，每个request对应一个id，server根据id  让不同的服务再去处理
4. header压缩，http1.1的header中有大量信息，每次都要重复发送，2.0里面使用encoder减少需要传输  
的header大小，并且双方各自cache header fields表，避免了重复header的传输，也减小了需要传输的大小  
5. 服务端推送


#### 二进制 frame
![tu](https://web-dev.imgix.net/image/C47gYyWYVMMhDmtYSLOWazuyePF2/2a2cw0nAXe9Mi5txM4Mw.svg)

### 2.0多路复用，和1.1的pipeling
pipeling: 多个请求通过同一个 tcp 连接发送,然后排队,响应要按照请求的顺序返回,如果这个请求超时了,后续请求被阻塞.即通常说的队头阻塞; 因此**浏览器默认是关闭的** , 实际上浏览器开多个 tcp 连接发送 http 请求,  
 
2.0: 在同一个tcp连接上,让帧中携带流 id,多路复用,互不影响.
### 服务端推送 
服务端推送能把客户端所需要的资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤。需要在 nginx 配置. 
### 头部压缩 
HTTP2.0可以维护一个字典，差量更新HTTP头部，大大降低因头部传输产生的流量(`HPACK(静态表在规范中定义,动态表默认为空,在连接中不断更新),哈夫曼编码`,解决CRIME攻击)


#### 所谓的优化
- 多域名是负优化了(未必,tcp 队头阻塞).因为 http2 复用 tcp 链接,因此最佳实践是一个 tcp 链接,此外 http2 还有 tls 合并机制,当`多域名ip 相同时或者tls 证书相同`,复用同一个 tcp 连接;  
- 合并资源,spriting 需要根据内容的类型,更新频率,大小,来重新优化  

#### http2 传输详解
- 所有通信都通过单个 TCP 连接执行，该连接可以承载任意数量的双向流。  
- 每个流都有一个唯一的`id`和可选的权重(`1-256`)以及`依赖`，用于携带双向消息。  
- 每条消息都是一条逻辑 HTTP 消息，例如请求或响应，由一个或多个帧组成  
- 帧是承载特定类型数据（例如 HTTP 标头、消息有效负载等）的最小通信单元。来自不同流的帧可以交错，然后通过每个帧的标头中嵌入的流标识符重新组合  

![图片](https://web-dev.imgix.net/image/C47gYyWYVMMhDmtYSLOWazuyePF2/0bfdEw00aKXFDxT0yEKt.svg)

#### [上述http不同版本差异详见](https://juejin.im/entry/5981c5df518825359a2b9476)

#### http3
`http3`在传输层部分使用QUIC而不是TCP   
- QUIC 将 TLS 握手集成到初始 QUIC 握手  
- HTTP/2 是一种多路复用协议，允许同时进行多个 HTTP 事务。但是，事务在单个 TCP 连接上进行多路复用，这意味着 TCP 层的数据包丢失和随后的重传可能会阻止所有事务。QUIC 通过在 UDP 上运行并为每个流分别实施数据包丢失检测和重传来避免这种情况，这意味着数据包丢失只会阻止其数据包丢失的特定流。

