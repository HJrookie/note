#### 渲染 gui 的线程和 js 的线程互斥

```js
function sleep(second) {
  var start = +new Date();
  while (start + second * 1000 > +new Date()) {}
}
document.body.style.backgroundColor = "red";
sleep(4)
setTimeout(() => {
  document.body.style.backgroundColor = "blue";
}, 1000);
```
背景颜色不会变红,而是会在 5 秒后直接变为蓝色; 即当js 线程执行时,渲染 gui 的线程就不能执行了  


