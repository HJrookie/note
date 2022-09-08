
### webSocket()
对于HTTP 1.0来说,一个request对应一个response.这个请求就结束了  
对于HTTP 1.1增加了keep-alive属性,这样子可以建立一个HTTP链接，  
发送多个请求，接受多个response.并且这里的HTTP请求只能由client发出.  
#### ws来了.ws和http协议有交集,但是也有不同之处
```js
GET /chat HTTP/1.1
Host: server.example.com
**Upgrade: websocket**   //多了这个
**Connection: Upgrade**  // 多了这个
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com

```
