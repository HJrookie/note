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
        console.log('err --> ', err, data,)
        const res = g.next(data);
        console.log('res -->', res)
        if (res.done) return;
        res.value(next)
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