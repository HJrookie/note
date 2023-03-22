var fs = require("fs");
const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const gen = function* () {
    try {
        const data1 = yield readFile("./1.txt");
        console.log(data1.toString());
        const data2 = yield readFile("./2.txt");
        console.log(data2.toString());
        yield Promise.reject(333);
    } catch (err) {
        console.log("generator-err", err);  // 这里可以捕获到错误
    }
};

const autoRunner = (func) => {
    const g = func();
    function next(data) {
        let res = g.next(data);
        if (res.done) {
            return res.value;
        }
        res.value.then(
            (res) => {
                next(res);
            },
            (err) => {
                g.throw(err); // 抛出错误
            }
        );
    }

    next();
};
autoRunner(gen);
