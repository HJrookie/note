- defer 保证顺序,延迟到解析到`</html>`才执行,async 异步,不保证执行顺序. 
- commomjs es6
- npm -S -D `下载包时,只下载dependency中的内容.`
- indexOf slice 0-i, i-
- em - rem
- charAt charCodeAt codePointAt
- str . match search replace(all) split
- `Object.hasOwn`取代`hasOwnProperty`,避免`对象重写hasOwnProperty,以及 Object.create(null)`识别错误的问题  
- `Array.of,Object.is NaN,+0`  
- `... Object.assign` 后者get/set,不会拷贝,原型链,以及不可枚举属性,基本类型会被包装为对象('字符串'),异常会打断后续拷贝任务  


#### 复制一个对象以及对象的原型对象中的属性

```js
//Object.create 用来明确指定一个对象的原型对象
{...Object.create(Object.getPrototypeOf(o)),...o}
// 创建一个对象,它的原型指向 原来的原型对象,属性 就是原来的对象的属性
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

#### vue sync

```vue
<child :prop.sync="val"></child>
<!-- 会被拓展为 下面的代码-->
<child :prop="val" @update:prop="(value) => (val = value)"></child>
<!-- 子组件需要这么调用,就可以更新 prop 的值了  -->
this.$emit('update:prop', newValue)
```

<!-- ![sync是个语法糖](https://s1.ax1x.com/2020/07/22/UHdWM4.png) -->

#### css 选择器

`A > B` 代表,A 元素后仅一代元素  
`A B`代表 A 元素的所有子 B 元素  
`A + B` ,选择紧接 A 元素后面出现的 B 元素,并且 A,B 有共同的父元素(兄弟选择器)  
`A ~ B` ,选择前面有 A 元素的 B 元素,(不是后代关系,而是兄弟关系),A,B 有相同父元素,但是 B 不必紧随 A


