// a.js
let val = 1;
const setVal = (newVal) => {
    val = newVal
}
const getV = () => val;
module.exports = {
    val,
    setVal,
    getV
}
console.log('a', module)