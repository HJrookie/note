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