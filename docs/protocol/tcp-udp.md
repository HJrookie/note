### TCP,UDP

TCP: 面向连接的,三次握手,四次挥手,保证数据正确以及数据顺序,要求资源较多,面向字节流 只支持 1 对一的.,  
UDP: 无连接,尽最大努力交付的,可能会丢包,顺序会乱,需求资源少,面向报文,支持 1 对 1,1 对多,多对 1,多对多

#### TCP [blog](https://blog.csdn.net/qzcsu/article/details/72861891)

>ack 代表自己期望收到包的的序号

0. server 先进入 listen 状态
1. client 发送连接请求报文, 同步位 SYN =1, 序号 seq = x, 进入 SYN-SENT 状态
2. server 收到之后,如果同意连接,则发出确认报文; ACK=1,SYN=1, ack = x+1,seq = y TCP 服务器进程进入了 SYN-RCVD 状态
3. TCP 客户进程收到确认后，还要向服务器给出确认。确认报文的 ACK=1，ack=y+1，自己的序列号 seq=x+1，此时，TCP 连接建立，客户端进入 ESTABLISHED（已建立连接）状态
4. 当服务器收到客户端的确认后也进入 ESTABLISHED 状态，此后双方就可以开始通信了
   ![流程](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwNjA1MTEwNDA1NjY2?x-oss-process=image/format,png)

#### 为什么 TCP 客户端最后还要发送一次确认呢？

一句话，主要防止已经失效的连接请求报文突然又传送到了服务器，从而产生错误。

> 如果使用的是两次握手建立连接，假设有这样一种场景，客户端发送了第一个请求连接并且没有丢失，只是因为在网络结点中滞留的时间太长了，由于 TCP 的客户端迟迟没有收到确认报文，以为服务器没有收到，此时重新向服务器发送这条报文，此后客户端和服务器经过两次握手完成连接，传输数据，然后关闭连接。此时此前滞留的那一次请求连接，网络通畅了到达了服务器，这个报文本该是失效的，但是，两次握手的机制将会让客户端和服务器再次建立连接，这将导致不必要的错误和资源的浪费。

> 如果采用的是三次握手，就算是那一次失效的报文传送过来了，服务端接受到了那条失效报文并且回复了确认报文，但是客户端不会再次发出确认。由于服务器收不到确认，就知道客户端并没有请求连接。

#### 四次挥手

![流程](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwNjA2MDg0ODUxMjcy?x-oss-process=image/format,png)

> 数据传输完毕后，双方都可释放连接。最开始的时候，客户端和服务器都是处于ESTABLISHED状态，然后客户端主动关闭，服务器被动关闭。


