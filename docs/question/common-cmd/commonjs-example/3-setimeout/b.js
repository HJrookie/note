const { val } = require('./a.js')

console.log('b', val);

setTimeout(() => {
    console.log(val);
}, 200)