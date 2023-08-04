#### CORS（Resource-Sharing）
跨域: 协议 域名 端口 任意一个不同,就跨域了  
**简单请求的标准**  

> 1. 请求方法是以下三种方法之一：
> HEAD  GET  POST  
> 2. HTTP的头信息不超出以下几种字段：  
Accept  
Accept-Language  
Content-Language  
Last-Event-ID   
Content-Type：只限于三个值application/x-www-form-urlencoded、  multipart/form-data、text/plain  

```java
Access-Control-Allow-Origin   
Access-Control-Allow-Credentials  
Access-Control-Allow-Methods  
Access-Control-Allow-Headers  
```
### 请求整个流程
 `简单还是非简单 请求,是浏览器识别的`
#### 对于简单请求
浏览器直接发出CORS请求,具体来说,在请求头里添加Origin字段,  
Origin:http:example.com,服务器根据这个值,来决定是否同意这次请求.如果Origin指定的源,  
不在许可范围内,浏览器返回一个正常的响应,浏览器发现响应头中没有`Access-Control-Allow-Origin`字段,就知道出错了,抛出错误,(无法通过状态码识别此错误,可能是200,xhr的onerror来捕获)  
如果Origin在许可范围内,响应头中会多以下字段:  
```java
Access-Control-Allow-Origin: http:example.com  (必须的)  
Access-Control-Allow-Credentials: true  (可选的)  
Access-Control-Expose-Headers: FooBar  (可选的)  (为了拿到更多响应头中的字段)
Content-Type: text/html; charset=utf-8  
```
#### withCredentials字段
浏览器默认不发送cookie,如果要发送,一方面服务器要同意,并且,需要打开下面的属性:    
```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```
否则,就算服务器同意,浏览器也不发送.或者浏览器要求设置,cookie也不会处理

#### 非简单请求  
非简单请求,会先发一个 Options 请求,称为预检请求,问服务器允许的域名,HTTP方法,请求头,能否带cookie;  
这个请求头里有三个特殊的:
```java
Origin:https://example.com  
Access-Control-Request-Headers: token
Access-Control-Request-Method: GET
```

##### 对预检请求的响应
浏览器检查O`rigin,Request-Method,Request-Headers`之后,如果允许,就会返回200,响应头中就会有许多特殊的字段
```log
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: token
Access-Control-Allow-Methods: *
Access-Control-Allow-Origin: http://127.0.0.1:9000
Access-Control-Expose-Headers: X-forwared-port, X-forwarded-host, Content-Disposition
```
不允许的话,返回一个正常的响应,但是浏览器收到后,发现没有CORS相关头信息字段,则浏览器认为,服务器不同意预检请求.就会报错..
> 即浏览器发出了请求,也收到了响应,但是由于缺少 header,则报错,并且不显示请求结果
```log
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```
#### 如果预检OK了,
以后浏览器每次CORS请求,都会有Origin字段,服务器都返回Access-Control-Allow-Origin字段

### 和JSONP比较
JSONP只支持get,CORS都支持.  
前者优势在于支持老的浏览器,以及向不支持CORS的网站请求数据


### 跨域常用的方法
#### 1. jsonp
script,img,link,iframe没有跨域限制  
动态生成script标签,拼接url,本地写回调函数huidoao,callpack=huidiao,  `把script标签,append到head。只能用于get请求`

#### 2. webpack-devserver
```js
proxy: {
      "/": {   // 所有请求都代理
        target: "http://10.103.236.122:8080/compass"
        // pathRewrite: { "^/dev-api": "" }
      }
    }
```
#### 3. nginx / Apache / IIS

```nginx
location /compass {
    proxy_pass http://10.103.236.122:8080/compass;
    client_body_timeout 6s;
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PATCH, DELETE, PUT, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,  Access-Control-Expose-Headers, Token, Authorization';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain charset=UTF-8';
        add_header 'Content-Length' 0;
        return 204;
    }
    add_header 'Access-Control-Allow-Origin' '*' always;
}
```

#### 4. postmessge
