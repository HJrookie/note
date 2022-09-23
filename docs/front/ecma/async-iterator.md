#### 异步迭代器 Async iterator
对象的异步遍历器接口，部署在`Symbol.asyncIterator`属性,next 的返回值是一个 promise,主要应用在异步场景,类似读取文件
```js
// 从语法上来看,就是在原来的 generator 基础上加了个 async ,然后执行的结果就就是一个 async generator 了
async function* gen() {
  yield 'hello';
  yield 'world';
}
const f = gen();  // f.next返回值是一个 promise
f.next().then(v=>console.log(v))  // {value: 'hello', done: false}


// 异步遍历器的next方法是可以连续调用的，不必等到上一步产生的 Promise 对象resolve以后再调用
async function* gen() {
    yield 'hello';
    yield 'world';
    yield '11111';
}
const f = gen(); // f.next返回值是一个 promise
Promise.all([f.next(), f.next(), f.next()]).then((res) => {
    console.log(res); //  {value: 'hello', done: false}  {value: 'world', done: false} {value: '11111', done: false}
});





var obj = {
  *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}
// for await 语法
for await(let item of obj) {
	console.log(item) // 1 -> 2 -> 3
}
```

-----------------------------

异步遍历器的设计目的之一，就是 Generator 函数处理同步操作和异步操作时，能够使用同一套接口。
```js
// 同步 Generator 函数
function* map(iterable, func) {
  const iter = iterable[Symbol.iterator]();
  while (true) {
    const {value, done} = iter.next();
    if (done) break;
    yield func(value);
  }
}
// 异步 Generator 函数
async function* map(iterable, func) {
  const iter = iterable[Symbol.asyncIterator]();
  while (true) {
    const {value, done} = await iter.next();
    if (done) break;
    yield func(value);
  }
}
```