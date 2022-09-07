### 事件捕获和冒泡 流程图
![事件](https://s1.ax1x.com/2020/07/09/UnqCee.png)

> 事件捕获阶段 --> 处于目标阶段 --> 事件冒泡阶段(目标的元素在捕获阶段不会接收到事件)


#### addEventListener 函数
```js
addEventListener("eventName",function,useCapture) // 是否在捕获阶段执行 useCapture 其实和 options 中的 capture 是相同的
addEventListener("eventName",function,options) // 可以传递 options
/* options 包括
capture:   默认为 false,表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发,
                因此一般事件是在冒泡阶段处理的
once :     默认为 false,表示 listener 在添加之后最多只调用一次。如果为 true，listener 会在其被调用之后自动移除
passive:   默认为 false,为 true 时，表示 listener 永远不会调用 preventDefault()。
                 如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告
signal     AbortSignal，该 AbortSignal 的 abort() 方法被调用时，监听器会被移除
*/ 
```
#### removeEventListener 函数
可以移除事件,但是参数需要和add的时候,的函数相同,所以如果添加的时候用的是匿名函数,那么就不能移除了  
#### 事件对象 event对象
这个对象包含所有和事件相关的信息.包括导致事件的元素,事件的类型,以及其他与特定事件相关的信息.  

- `event.type`    事件类型//例如 click 
- `event.target`  触发事件的 dom,例如点击了哪个 dom  
- `currentTarget` 一直指向`注册事件处理程序的DOM`,和 this 指向相同    
- `cancalable`    改值设置为true的事件,才能通过`preventDefault`来取消其默认行为  
- `eventPhase`    可能的值为 1,2,3. 分别代表事件捕获阶段,处于目标对象阶段,事件冒泡阶段  
#####  注意currentTarget ,this,target指向 
- currentTarget 永远等于this,都指向事件处理程序所在 dom  
- target指向点击的元素,也就是触发了事件的 dom  

#### preventDefault函数
- 阻止事件的默认行为,如果事件可取消，则取消该事件，而不停止事件的进一步传播  
- 在addEventListener函数的第三个参数中传入`{passive:true}`,就不会调用preventDefault函数   
#### stopPropagation 函数
阻止事件继续传播

### addEventListener 的一些例子
在最外层添加某种事件监听.分别点击 1, 2,3 区域,查看返回结果,其中区域 1 最大,3最小 [可参考该博客](https://blog.csdn.net/zhuanyemanong/article/details/80387416)
1. capture:false   --- -        - - - - - >`代表点击 1 时,打印 1,点击 2,先 2 后 1,点击 3,先 3,2,后 1`  
   1 -- 21 -- 321  
2. capture true  
   1 -- 12 -- 123  
3. stopPropagation && capture: false  
   1 -- 2 --3
4. stopPropagation && capture: true  
   1 -- 1 --1
5. preventDefault 以及通过 passive:true 忽略它   
   1 -- 21 -- 321  

### 事件委托
对许多 dom 都添加同一个或者类似的事件处理程序会让页面比较卡顿,因为函数也是对象,对象都在内存里,会降低性能  
因此,只需要在DOM树中,尽量高的层次上添加一个事件处理程序,    
例如: 给body添加click事件处理程序,然后获取event.target.根据target的不同,做不同的事情  
当一个dom元素被删除时,它上面的事件handler还在.无法被当做垃圾回收  

#### 事件委托好处
1. 减少要管理的函数,在一个函数里统一管理  
2. 对于某个父节点下几个类似的元素,可以通过委托给父元素的监听函数来处理  
3. 方便动态的添加和修改元素,不需要因为元素的改动而修改事件绑定


### passive 可提升移动端体验
移动端常用事件 `touchstart touchmove touchend touchcancel`,例子:  
```js
div.addEventListener("touchstart", function(e){
    // do sth.
})
```
由于第三个参数没有传值，那么默认就是 false，也就是这个事件在冒泡阶段被处理，如果调用了 stopPropagation() 则 div 的父元素就无法接收这个事件。  

那么如果我们调用了 preventDefault() 呢？如果你曾经给超链接 a 标签绑定过 click 事件应该就知道会发生什么了。当 a 标签点击时，它的默认行为是跳转到 href 指定的链接，如果我们调用了 preventDefault 就阻止了 a 标签点击事件的默认行为。（如果你使用 jQuery 通过 return false 可以阻止事件默认行为，但是深记 You Might Not Need jQuery ）  

`如果我们在 touchstart 事件调用 preventDefault 会怎样呢？这时页面会禁止，不会滚动或缩放。那么问题来了：浏览器无法预先知道一个监听器会不会调用 preventDefault()，它需要等监听器执行完后，再去执行默认行为，而监听器执行是要耗时的，这样就会导致页面卡顿`   

这段翻译的太专业了，你可以这么理解：当你触摸滑动页面时，页面应该跟随手指一起滚动。而此时你绑定了一个 touchstart 事件，你的事件大概执行 200 毫秒。这时浏览器就犯迷糊了：如果你在事件绑定函数中调用了 preventDefault，那么页面就不应该滚动，如果你没有调用 preventDefault，页面就需要滚动。但是你到底调用了还是没有调用，浏览器不知道。只能先执行你的函数，等 200 毫秒后，绑定事件执行完了，浏览器才知道，“哦，原来你没有阻止默认行为，好的，我马上滚”。此时，页面开始滚。

因此,passive 参数在移动端就非常好用,如果我们传递了 `passive: true`, `那么浏览器就知道它可以正常地执行缩放等行为,而无需等到 listener 执行完才知道`  



#### 对于早期不兼容 passive 参数的浏览器(即第三个参数不确定是需要传对象,还是一个布尔值),可以使用一下 polyfill
```js
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    });
    window.addEventListener("test", null, opts); // 精妙之处在这里,如果 addEventListener 把 opts 当对象,并且读取其 passive属性,则supportsPassive 变为 
    // true, 否则,说明 第三个参数需要传 Boolean 值,因此 下方就 根据 supportsPassive 的值来判断
} catch (e) { }
    elem.addEventListener('touchstart', function () { }, supportsPassive ? { passive: true } : false
);
```