// a.js
let val = 1;
const setVal = (newVal) => {
    val = newVal
}
const getV = ()=>val;
module.exports = {
    val,
    setVal,
    getV
}
// console.log('a', module)
// commonjs导出的是模块中的值的拷贝,并且这个导出的结果是一个对象,这个对象存储在require.cache里 