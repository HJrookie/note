console.log('start');

process.nextTick(function () {
    console.log('nextTick1');
});

setTimeout(function () {
    console.log('setTimeout');
}, 0);

new Promise(function (resolve, reject) {
    console.log('promise');
    resolve('resolve');
}).then(function (result) {
    console.log('promise then');
});

(async function () {
    console.log('async');
})();

setImmediate(function () {
    console.log('setImmediate');
});

process.nextTick(function () {
    console.log('nextTick2');
});

console.log('end');
/**
 * start 
 * promise
 * async 
 * end
 * nextTick1
 * p1.then
 * nextTick2
 * timeout
 * immediately
 */