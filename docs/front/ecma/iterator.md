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
#### tips
- `for of, ... , Array.from()`都会调用 iterator