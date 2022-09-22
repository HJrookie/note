#### generator + thunkify => AutoRunner
@[code](./js/thunkify.js)


### Generator是什么
- 可以理解为是一个状态机,内部封装了多个状态,会逐步转换.    
- Generator 执行的结果是 一个 Iterator,即可以逐步返回所有状态的迭代器   
- `yield`相当于是 定义状态,`yield`之间其实是`transition`
```js
function* t() {
  yield 'hello';
  return 'ending';
}
var f = t();
f.next()
```
#### 什么用 ? 
因为 generator 执行的返回值就是一个 Iterator,因此可以把 generator 函数赋值给 一个对象的`Symbol.Iterator`属性,这样子它就是可迭代的了  
```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]
```

#### next 可以带参数
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个`yield表达式的返回值`。   
`即可以根据外部的参数来决定函数内部会执行 什么逻辑`  
[博客地址](https://es6.ruanyifeng.com/#docs/generator#next-%E6%96%B9%E6%B3%95%E7%9A%84%E5%8F%82%E6%95%B0)


#### Generator 结合 异步
由于`next返回值的 value 属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据`,  
```js
function* gen(x){
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```
Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```js
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
```

#### Generator 结合 Ajax
```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
// 使用方式
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
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

