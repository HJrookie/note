
### WeakSet / WeakMap 
里面只能放对象,当没有别的地方引用它时,下次gc 的时候,就会被 移除;因此,它不能迭代;  
```js
const ws = new WeakSet([[1,2,3],[3,4,5]])
const ws2 = new WeakSet([[]])
```
#### Map
使用 `Object.is` 判断 key
按 set 的顺序遍历
#### set 
按 add 的顺序遍历
#### 其它容器转换
map => arr `[...map] [...map.keys()] [...map.entries()]`    
arr => map `new Map(二维数组)  new Map([[1,2],[3,4]])`   
set => map `new Map(set.entries)`  
map => obj   `Object.fromEntries(map.entries())`  
obj  => map  `new Map(Object.entries(obj))`

```js
// map => arr => json => arr => map
let map = new Map([[1,2],[4,5],[6,7]])
new Map(JSON.parse(JSON.stringify([...map])))

// map => obj => json => obj => map
let map = new Map([[1,2],[4,5],[6,7]])
new Map(Object.entries(JSON.parse(JSON.stringify(Object.fromEntries(map.entries())))))
```

#### 创建数组 trick
```js
var count = 1000000;
console.time('1');
Array(count).fill(1);   // 这种方法大概4ms
console.timeEnd('1');

console.time('2');
Array.from({length:count},v=>1)  // 大概 60ms
console.timeEnd('2');
```