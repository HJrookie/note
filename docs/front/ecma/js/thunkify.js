var fs = require("fs");
var thunkify = require("thunkify");
var readFileThunk = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFileThunk("./1.txt");
    console.log(r1.toString());
    var r2 = yield readFileThunk("./2.txt");
    console.log(r2.toString());
};
const autoRunner = (func) => {
    const g = func();
    function next(err, data) {
        // console.log("err --> ", err, data);
        const res = g.next(data);
        // console.log("res -->", res);
        if (res.done) return;
        res.value(next);  // value 是一个函数
    }
    next();
};

autoRunner(gen)

/*
err -->  undefined undefined
res --> { value: [Function (anonymous)], done: false }
err -->  null <Buffer 31 31 31 31 31 31 31 31 31 31 31>
11111111111
res --> { value: [Function (anonymous)], done: false }
err -->  null <Buffer 32 32 32 32 32 32 32 32 32 32>
2222222222
res --> { value: undefined, done: true }
*/



// 1. 例1
// const cb = (err, data) => {
//     console.log(111);
// };
// readFileThunk("./1.txt")(cb); // 一般用法,多个参数分别多次调用,最后是回调  

// 1. 例2
// function* test2() {
//     var r1 = yield readFileThunk("./1.txt");
//     console.log(r1.toString());
// }
// const gen2 = test2();

// let a = gen2.next();
// console.log(a,) // 执行到了读取 1.txt,返回的 value是一个函数,可以接收回调
// let b = gen2.next(444); // 444 这个参数会作为r1的值,并且被打印
// console.log(b)

// { value: [Function (anonymous)], done: false }
// 444
// { value: undefined, done: true }