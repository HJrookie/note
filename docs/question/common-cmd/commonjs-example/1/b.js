// b.js
const a = require('./a.js')
console.log( a.val); // 1
a.setVal(101);
// a.val = 2;
console.log(a.val, a.getV()); // 1  因为缓存里的对象的值是没变的, getV相当于是重新获取了模块a里的值  
// console.log(require.cache) // k,v k是文件的绝对路径,v 是 Module 对象

/**
 * 
 */