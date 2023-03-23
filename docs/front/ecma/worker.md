#### 分类
1. Web Workers  
- `Web 应用程序可以在独立于主线程的后台线程中，运行一个脚本操作。这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程（通常是 UI 线程）不会因此被阻塞/放慢`    
- 不能直接在 worker 线程中操纵 DOM 元素  
- 主线程和 worker 线程相互之间使用 postMessage() 来发送信息  
- worker 可以另外生成新的 worker，这些 worker 与它们父页面的宿主相同 
2. Shared Workers  
`被不同的窗体的多个脚本运行，例如 IFrames 等，只要这些 workers 处于同一主域。共享 worker 比专用 worker 稍微复杂一点 — 脚本必须通过活动端口进行通讯`
3. Service Workers  
`般作为 web 应用程序、浏览器和网络（如果可用）之间的代理服务。他们旨在（除开其他方面）创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动，更新驻留在服务器上的资源。他们还将允许访问推送通知和后台同步 API

4. 音频 Workers可以在网络 worker 上下文中直接完成脚本化音频处理  

#### 例子
`main.js`
@[code](./simple-web-worker/main.js)
`worder.js`
@[code](./simple-web-worker/worker.js)
