- commomjs es6  
- npm -S -D   
- indexOf slice 0-i, i-  
- em - rem    
- charAt charCodeAt codePointAt  
- str . match search replace(all) split  
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

#### 复制一个对象以及对象的原型对象中的属性  
```js
// 先创建一个对象,它的原型对象指向原来的原型对象,然后把 obj 上的属性 copy 到新创建的对象上去
var cc =Object.assign(Object.create(Object.getPrototypeOf(obj)),obj)
// 创建一个对象,它的原型指向 原来的原型对象,属性 就是原来的对象的属性
Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors(obj))
```

#### vue sync
```vue
<child :prop.sync="val"></child>    <!-- 会被拓展为 下面的代码-->  
<child :prop="val" @update:prop="value => val = value"></child>  
<!-- 子组件需要这么调用,就可以更新 prop 的值了  -->
this.$emit('update:prop', newValue)        
```
![sync是个语法糖](https://s1.ax1x.com/2020/07/22/UHdWM4.png)

#### css 选择器 
`A > B` 代表,A元素后仅一代元素       
`A  B`代表 A元素的所有子B元素       
`A + B` ,选择紧接A元素后面出现的B元素,并且A,B有共同的父元素(兄弟选择器)    
`A ~ B` ,选择前面有A元素的B元素,(不是后代关系,而是兄弟关系),A,B有相同父元素,但是B不必紧随A      
