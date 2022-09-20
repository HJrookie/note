
#### 浅拷贝
```js
const o = { a: 1, b: 2, c: 3, d: { e: 1 } };
function copy(obj) {
  if (typeof obj !== "object" || !obj) {
    return;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (let [k, v] of Object.entries(obj)) {
    result[k] = v;
  }
  return result;
}

const res = copy(o);
console.assert(res.d === o.d); // 这个是浅拷贝,所以结果是 true

```



#### 深拷贝  (不考虑 Date,Regexp 类型,以及循环引用)

```ts
type CommonObj = Record<string | number, any>;
const { stringify: str } = JSON;
const o: CommonObj = {
    a: 1,
    b: 2,
    c: 3,
    d: { e: 1, f: { g: 1, h: 2 } },
};

function deepCopy<T>(obj: T) {
    if (typeof obj !== 'object' || !obj) {
        return obj;
    }
    const result: CommonObj = Array.isArray(obj) ? [] : {};
    for (let [k, v] of Object.entries(obj)) {
        if (Array.isArray(v)) {
            result[k] = deepCopy(v);
        } else if (typeof v === 'object') {
            result[k] = deepCopy(v);
        } else {
            result[k] = v;
        }
    }
    return result;
}

const res = deepCopy(o);
console.log(str(res) === str(o));

```


#### 深拷贝,处理复杂情况(循环引用,特殊对象)
```js
const o = {
    a: 1,
    b: 2,
    c: 3,
    d: { e: 1, f: { g: 1, h: 2 } },
    dd: new Date(),
    ee: /^(ab+.*123)$/,
};
const isObject = (value) =>
    ['Function', 'Object'].includes(
        Object.prototype.toString.call(value).slice(8, -1)
    );
function deepCopy(value, map = new Map()) {
    // 先判断循环引用
    if (map.get(value)) {
        return value;
    }
    // 获取构造函数
    const constructor = value.constructor;
    // 判断构造函数名称,对于这两种类型,返回特定结果
    if (/^(RegExp|Date)$/.test(constructor.name)) {
        return new constructor(value);
    }
    const result = Array.isArray(value) ? [] : {};
    if (!isObject(value)) {
        return value;
    }
    for (let [k, v] of Object.entries(value)) {
        map.set(value, true);
        result[k] = deepCopy(v, map);
    }
    return result;
}
const res = deepCopy(o);
console.log(res);
```

#### 优化过的深拷贝
```js
var o = {
    // a:1,
    // b:'fsdfsdf',
    // c:false,
    d: function () {
        console.log(1);
    },
    e: {
        f: 1,
    },
    f: new Date(),
    g: /fsdfsdf/,
};

function clone(func) {
    const temp = function (...args) {
        return func.call(this, ...args);
    };
    for (let [k, v] of Object.entries(func)) {
        temp[k] = v;
    }
    return temp;
}

const getType = (value) => Object.prototype.toString.call(value).slice(8, -1);
function deepClone(value, map = new Map()) {
    if (map.get(value) || !value) {  // 处理循环引用和 null undefined. 0 '' 等
        return value;
    }
    const constructor = value?.constructor;
    if (['RegExp', 'Date'].includes(constructor.name)) {
        return new constructor(value); // 处理正则,日期
    }
    if (getType(value) === 'Function') {  // 处理函数
        return clone(value);
    }
    let result = Array.isArray(value) ? [] : {};
    if (typeof value !== 'object') { //  这个逻辑其实不加也行
        return value;
    }
    map.set(value, true);
    for (let [k, v] of Object.entries(value)) {
        result[k] = deepClone(v, map);
    }
    return result;
}

const res = deepClone(o);
for (let [k, v] of Object.entries(res)) {
    console.log(k);
    console.assert(o[k] !== res[k]);
}

```