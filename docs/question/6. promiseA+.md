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
        let resolvedCount = 0,
            result = [],
            i = 0,
            iteratorLength = 0;
        for (let promise of promises) {
            iteratorLength++;
            Promise.resolve(promise)
                .then((res) => {
                    resolvedCount++;
                    result[i] = res;
                    i++;
                    if (resolvedCount === iteratorLength) {
                        resolve(result);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }
        if(!iteratorLength){
            resolve(result)
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
Promise.alll([]).then((res) => console.log(res));

```

#### Promise.race
```js
function* g() {
    yield 4;
    yield 6;
    yield 8;
}
let f = g();

Promise.racee = (promises) => {
    return new Promise((resolve, reject) => {
        for (let promise of promises) {
            Promise.resolve(promise)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => reject(err));
        }
    });
};

const sleep = (time: number) => new Promise((r) => setTimeout(() => r(time), time));
const rejError = (time: number) => new Promise((r, rr) => setTimeout(() => rr(time), time));

Promise.racee([sleep(1000), sleep(2000), rejError(500)]).then((res) => {
    console.log('res', res);
});

Promise.racee(f).then((res) => console.log(res));
```

#### Promise.any
```js
function* g() {
  yield 4;
  yield 6;
  yield 8;
}
let f = g();
const anyy = (promises: Iterable<any>) => {
  return new Promise((resolve, reject) => {
    let rejectCount = 0, iteratorLength = 0;
    for (let promise of promises) {
      iteratorLength++;
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejectCount++;
          if (rejectCount === iteratorLength) {
            resolve("AggregateError: All promises were rejected");
          }
        });
    }
  });
};

const sleep = (time: number) => new Promise((r) => setTimeout(() => r(time), time));
const rejError = (time: number) => new Promise((r, rr) => setTimeout(() => rr(time), time));
anyy([rejError(1000), rejError(2000), rejError(500)])
  .then((res) => {
    console.log("res", res);
  })
Promise.any([rejError(1000), rejError(2000), rejError(500)]).then((res) => {
  console.log("res", res);
});
```


#### Promise.allSettled
```js
const sleep = (time) => new Promise((r) => setTimeout(() => r(time), time));
const rejError = (time) => new Promise((r, rr) => setTimeout(() => rr(time), time));
function* g() {
    yield 4;
    yield 6;
    yield 8;
}
let f = g();
Promise.allSet = (promises) => {
    return new Promise((resolve, reject) => {
        let count = 0,
            iteratorLength = 0,
            result = [],
            i = 0;
        for (let promise of promises) {
            iteratorLength++;
            Promise.resolve(promise)
                .then((res) => {
                    count++;
                    result[i] = {
                        status: 'fulfilled',
                        value: res,
                    };
                    i++;
                    if (count === iteratorLength) {
                        resolve(result);
                    }
                })
                .catch((err) => {
                    count++;
                    result[i] = {
                        status: 'rejected',
                        reason: err,
                    };
                    i++;
                    if (count === iteratorLength) {
                        resolve(result);
                    }
                });
        }
    });
};

Promise.allSet([sleep(1000), sleep(2000), rejError(500)]).then((res) => {
    console.log('res', res);
});

Promise.allSet(f).then((res) => {
    console.log('res', res);
});

```