- commomjs es6  
- npm -S -D   
- indexOf slice 0-i, i-  
- em - rem    
- charAt charCodeAt codePointAt  
- str . match search replace   
- JSON.stringify `JSON.stringify(val,replacer, space)` 2,key 数组,space,缩进   
- JSON.parse `reviver`,支持自定义`parser`  
- `图片文件 accept="image/*" `

#### Symbol 类型
```js
1. typeof  Symbol(42)  // 'symbol'  
2. Symbol("foo") //每次都是不同的,Symbol.for("foo")会复用已有的值  
3. `new Symbol,则会抛出 TypeError错误`,//不支持包装器类型,但是支持`Object(sym)`    
4. 可以作为对象的 key,不支持 `for of,Object.entries,JSON.stringify,Object.keys/valus,    
Object.getOwnPropertyNames`,支持`Object.getOwnPropertySymbols,Reflect.ownKeys`  
5. `Symbol.keyFor(Symbol.for("kkk")) // kkk`  
6. 不能转为 string 和 number,`但是支持 toString 方法`  
7. Object(sym) == sym returns true.//用===.就不相等.因为数据类型不一样
```

