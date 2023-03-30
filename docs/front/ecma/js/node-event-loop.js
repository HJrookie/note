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


process.nextTick(function () {
    console.log('1');
});
process.nextTick(function () {
    console.log('2');
    setImmediate(function () {
        console.log('3');
    });
    process.nextTick(function () {
        console.log('4');
    });
});

setImmediate(function () {
    console.log('5');
    process.nextTick(function () {
        console.log('6');
    });
    setImmediate(function () {
        console.log('7');
    });
});
setTimeout(e => {
    console.log(8);
    new Promise((resolve, reject) => {
        console.log(8 + 'promise');
        resolve();
    }).then(e => {
        console.log(8 + 'promise+then');
    })
}, 0)

setTimeout(e => { console.log(9); }, 0)

setImmediate(function () {
    console.log('10');
    process.nextTick(function () {
        console.log('11');
    });
    process.nextTick(function () {
        console.log('12');
    });
    setImmediate(function () {
        console.log('13');
    });
});

console.log('14');
new Promise((resolve, reject) => {
    console.log(15);
    resolve();
}).then(e => {
    console.log(16);
})
// 14 15 1 2 4  16  8 8p  8pt  9 5 6  10 11 12 3 7 13 