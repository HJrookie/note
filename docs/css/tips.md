#### tips
- `background-clip: content-box,padding-box` 影响背影颜色范围  
- `fill-availabel`和`fit-content`(结合`margin:0 auto` 水平居中)  
- `pointer-events: none auto;` 可以禁止 hover ,click 的效果(应该还有别的)  
### em大小是相对于自身的font-size的  
[em单位详解](https://jsfiddle.net/areYouOk/9c7dtxgz/6/)  
em计算是相对于`当前dom的font-size`来算的,如果当前dom没有显式声明font-size的大小,则它会`继承父元素的font-size`.    
如果设置他的 `margin,padding为1em`, `font-size为0.5em` ,此时margin和padding会相对于font-size自身来进行计算  


### trick
```css
/* chrome 填充密码 会改变背景颜色,加上这个就好 */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
```

### 移动端单位计算
```js
//  需要计算 rem 的单位
(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 14 * (clientWidth / 320) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
```

#### 文字省略号...
```css
.test{
    overflow: hidden;  
    text-overflow: ellipse;  
    white-wrap: unwrap;  
}
{
    width:400px;  /*多行*/ 
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    padding:0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height:30px;
    height:60px;
}
```