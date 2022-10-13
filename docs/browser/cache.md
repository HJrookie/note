[知乎上一个很好的文章](https://www.zhihu.com/question/20790576)  
[紫云妃写的缓存的文章](https://zhuanlan.zhihu.com/p/60357719)  
[Cache-Control 的 stale-while-revalidate 指令](https://zhuanlan.zhihu.com/p/64694485)  
### 强缓存和协商缓存 的说法从哪儿来? 
[请问强缓存和协商缓存这种说法是从哪定义的呢？ - 紫云飞的回答 - 知乎]( https://www.zhihu.com/question/422019386/answer/1486953396)

### 时间相关的请求头 
通过Pragma(1.0),Expires(1.0),Cache-Control(1.1)来实现的,更具体来说,其实就是`通过过期时间来判断的,Expires和 max-age,s-max-age等`  
#### 0.Pragma  
HTTP/1.0里的,用来向后兼容只支持HTTP/1.0 协议的缓 存服务器(那时候没有Cache-Control(http 1.1))  
>常用值: no-cache(强制要求缓存服务器在返回缓存的版本之前,讲请求提交到源服务器进行验证)  
#### 1. Expires
1.0里表示资源过期时间的header,描述的是一个绝对时间,由服务器返回,Expires受限于本地时间,  
如果本地时间修改了之后,可能缓存就失效了, `Expires: Wed, 11 May 2018 07:20:00 GMT`  
#### 2.Cache-Control
Cache-Control 出现于 HTTP / 1.1，优先级高于 Expires ,表示的是相对时间;  
`Cache-Control: max-age=315360000`  
1.可缓存性    
`public`,可以被任何对象缓存,包括客户端,代理服务器,即使是 通常不可缓存的内容.(post方法,响应中没有expires,或max-age)    
`private`,只能被单个用户缓存,不能作为共享缓存.  
`no-cache`,会发送http请求到server进行验证,(协商缓存验证)    
`no-store`,不缓存的意思    
2. 到期时间  
`max-age`,单位是秒,相对于`请求发起的时间`,会覆盖`Expires请求头`   
`s-maxage`,会覆盖`max-age,或者expires头`,但是只对public有用    
`min-fresh`,在指定秒数内保持最新的响应;    
`max-stale`,愿意接受一个过期的资源,可设置秒数,表示不能过时超过给定的时间    
`stale-while-revalidate`,客户端愿意接受陈旧的响应,同时在后台异步检查新的响应.先在 10 分钟内用旧的响应,超过了再用新的.  
3. 重新验证和重新加载      
`must-revalidate`,在`缓存过期之后`,在成功向server验证之前,这个资源不能拿来响应后续的请求;`加了这个字段,当缓存没过期时,这个字段其实没用.`    
`proxy-revalidate`,和上面作用一样,只作用于共享缓存.public的那种.  

### 文件是否变化相关的请求头  
当浏览器对某个资源的请求没有命中强缓存，就会发一个请求到服务器，验证协商缓存是否命中，  
如果协商缓存命中，请求响应返回的http状态为304并且会显示一个`Not Modified`的字符串  

协商缓存是利用的是`【If-Modified-Since,Last-Modified】和【If-None-Match,ETag】`这两对Header来管理的
,后者的优先级较高,
#### etag的作用
一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变了修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；  
某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，  If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；  

#### http 协议整体的理解
再细读规范就知道了，原来 must-revalidate生效的场景还有一个大前提，那就是 HTTP 规范是允许客户端在某些特殊情况下直接使用过期缓存的，比如校验请求发送失败的时候，还比如有配置一些特殊指令（stale-while-revalidate、stale-if-error等）的时候，原文是这样的：

>A cache MUST NOT send stale responses unless it is disconnected (i.e., it cannot contact the origin server or otherwise find a forward path) or doing so is explicitly allowed  

而must-revalidate的作用就是让那个“unless”失效 ，带有 must-revalidate 的缓存，在任何情况下，都必须成功 revalidate 后才能使用，没有例外;

Cache-Control的几个指令特别容易混淆，不能望文生义。比如`no-cache`，并不是指不能用 cache，客户端仍会把带有 no-cache 的响应缓存下来，只不过每次不会直接用缓存，而得`先 revalidate 一下`，所以其实`no-cache`真正合适的名字才是 `must-revalidate`。而现在的`must-revalidate`更合适的名字可能是 `never-return-stale`。如果你想让客户端完全不缓存响应，应该用`no-store`，带有`no-store`的响应不会被缓存到任意的磁盘或者内存里，它才是真正的 `no-cache`

### 浏览器缓存判断顺序  
0. 先查看`pragma,expires,cache-control`这三个字段中是否设置了缓存,如果是`no-store`,那么会直接请求服务端  
   如果是`no-cache`,则至`步骤 3` 校验文件是否过期  
1. 先通过时间上判断,该资源是否过期,优先级从高到低,依次为`Cache-Control中的s-maxage  -->  max-age   --> Expires`  
2. 如果资源没有过期,那么浏览器就会从本地缓存中读取,`不会发送 http 请求`,只是有的文件从`Memory`中读取,有的从`Disk`中读取,具体规则未知,  
    部分行为详见  --->  [Chrome 实现](/browser/chrome-cache.md)
3. 如果资源已经过期,那么此时就需要`发送 HTTP 请求` 到 server,去判断资源是否过期,并且该 http 请求会带上特殊的请求头,  
> 1. 如果该文件上次响应的响应头中有 `Etag` 字段,那么这次请求时的请求头就会 带上`If-None-Match`字段,其值为 上次的`Etag` 的值  
> 2. 如果该文件上次响应的响应头中有 `Last-Modified` 字段,那么这次请求时的请求头就会 带上`If-Modified-Since`字段,其值为 上次的`Last-Modified` 的值  
> 3. 如果这两者均有,那么都会带上,server 优先根据 `Etag` 的值来做判断,  

4. 如果 server 根据 `Etag` 或者 `Last-Modified`,判断文件未过期,就会返回 `304 Not Midified`,那么浏览器还是使用本地文件,  
       如果文件已更改,就会返回 200,并且返回新文件,浏览器就会`使用新文件,并且缓存该文件,并保存相关响应头`  


### 缓存需要注意的点  
分布式系统里多台机器间文件的Last-Modified必须保持一致，以免负载均衡到不同机器导致比对失败；  
分布式系统尽量关闭掉ETag(每台机器生成的ETag都会不一样）；  

### 对知乎问题的理解
[知乎的问题](https://www.zhihu.com/question/20790576)

所以，大公司的静态资源优化方案，基本上要实现这么几个东西:  
配置超长时间的本地缓存——            节省带宽，提高性能  
采用内容摘要作为缓存更新依据      —— 精确的缓存控制  
静态资源CDN部署                     --优化网络请求  
更资源发布路径实现非覆盖式发布  ——   平滑升级  



#### Etag 计算方式  - nginx 实现
```js
// 根据 Request Header 中的 Last-Modified 与 Content-Length 计算而来
// 例如 Content-Length: 612                     Last-Modified: Tue, 23 Apr 2019 10:18:21 GMT  结果为  "5cbee66d-264"
`${(new Date('Tue, 23 Apr 2019 10:18:21 GMT').valueOf()/1000).toString(16)}-${(612).toString(16)}`  //时间戳除以 1000 然后转 16
```

#### 目前情况
上面都是八股文,目前的玩法是 大部分的静态资源,即 immutable 的文件,都会设置非常长的过期时间,例如 1 年,


