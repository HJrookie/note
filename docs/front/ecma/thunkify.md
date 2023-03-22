#### thunkify
`thunk`函数跟函数柯里化有点类似,但是有区别
```js
function f(a, b, cb) {
  cb(a, b, a + b);
}
const thunk =
  (fn) =>
  (...args) =>
  (cb) => {
    fn.call(this, ...args, cb);
  };
thunk(f)(1, 2)(console.log);

```
