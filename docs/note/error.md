#### 一些常见错误
prettier 格式化的时候报错,因为 package.json 中 有 `type:module`, 意味着只能使用 esm ,而不能使用 cjs 了;
> .prettierrc.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.

[有人也有类似的困惑](https://segmentfault.com/q/1010000042298464)  
[node社区慢慢开始朝esm 转变,见这个答案 ](https://segmentfault.com/q/1010000042295770)