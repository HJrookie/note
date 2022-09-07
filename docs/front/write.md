#### arguments 转数组
```js
function test(){
    console.log(arguments)
    console.log(Array.prototype.slice.call(arguments))
    console.log([...arguments])
}
test(1,2,3)
```

### 1. call
```js
const getType = (value) =>
    Object.prototype.toString.call(value).match(/(?<=\s)[a-zA-Z]+/)[0];       // 获取类型

var a = 2;
const o = { a: 1 };
function t() {
    console.log('t-->', this.a, 'args --> ', [...arguments]);
}

Function.prototype.cal = function (_this, ...args) {
    _this = _this ?? globalThis; // 也可以把 globalThis 换成 Function('reurn this')();
    _this = new Object(_this);
    const key = Symbol();
    _this[key] = this;
    // 这里的 args 如果是要从 arguments 来的话,那么 就需要写成 Array.prototype.slice.apply(args).slice(1) 因为第一个是 _this ,因此需要 slice 1
    const result = _this[key](...args);
    delete _this[key];
    return result;
};


Function.prototype.appl = function(_this,arr = []){
    _this = _this?? globalThis;
    _this = new Object(_this);
    const key = Symbol()
    _this[key] = this;
    const result = _this[key](...arr);
    delete _this[key];
    return result;
}

t()
t.call(o, 4, 5, 6)
t.cal(o, 4, 5, 6)

```


#### apply
```js
const getType = (value) =>
    Object.prototype.toString.call(value).match(/(?<=\s)[a-zA-Z]+/)[0];       // 获取类型

var a = 2;
const o = { a: 1 };
function t() {
    console.log('t-->', this.a, 'args --> ', arguments);
}

Function.prototype.appl = function (_this, args) {
    if(!Array.isArray(args)){throw new Error('need an array')}
    _this = _this ?? globalThis; // 也可以把 globalThis 换成 Function('reurn this')();
    _this = new Object(_this);
    const key = Symbol();
    _this[key] = this;
    // 这里的 args 如果是要从 arguments 来的话,那么 就需要写成 Array.prototype.slice.apply(args).slice(1) 因为第一个是 _this ,因此需要 slice 1
    const result = _this[key](...args);
    delete _this[key];
    return result;
};

Function.prototype.appl = function(_this,arr = []){
    _this = _this?? globalThis;
    _this = new Object(_this);
    const key = Symbol()
    _this[key] = this;
    const result = _this[key](...arr);
    delete _this[key];
    return result;
}

t()
t.apply(o, [4, 5, 6])
t.appl(o, [4, 5, 6])
```




#### 原型对象概论
```js
let f = function () {
   this.a = 1;
   this.b = 2;
}
let o = new f()
o.__proto__ === f.prototype // ok
f.prototype.__proto__ === Object.prototype // ok
o.__proto__ .__proto__ === Object.prototype // 由上面推算来,ok
o.__proto__ .__proto__.__proto__ === null // 原型链的尽头
//  {a:1, b:2} ---> f.prototype ---> Object.prototype---> null
f.__proto__ === Function.prototype // 函数 f 是 Function的实例,
f.__proto__.__proto__ ===Object.prototype // 


// 函数 f 其实只是多继承了一层.

const {log:l} = console;
function t(){ this.a = 1; }
let  tt = new t();


Object.prototype.c = 5;
l(t.c,tt.c) //  5 ,5 都是 5  


Object.prototype.c = 5;
t.prototype.c = 6
l(t.c,tt.c) //  5 ,6,  t.c 还是访问的t.__proto中的值,没找到就去Object 原型找了, tt.c  找到了tt.__proto 就是 t.prototype .就是 6 了


Object.prototype.c = 5;
t.prototype.c = 6
t.constructor.prototype.c = 7 // 其实就是 t.__proto 的值是 7
l(t.c,tt.c) // t.c是

```

#### 获取一个实例的__proto__ 有一种办法
```js
function t(){ this.a = 1; }
let  tt = new t();

// 1. 
tt.__proto__;
// 2. 访问了t.prototype上的 constructor 这个值,
tt.constructor.prototype; 
// 3. 
Object.getPrototypeOf(tt) === tt.__proto__
```


#### 原型链  instanceOf
```js
function instan(a, b) {
    if (!b) {
        return false;
    }
    while (a) {
        const proto = Object.getPrototypeOf(a);
        if (proto === b.prototype) {
            return true;
        } else {
            a = proto;
        }
    }
    return false;
}

function t() {}
console.log(instan(t, Function));



// instanceOf 和 isPrototypeOf 其实等价
a instanceOf B 
// 则 B.prototype.isPrototypeOf(a) 为 true



// 重写hasInstance
class B {
  static [Symbol.hasInstance]() {
    return true
  }
}
console.log('' instanceof B); // true
```


### 节流 防抖
input搜索框可以使用throttle(节流),间隔一段时间必须发请求,当500ms没有输入,认为输入完成,再次发请求    
只需要一次结果的适合用防抖(页面resize时,只需要在最后的时候进行重新渲染),


#### 节流
```js
var a = 1;
let o = { a: 2 };
function throttle(func, delay, firstExec) {
    let canExec = true;
    return function () {
        if (firstExec) {
            func.apply(this, [...arguments]);
            firstExec = false;
        }
        if (canExec) {
            canExec = false;
            setTimeout(() => {
                func.apply(this, [...arguments]);
                canExec = true;
            }, delay);
        }
    };
}
window.addEventListener(
    'scroll',
    throttle(
        function () {
            console.log('v', this.a, this);
        },
        2000,
        true. // 第一次是否立即执行
    )
);

```


#### 防抖
```js
var a = 1;  
let o = { a: 2 };
function debounce(func, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            console.log(33, arguments);
            func.apply(this, [...arguments]); // 这里的 arguments 主要是 滚动Event,callee
        }, delay);
    };
}
window.addEventListener(
    'scroll',
    debounce(function () {
        console.log('v', this.a, this); // 这里的 this 是 window
    }, 500)
);
```



#### Object.create
```js
var a = { a: 1 };
let b = Object.create(a);
b.__proto__ === a;

// 如果是 null 则比较特别,b 上面只有这两个属性,其他属性都没有,它的原型链也是 null,因此是一个比较纯粹的对象
let b = Object.create(null, {
    name: { value: 18, enumerable: true },
    age: { value: 27, enumerable: true },
});



// 自己实现
Object.ccc = function(proto,properties = {}){
    function t(){};
    t.prototype = proto;
    const o = new t();
    Object.defineProperties(o,properties)
    return o;
}
var a = {a:1};
let b = Object.ccc(a,{
    name: { value: 18, enumerable: true },
    age: { value: 27, enumerable: true },
})
console.log(b)
```


#### 函数拷贝
```js
const f = function (a, b, c) {
    console.log(a + b + c);
};
Function.prototype.clone = function () {
    let that = this; // 这里的 this 其实就是函数自身
    const temp = function (...args) {
        return that.apply(this, [...args]); // 这里必须是 that.apply(this)
    };
    for (let [k, v] of Object.entries(temp)) {
        temp[k] = v;
    }
    return temp;
};
let ff = f.clone();
ff(1, 2, 3);


// 写法2
function f(){console.log(1)}
Function.prototype.clone = function() {
  var newfun = new Function('return ' + this.toString())();
  for (var key in this)
    newfun[key] = this[key];
  return newfun;
};
let ff = f.clone()
```


