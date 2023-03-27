// b.js
const a = require('./a.js')
console.log(a, a.val); // 1
a.setVal(101);
console.log(a.val, a.getV(),); // 1 101 这里的 a.val 没变, a.js中的值其实已经被修改了
console.log(require.cache) // k,v k是文件的绝对路径,v 是 Module 对象