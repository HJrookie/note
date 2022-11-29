const a = require('./a.js')

console.log(a);

setTimeout(() => {
    console.log(a);
}, 200)

// 最终val改变了