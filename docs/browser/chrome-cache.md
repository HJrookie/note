### Chrome 实现
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

<img width="755" alt="image" src="https://user-images.githubusercontent.com/27692261/189311901-0ff07921-8d6d-4b21-8067-656fc8d9f9a8.png">

#### Chrome 不同操作会影响 Request header
1. `Ctrl + R`  或者 `F5`  
Request header中 *没有* 任何缓存相关的 header ,例如`Pragma,Cache-Control,Expires`  
2. `Ctrl + Shift + R`   
`Request header`会增加`Cache-Control: no-cache;  以及    Pragma: no-cache`  
3. 先清除浏览器缓存,然后`F5`加载  
其实还是不会带缓存相关的 header,只是由于本地的 `Memory Cache 以及 Disk Cache` 都被清除了,因此Chrome 会向server 请求最新的文件
4. Chrome DevTools 中勾选 `Disable Cache`  
其实等同于 `Ctrl + Shift + R` ,`Request header`会增加`Cache-Control: no-cache;  以及    Pragma: no-cache`


### Firefox     ---->  ` Race Cache With Network`
Firefox 其实也有类似实现,只是相对于 chrome 来说,更加黑盒,不会显示`Memory Cache` 还是 `Disk Cache`,不过 Firefox 也是一个很有趣的
`feature`,`rcwn`,即`Race Cache With Network`,换句话说,它会同时读取缓存,以及发送 http 请求,并且选取其中较快的那一个
