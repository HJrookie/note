#### 变量
一般是定义在一个规则集之内,常用是定义在`:root`里 
```css
element {
  --main-bg-color: brown;
}
```
使用`--`定义变量,然后使用`var`获取值,`var`支持设置默认值,变量可以被子元素继承  
`element.style.getPropertyValue("--my-var");  element.style.setProperty("--my-var", jsVar + 4);`

#### transition 过渡效果
```js
.trans {
transition: all ease-in-out 0.5s 0.1s;
}
```

#### animation      [动画效果 例子](https://segmentfault.com/a/1190000010780991)
```css
@keyframes animationName{
  0% {
    bottom: -20px;
    opacity: 0;
  }
  100% {
      bottom: 0;
      opacity: 1;
  }
}
  animation: 3s ease-in-out 1s 2 reverse both running slidein;
    animation-duration: 3s;                      // 完整动画的时间
    animation-timing-function: ease-in-out;      // 速度曲线
    animation-delay: 1s;                         // 延迟
    animation-iteration-count: 2;               // 执行次数
    animation-direction: reverse;               // 指示动画是否反向播放
    animation-fill-mode: both;                  // 设置CSS动画在执行之前和之后如何将样式应用于其目标。 一般是 both,代表结束后维持这个状态,而不是设置为初始值 
    animation-play-state: running;              // 定义一个动画是否运行或者暂停。可以通过查询它来确定动画是否正在运行。另外，它的值可以被设置为暂停和恢复的动画的重放
    animation-name: slidein;
```

#### transform  
```css
1. translate  转换      
transform:translate(50px,50px);
2. scale 放大缩小
transform:scale(2,2);
3. rotate  旋转
transform:rotate(10deg);
4. skew    歪曲
```

#### box-shadow
```css
box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
filter: drop-shadow(2px 4px 6px black) /*filter 很有用, 可以设置亮度 ,对比度, 灰度*/
```


#### background-clip  有裁剪的那个感觉,意思是只显示这一部分,其他的部分不显示   
默认是 border-box, 可以设置为 padding-box,content-box, text(只显示到文字的后面)  

#### background-origin    
背景图片左上角从哪儿开始,默认是`padding-box`

#### flip
`① Frist  +  ② Last + ③ Invert + ④ Play`  
```js
dom.animate([{ transform: "rotate(0) scale(1)" }, { transform: "rotate(360deg) scale(0)" }], {
    duration: 2000,
    iterations: 1,
});
```



#### text-shadow 文字阴影
```css
text-shadow : #edc7ce73 1px 1px 2px;
```

#### 渐变
<div class="gradient-test">
线性渐变 和 放射状渐变(圆锥渐变),重复渐变;  
</div>  

```css
background: linear-gradient(red, orange, yellow, green, blue, indigo, violet);  
background: radial-gradient(red, yellow, rgb(30, 144, 255));
background: repeating-linear-gradient(lightpink, lightpink 5px, white 5px, white 10px);
background: repeating-radial-gradient(powderblue, powderblue 8px, white 8px, white 16px);
```



#### filter  滤镜
可选值: blur (模糊) , contrast (对比度),  grayscale(灰度),  drop-shadow(阴影), brightness(亮度);  opacity(透明度); 
```css
.test{
    filter: contrast(175%) brightness(3%);    // 可以使用多个函数;
}
```

#### will-change  动画渲染加速
不能多用,乱用, 可以写到 :hover 里
```css
.change {
  will-change: transform;
}
```