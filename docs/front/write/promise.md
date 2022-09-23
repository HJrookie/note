- A+ 规范, All, race ,any ,allSettled

#### Promise.all
```js
function* g() {
    yield 4;
    yield 6;
    yield 8;
}
let f = g();
Promise.alll = (promises: Iterable<any>) => {
    return new Promise((resolve, reject) => {
        // resolce数量         结果         当前   iterator 长度
        let resolvedCount = 0, result = [], i = 0, iteratorLenght = 0;
        for (let promise of promises) {
            iteratorLenght++;
            Promise.resolve(promise)
                .then((res) => {
                    resolvedCount++;
                    result[i] = res;
                    i++;
                    if (resolvedCount === iteratorLenght) {
                        resolve(result);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
};

const sleep = (time: number) => new Promise((r) => setTimeout(() => r(time), time));
const rejError = (time: number) => new Promise((r, rr) => setTimeout(() => rr(time), time));
Promise.alll([
    sleep(1000),
    sleep(2000),
    // rejError(1500)
]).then((res) => {
    console.log('res', res);
});
Promise.alll(f).then((res) => console.log(res));
```