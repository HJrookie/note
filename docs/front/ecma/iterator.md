#### 例子
```js
var it = makeIterator(['a', 'b']);
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
```
#### 机制
iterator 是一个函数,对于数组来说,就是对应的`Symbol.iterator`这个属性,其值是一个函数,  
JS中内置iterator: `Array,Map,Set,String,TypedArray,函数的 arguments 对象,NodeList 对象`
```js
var arr = [1,2,3,4,]
let f = arr[Symbol.iterator]();
f.next()  // {value: 1, done: false}
```

#### 如何实现 Iterator
`Symbol.iterator()`方法的最简单实现，还是使用` Generator 函数` 
```js
// 一个简单的实现,
let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"

```

#### 较为成熟一点的 Iterator (自定义迭代器)
```js
const o = {
    a: 'hello',
    b: 'world',
    [Symbol.iterator]() {
        let _this = this,
            keys = Object.keys(this),
            i = 0;
        return {
            next() {
                if (i < keys.length) {
                    return { value: [keys[i], _this[keys[i++]]], done: false };
                }
                return { value: undefined, done: true };
            },
        };
    },
};
for(let [k,v] of o){
  console.log(k,v)
}
```

#### 其实也可以直接把 generator 赋值给对象
`一种是 自己写 遍历函数,另一种是 yield 跟值  都是可以的`,只要最终的结果是 `Iterator`

```js
function* gen() {
    yield '1';
    yield '2';
    yield '3';
}
let o = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]: gen,
};

for (let v of o) {
    console.log(v); // 1  2 3  即 yield 的值
}

let o = {
    a: 1,
    b: 2,
    c: 3,
    *[Symbol.iterator]() {
        yield '1';
        yield '2';
        yield '3';
    },
};

for (let v of o) {
    console.log(v); // 1  2 3  即 yield 的值
}
```

#### tips
- `for of, ... , Array.from()`都会调用 iterator