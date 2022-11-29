let val = 1;

setTimeout(() => {
    val = 101;
    console.log('a-val', val)
}, 100)

// 这里就已经发生了值的拷贝,
module.exports = {
    val
}