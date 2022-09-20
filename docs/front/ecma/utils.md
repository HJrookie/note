### Global对象中的方法 
#### encodeURI()
主要用于对整个URI进行编码.例如 https://www.baidu.com/illegal value.html#start?time=today 这样子的.  
并且不会对 / ? # :进行编码. 可以使用DecodeURI进行解码.
```js
var str ="https://www.baidu.com/illegal value.html#start?time=today";
encodeURI(str)
==> "https://www.baidu.com/illegal%20value.html#start?time=today"
```
#### encodeURIComponent()
主要用于对URI中的某一段(例如上面的 illegal value )进行编码,并且会对所有非标准字符进行编码
```js
var str ="illegal value";
encodeURIComponent(str)
==> "illegal%20value"
```