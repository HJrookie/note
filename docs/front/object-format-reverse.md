#### 对象 数组 格式化  
```js
var o = {
    a: {
        b: 1,
        c: 2,
    },
    bb: 3,
    cc: {
        d: 4,
        e: 5,
        f: [1, 2, 3, { ff: 8 }],
    },
    g: [
        1,
        2,
        {
            h: 5,
            hh: 6,
        },
        [8, 9, 10],
    ],
};

var isObj = (v) =>
    ["Object", "Array"].includes(
        Object.prototype.toString.call(v).slice(8, -1)
    );

function test(o, pre = "") {
    if (!isObj(o)) {
        return o;
    }
    let res = {};
    if (Array.isArray(o)) {
        o.forEach((v, i) => {
            let kk = pre + "[" + i + "]";
            if (isObj(v)) {
                res = Object.assign(res, test(v, kk));
            } else {
                res[kk] = v;
            }
        });
        return res;
    }
    for (let [k, v] of Object.entries(o)) {
        let kk = pre ? pre + "." + k : k;
        if (isObj(v)) {
            const tt = test(v, kk);
            res = Object.assign(res, tt);
        } else {
            res[kk] = v;
        }
    }
    return res;
}

console.log(test(o));

```

#### 对象数组 逆向 格式化
```js
let o = {
    "a.b": 1,
    "a.c": 2,
    bb: 3,
    "cc.d": 4,
    "cc.e": 5,
    "cc.f[0]": 1,
    "cc.f[1]": 2,
    "cc.f[2]": 3,
    "cc.f[3].ff": 8,
    "g[0]": 1,
    "g[1]": 2,
    "g[2].h": 5,
    "g[2].hh": 6,
    "g[3][0]": 8,
    "g[3][1]": 9,
    "g[3][2]": 10,
};

const getKeys = (str) => {
    return str.match(/([a-zA-Z]+)|((?<=\[)[0-9]+(?=\]))/g) ?? [];
};

let result = {};

for (let [k, v] of Object.entries(o)) {
    const keys = getKeys(k);

    keys.reduce((prev, cur, i) => {
        if (!prev[cur]) {
            if (/[0-9]+/.test(keys[i + 1])) {
                prev[cur] = [];
            } else {
                prev[cur] = {};
            }
        }
        if (i === keys.length - 1) {
            prev[cur] = v;
        }
        return (prev = prev[cur]);
    }, result);
}

console.log(result);
```
