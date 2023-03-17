#### generator + thunkify => AutoRunner

@[code](./js/thunkify.js)

### Generator 是什么

- 可以理解为是一个状态机,内部封装了多个状态,会逐步转换.
- Generator 执行的结果是 一个 Iterator,即可以逐步返回所有状态的迭代器
- `yield`相当于是 定义状态,`yield`之间其实是`transition`

```js
function* t() {
  yield "hello";
  return "ending";
}
var f = t();
f.next();
```

#### 什么用 ?

因为 generator 执行的返回值就是一个 Iterator,因此可以把 generator 函数赋值给 一个对象的`Symbol.Iterator`属性,这样子它就是可迭代的了

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield* [4, 5]; // 也会调用 iterator
  yield 3;
};
[...myIterable]; // [1, 2, 4,5,3]
```

#### next 可以带参数

yield 表达式本身没有返回值，或者说总是返回 undefined。next 方法可以带一个参数，该参数就会被当作上一个`yield表达式的返回值`。  
`即可以根据外部的参数来决定函数内部会执行 什么逻辑`  
[博客地址](https://es6.ruanyifeng.com/#docs/generator#next-%E6%96%B9%E6%B3%95%E7%9A%84%E5%8F%82%E6%95%B0)

#### Generator 结合 异步

由于`next返回值的 value 属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据`,

```js
// 例子 1
function* gen(x) {
  let y = yield x + 5;
  yield y * 2;
  yield y + 10;
  return y;
}
var g = gen(1);
g.next(); // 第一次调用,参数会被忽略  {value:6,done:false}
g.next(6); // 把 yield x + 5 的值整体设置为 6,且 y 被赋值为 6, 然后继续进行下一个yield, 得到结果 12
g.next(6); // 按道理是该设置上一个 yield 的值的,但是上一个 yield 没有返回值,就直接计算 yield ,得到 6 + 10 =16;
g.next(6); // 返回 y 的值 6 就没了

// 例子 2 更复杂一些 
function* gen(a) {
  let b = yield a + 5;
  let c = yield b * 2;
  let d = yield c - 2;
  return d * 10;
}
var g = gen(1);
console.log(g.next()); // 6
console.log(g.next(10)); // 设置yield a+5整体的值为 10,且赋值 b 为 10,计算下一个 yield ,得到 20
console.log(g.next(10)); // 设置yield b*2 整体的值为 10,且赋值 c 为 10,计算下一个 yield ,得到 8
console.log(g.next(10)); // 设置yield c-2 整体的值为 10,且赋值 d 为 10,计算下一个 yield ,得到 100
console.log(g.next(10)); // undefined
```

Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```js
function* gen(x) {
  try {
    var y = yield x + 2;
  } catch (e) {
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw("出错了");
```

#### Generator 结合 Ajax

```js
var fetch = require("node-fetch");

function* gen() {
  var url = "https://api.github.com/users/github";
  var result = yield fetch(url);
  console.log(result.bio);
}
// 使用方式
var g = gen();
var result = g.next();

result.value
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    console.log("data", data);
  });
// 这种使用方式 比较麻烦
```

#### Thunk 函数是自动执行 Generator 函数的一种方法。

Thunk 函数本身指的是`传名调用(call by name)`时,计算表达式的一个临时函数,即它是`传名调用`的一种实现策略，用来替换某个表达式

#### JavaScript 语言的 Thunk 函数

JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

```js
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

#### 作用

- 实现 iterator
- 实现类似协程的操作,即把函数的执行权交出去,暂停函数执行
- 实现 无限 range
- lazy evaluation 惰性计算
- 用来实现 async/await,

#### range 函数

```js
function* range(i, n) {
  for (; i <= n; i++) {
    yield i;
  }
}
let f = range(1, 5); // 结果为 1 2 3 4 5这 5 个数
[...f]; // 可以生成数组
for (let v of f) {
  console.log(v);
}
```
