[知乎上一个很好的文章](https://www.zhihu.com/question/20790576)


浏览器缓存两种,强缓存,协商缓存.  
### 缓存的基本原理 
1. 浏览器在加载资源时，根据请求头的expires和cache-control判断是否命中强缓存，  
是则直接从缓存读取资源，不会发请求到服务器。  
2. 如果没有命中强缓存，浏览器一定会发送一个请求到服务器，通过last-modified和  
etag验证资源是否命中协商缓存，如果命中，服务器会将这个请求返回(304 Not Modified)，  
但是不会返回这个资源的数据，依然是从缓存中读取资源.  
3. 如果协商缓存没有命中,服务器会把新的数据返回来,200 OK  
### 强缓存和协商缓存的异同  
1. 相同:  
都是从本地缓存中获取数据,而不是从服务器中加载数据  
2. 不同:  
强缓存不会发http请求,协商缓存会发http请求  

### 强缓存
通过Pragma(1.0),Expires(1.0),Cache-Control(1.1)来实现的  
#### 0.Pragma  
HTTP/1.0里的,用来向后兼容只支持HTTP/1.0 协议的缓 存服务器(那时候没有Cache-Control(http 1.1))  
>常用值: no-cache(强制要求缓存服务器在返回缓存的版本之前,讲请求提交到源服务器进行验证)  
#### 1. Expires
1.0里表示资源过期时间的header,描述的是一个绝对时间,由服务器返回,Expires受限于本地时间,  
如果本地时间修改了之后,可能缓存就失效了  
`Expires: Wed, 11 May 2018 07:20:00 GMT`  
#### 2.Cache-Control
Cache-Control 出现于 HTTP / 1.1，优先级高于 Expires ,表示的是相对时间;  
`Cache-Control: max-age=315360000`  
1.可缓存性    
`public`,可以被任何对象缓存,包括客户端,代理服务器,即使是 通常不可缓存的内容.(post方法,响应中没有expires,或max-age)    
`private`,只能被单个用户缓存,不能作为共享缓存.  
`no-cache`,会发送http请求到server进行验证,(协商缓存验证)    
`no-store`,不缓存的意思    
2. 到期时间  
`max-age`,相对时间,单位是秒    
`s-maxage`,会覆盖max-age,或者expires头,但是只对public有用    
`min-fresh`,在制定秒数内保持最新的响应;    
`max-stale`,愿意接受一个过期的资源,可设置秒数,表示不能过时超过给定的事件.    
3. 重新验证和重新加载    
`must-revalidate`,在过期之后,在成功向server验证之前,这个资源不能拿来响应后续的请求;    
`proxy-revalidate`,和上面作用一样,只作用于共享缓存.public的那种.  

### 协商缓存  
当浏览器对某个资源的请求没有命中强缓存，就会发一个请求到服务器，验证协商缓存是否命中，  
如果协商缓存命中，请求响应返回的http状态为304并且会显示一个Not Modified的字符串  

协商缓存是利用的是【If-Modified-Since,Last-Modified，】和【If-None-Match,ETag、】这两对Header来管理的
,后者的优先级较高,
#### etag的作用
一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变了修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；  
某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，  If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；  
某些服务器不能精确的得到文件的最后修改时间  

### 整体流程图  
![整体缓存的流程](https://user-images.githubusercontent.com/25027560/38223505-d8ab53da-371d-11e8-9263-79814b6971a5.png)



### 几种状态码  
`200`：强缓Expires/Cache-Control存失效时，返回新的资源文件  
`200(from cache)`: 强缓Expires/Cache-Control两者都存在，未过期，Cache-Control优先Expires时，浏览器从本地获取资源成功  
`304(Not Modified )`：协商缓存Last-modified/Etag没有过期时，服务端返回状态码304    


HTTP 304响应,客户端发一个条件请求,请求头里带了If-Modified-Since: 服务器上次返回响应头中Last-Modified,  
以及If-None-Match,值为服务器上次返回的ETag响应头的值,服务器对内容做判断是否是最新的,如果是最新的,那么服务器返回304,然后从本地缓存中读取资源  
如果不是最新的,服务器返回200,响应体中就是当前资源最新的内容.    


### 如何选择合适的缓存
大概的顺序,  
Cache-Control------本地做判断,  
Expires-----本地做判断,  
If-None-Match (Etag) ----请求server,  
If-Modified-Since (Last-Modified) ----请求server,  
协商缓存需要配合强缓存使用,没有强缓存,协商缓存没有意义.  
但是下面的场景需要注意:  
分布式系统里多台机器间文件的Last-Modified必须保持一致，以免负载均衡到不同机器导致比对失败；  
分布式系统尽量关闭掉ETag(每台机器生成的ETag都会不一样）；  


### 对知乎问题的理解
[知乎的问题](https://www.zhihu.com/question/20790576)

所以，大公司的静态资源优化方案，基本上要实现这么几个东西:  
配置超长时间的本地缓存——            节省带宽，提高性能  
采用内容摘要作为缓存更新依据      —— 精确的缓存控制  
静态资源CDN部署                     --优化网络请求  
更资源发布路径实现非覆盖式发布  ——   平滑升级  



### Chrome 缓存实现
1. Chrome `Render engine` 是 `Blink`,它会将一些静态文件,js,css 存储到内存中,在 network tab 中称之为`Memory cache`    
2. 浏览器缓存,在 network tab 中称之为`Disk cache`     
3. `Blink `如何决定将文件放进 memory 还是 disk?  
> 目前没有明确的文档,属于其内部实现,可以猜测的是 对于script 标签中动态加载的 js,并不会放进 memory,而是放到 disk
```js
var newScript = document.createElement('script');
    newScript.src = '/scripts2.js?id=1';
    document.body.appendChild(newScript);
```
> 并且对于 响应头中 Cache-Control为 `no-cache,max-age=0,no-store` 的文件,`Blink`不会缓存
> 可以在 nginx 配置中增加 `add_header Cache-Control no-cache,max-age=0,no-store;`   
![每次加载时,都会去服务器获取资源](https://pica.zhimg.com/80/v2-1a7cbf172a788971d262605686837b32_1440w.jpg?source=3af55fa1)

#### Chrome 不同操作会影响 Request header
1. `Ctrl + R`  或者 `F5`  
Request header中 *没有* 任何缓存相关的 header ,例如`Pragma,Cache-Control,Expires`  
2. `Ctrl + Shift + R`   
`Request header`会增加`Cache-Control: no-cache;  以及    Pragma: no-cache`  
3. 先清除浏览器缓存,然后`F5`加载  
其实还是不会带缓存相关的 header,只是由于本地的 `Memory Cache 以及 Disk Cache` 都被清除了,因此Chrome 会向server 请求最新的文件
4. Chrome DevTools 中勾选 `Disable Cache`  
其实等同于 `Ctrl + Shift + R` ,`Request header`会增加`Cache-Control: no-cache;  以及    Pragma: no-cache`







