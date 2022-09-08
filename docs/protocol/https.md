### HTTPS
Hyper Text transter protocol Secure,一般也叫做http over secure,over tls,over ssl,还是用http通信,但是使用tls/ssl来加密数据包  
HTTPS的信任,基于预先安装在OS中的CA(`证书颁发机构`),简单来说,我们信任CA,CA相信某个网站,当我们访问该网站时,我们也相信他 


### HTTPS 和 HTTP
HTTPS需要到CA申请证书  
HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。

HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。

[更多的详情见文章..这文章太长了,一下子看不完,脑子疼](https://juejin.im/entry/5981c5df518825359a2b9476)


### HTTPS过程 
1. 客户端生成随机数,TLS版本号,支持的加密方法,发送给server  
2. server发送一个新的随机数,还有证书给client  
3. client确认证书有效,生成一个新的随机数,用公钥加密,发给server  
4. server用私钥解密收到的被加密过的随机数  
5. 然后他们根据约定好的加密方法,用上面的三个随机数生成session key,加密接下来的对话  
之后的对话使用session key来加密,这个是对称加密算法
#### Session恢复
session因为某种原因断了,可以用两种方法回复:  
1. session ID.每次对话都有一个session ID,客户端把这个发给server,server看自己这里有,就继续会话  
2. 缺点就是session Id只在一台服务器上有,如果多个服务器做lb的话,就不能恢复  
3. 第二个方法: session ticket
4. 客户端发给server一个session ticket,它是用ticket key加密过的session key,session ticket 来自server握手时,  
这个session ticket是server发过来的,只能有服务端解密,  
5. 服务端解密之后,就能拿到这次会话的一些信息

### 防止报文被篡改
原数据 --> 哈希算法 --> 摘要  --> 公钥加密 -->得到数字签名-->发给server   
(原数据以及摘要都会发送给server)    
server: 对元数据算摘要,用私钥解密,得到client传递的摘要,做对比,就知道是否修改了 
但是感觉上面的过程比较慢  
想了个新的方法: 原数据->des加密->hash摘要(连带着des加密后的数据发给server)  
server用相同方法求hash,bijiaohash是否不同.原数据可以用des揭秘出来