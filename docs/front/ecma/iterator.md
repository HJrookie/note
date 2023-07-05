#### iterable protocol 可迭代协议

让 js 对象自定义被迭代时的行为,`Array,Map,Set,String,TypedArray,Segments,函数的 arguments 对象,NodeList 对象`有默认的迭代行为,  
但是普通对象没有;  
即 在`[Symbol.iterator]`这个常量上定义一个无参方法,这个方法会返回一个对象,这个对象符合 [`iterator 协议`](#iterator-协议)
这个无参方法可以是一个 `普通函数` 或者 是一个 [`generator`](/front/ecma/generator.md)

#### iterator 协议

协议定义了一种标准化的方式来产生数字序列(可能是无限的),且可能在序列尾有一个返回值;  
当一个 对象实现了 next 方法,且这个方法返回一个符合`IteratorResult`接口的对象,这个对象就是`iterator`

#### IteratorResult 接口

```ts
type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;
interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}
interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}
```

#### 让一个 iterator iterable

```js
let myIterator = {
  a: 1, // 这种对象就叫 iterabel iterator
  b: 2,
  next() {},
  [Symbol.iterator]() {
    return this;
  },
};
// generator 对象也是 iterable iterator
let g = (function* name(params) {
  yield 1;
  yield 2;
})();
console.log(typeof aGeneratorObject.next); // function 因此就是 iterator
console.log(typeof aGeneratorObject[Symbol.iterator]); // function 说明实现了这个@@iterator method, 因此是可迭代的
console.log(aGeneratorObject[Symbol.iterator]() === aGeneratorObject); //true
```

#### 自己实现类似 iterator 的函数

```js
var it = makeIterator(["a", "b"]);
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}

it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }
// 但是 [...it] 会报错.因为 it 没实现 iterator .
it[Symbol.iterator] = function () {
  return this;
}; // 这样就不会报错了
console.log([...it])  // ['a', 'b']
```

#### 探索数组的 iterator

```js
var arr = [1,2,3,4,]
let f = arr[Symbol.iterator]();  //注意这里需要 执行一下.
f.next()  // {value: 1, done: false}

// 数组内置的 iterator 猜测类似下面这样子. 比上面的那个 makeIterator 函数多了一层
function iterator(arr) {
    return function () {
        let i = 0;
        return {
            next: function () {
                return i < arr.length
                    ? { value: arr[i++], done: false }
                    : { value: undefined, done: true };
            },
        };
    };
}
// 这个 iterator 咋用呢
let value = {}
value[Symbol.iterator] = iterator([33,5,3,62,232])
[...value]  // 就是数组
```

#### 让一个对象 iterable

```js
// 方法 1 自己实现 iterator    `一种是 自己写 遍历函数,另一种是 yield 跟值  都是可以的`,只要最终的结果是 `Iterator`
let o = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    let arr = Object.entries(this),
      i = 0;
    return { // 这里一定是需要返回一个对象
      next() {
        if (i < arr.length) {
          return { value: arr[i++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

// 方法 2  generator
function* gen() {
  yield* Object.entries(this);
}
let o = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: gen,
};

for (let v of o) {
  console.log(v); // ['a', 1] ['b', 2] ['c', 3]
}


// generator 的另一种写法
let obj = {
  *[Symbol.iterator]() {
    yield "hello";
    yield "world";
  },
};

for (let x of obj) {
  console.log(x); // "hello"  "world"
}
```
