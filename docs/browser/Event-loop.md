### 微任务,宏任务
macrotasks:  `setTimeout, setInterval, setImmediate, I/O, UI rendering `  

microtasks:  `process.nextTick, Promise, **MutationObserver** `  

#### 执行顺序 
先把微任务里面的执行完,就算里面东西很多,事儿很多.promise.then会一直在微任务中,nextTIck也是  
然后再去执行宏任务中的东西;微任务优先级最高;  
> 换句话说,JS 的 event loop 执行时会区分 task 和 microtask，引擎在每个 task 执行完毕，从队列中取下一个 task 来执行之前，会先执行完所有 microtask 队列中的 microtask。
#### 为啥要用 microtask？  
根据HTML Standard，在每个 task 运行完以后，UI 都会重渲染，  
那么在 microtask 中就完成数据更新，当前 task 结束就可以得到最新的 UI 了。  
反之如果新建一个 task 来做数据更新，task运行完再更新ui,那么渲染就会进行两次。  


#### 比较简单的例子  
```js
setTimeout(() => {
    console.log('1');
    Promise.resolve().then(() => {
        console.log('2');  // 这里可以看出来 .then 里面的代码会立即加入到微任务,但是并不会立马执行
    });
    console.log(3);
}, 0);
setTimeout(() => {
    console.log('4');
}, 0);
console.log('5');
```

#### 稍微复杂的例子
> 复杂的点在于,要整理清楚 微任务和宏任务的切换
```js
Promise.resolve().then(() => {
  console.log(' 1');
  const timer2 = setTimeout(() => {
    console.log('2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('3')
  Promise.resolve().then(() => {
    console.log('4')
  })
}, 0)
console.log('5');
```

### 终极例子
```js
console.log(1);
Promise.resolve()
    .then(() => {
        console.log(7);
        Promise.resolve()
            .then(() => {
                console.log('2');
            })
            .then(() => {
                sleep(3);
                console.log(6);
            });
        console.log(8);
    })
    .then(() => { 
        console.log('3');
    });
console.log(4);

let r = setTimeout(() => {
    console.log(5);
}, 100);

function sleep(delay) {
    let time = new Date();
    while (new Date() - time < delay * 1000) {}
}

// 1
// 4
// 7
// 8
// 2
// 3
// 等了3秒
// 6 
// 5  立即打印 5,它被阻塞了,不然早就打印了

// 解析

console.log(1);
Promise.resolve()
    .then(() => {
        console.log(7);
        Promise.resolve()
            .then(() => {
                console.log('2');
            })
            .then(() => {
                sleep(3);
                console.log(6);
            });
        console.log(8);
    })
    .then(() => {  // 后面跟的这个.then 需要等前面的那个.then 里的东西都执行了,才会放到微任务队列
        console.log('3');
    });
console.log(4);

let r = setTimeout(() => {
    console.log(5);
}, 100);

function sleep(delay) {
    let time = new Date();
    while (new Date() - time < delay * 1000) {}
}
```

#### 例子2
```js
console.log(1)
Promise.resolve().then(()=>{
    console.log(2)
}).then(()=>{
    setTimeout(()=>{
    console.log(5)
},0)
})
console.log(3)
setTimeout(()=>{
    console.log(4) 
},0)

// 1 3 2 4 5
```

#### 例子3
```js
console.log(1)
Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log("2")  // 这里第 1
  }).then(() => {
    
    console.log(6)  // 第3
  }) 
}).then(() => {
  console.log("3")   // 第 2

Promise.resolve().then(() => {
    console.log("7")  // 第4
  }).then(() => {
    console.log(8)  //第5
  }) 
})
console.log(4)

let r = setTimeout(() => {
  console.log(5)
}, 0)

function sleep(delay) {
  let time = new Date();
  while (new Date() - time < delay * 1000) {}
}
// 1 4 2 3 6 7 8 5 
```


### 比较难的一个例子 需要细心
```js
console.log(1)
setTimeout(()=>{console.log(2)},0)
new Promise((resolve,reject)=>{
    console.log(3)
    setTimeout(()=>{console.log(8)},0)
    new Promise((resolve,reject)=>{
       setTimeout(()=>{console.log(9)},0)
    console.log(7)
    resolve()
    console.log(11)
})
.then(()=>{
    console.log(10)
})
 console.log(12)
    resolve()
 console.log(13)
})
.then(()=>{
    console.log(4)
})
setTimeout(()=>{console.log(5)},0)
console.log(6)




 1 3 7 11 12 13 6 10 4 2 8 9 5 
 // .then里的必须resolve才能执行  
 new Promise里的同步代码立即执行.  
 里面的setTimeout会被放到宏任务队列里,.then里的被放到微任务队列.代码从上到下执行.  
 这一大坨代码执行完了之后,才会去看微任务队列里有没有东西,如果有,把里面的东西执行完,  
 再去看宏任务队列
```
