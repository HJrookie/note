### 速记  [mdn 查询](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-word)
\w 单个字母数字下划线,`如果是相应的大写字母 就代表非的意思`  
\s 单个空白字符，包括空格、制表符、换页符和换行符  
### 值得注意的地方
- /[ab]{2}[^defgh]/ 这里的 `[^defgh]` 表示不是defgh中的任意一个,要跟  `/^abc/` 这种区分开  
- 量词的匹配默认是贪婪的 `* _ ? {} `,但是?如果跟在 量词后面,会使匹配变成非贪婪的. 
```js
'123js'.match(/\d+/)   // 123
'123js'.match(/\d+?/)   // 1
'123js'.match(/(\d+)?/)   // 133
```

### 字符串的正则方法  
1. String.match(reg)    字符串匹配正则的结果
` 如果 reg === undefined  ,return  [''] `  
如果reg 中有 g ,返回匹配的所有结果; 
```js
'cat,bat,net,gat'.match(/.?at/g)     // ['cat','bat','gat']
//没有 g  ,结果和 Reg.exec 一样
'cat,bat,net,gat'.match(/.?at/g)     //  ["cat", index: 0, input: "cat,bat,net,gat",]


// 1 
'xyz - xyy - xyx'.match(/xy(?=z)/)  //匹配 xy,仅当后面一位是 z ,结果不包含 z,只有 xy
// 2
'xyz - xyy - xyx'.match(/(?<=x)yz/) // 匹配 yz,只有当前面是 x 的时候,结果不包含 x  
// 3. 
3,'xyz'.match(/x(?!y)/) // 匹配 x,仅当后面不是 y 的时候,匹配的结果只有 x
// 4. 
4,'xyz'.match(/(?<!y)x/) // 匹配 x,仅当前面不是 y 的时候,匹配的结果只有 x
```

