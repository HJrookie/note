// 相当于最开始的时候 这里有一个对象的定义,
const myModule = {
    exports: {}
}

setTimeout(() => {
    myModule.exports = {
        val: 101
    }
}, 100)


myModule.exports = {
    val: 1
}

const useA = myModule.exports

console.log(useA);

setTimeout(() => {
    console.log(useA);
}, 200)
