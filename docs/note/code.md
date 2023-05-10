##### 大数相加
```js

let a = "1111111111111",
    b = "111111111111111111123456";
function add(a, b) {
    while (a.length < b.length) {
        a = "0" + a;
    }
    while (b.length < a.length) {
        b = "0" + b;
    }
    let flag = 0,
        res = "";
    for (let i = a.length - 1; i >= 0; i--) {
        let v = +a[i] + +b[i] + flag;
        if (v >= 10) {
            v -= 10;
            flag = 1;
        } else {
            flag = 0;
        }
        res = v + res;
    }
    if (flag) {
        res = 1 + res;
    }
    return res;
}

console.log(add(a, b));
```

##### 函数cache
```js
const isValid = (v) => v !== null && v !== undefined;
const memorize = (fn) => {
    let cache: Record<string, any> = {};
    return (...args: any[]) => {
        const k = JSON.stringify(args);
        if (isValid(cache[k])) {
            return cache[k];
        } else {
            cache[k] = fn(...args);
        }
    };
};
```

##### 数组乱序
```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffle = (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = Math.round(Math.random() * arr.length);
        swap(arr, i, randomIndex);
    }
    return arr;
};
const swap = (arr: number[], i: number, j: number) => {
    arr[i] = arr[i] ^ arr[j];
    arr[j] = arr[i] ^ arr[j];
    arr[i] = arr[i] ^ arr[j];
};

console.log(shuffle(arr));

```

##### 用 setTimeout 实现setInterval
```js
const interVal = (func, delay) => {
    let timer = null;
    const newTimer = () => {
        timer = setTimeout(() => {
            func();
            newTimer();
        }, delay);
        //  console.log(timer);
    };
    const clear = () => {
        clearTimeout(timer);
    };
    return {
        newTimer,
        clear,
    };
};

let timer = interVal(() => {
    console.log(1);
}, 1000);
timer.newTimer();

```
