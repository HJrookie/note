#### 1.postmessage

可以实现跨域,用法就是 两个窗口,一个监听,另一个发消息,收消息的一方也可以发消息,双向通信

```js
handleRefresh = (event) => {  // event 里有 data(传的数据), origin(消息源域名),source (消息来源)
  if (event.data.refresh) {
    // ...
  }
};
window.addEventListener("message", this.handleRefresh, false);
window.opener.postMessage({
  refresh: true,
});
```
