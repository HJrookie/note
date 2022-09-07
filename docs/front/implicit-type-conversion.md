### 数据类型
[详解文章](https://segmentfault.com/a/1190000040048164)
#### 1. 基本数据类型 Basic Type
`Boolean String Number null undefined Symbol Bigint`
#### 2. 引用类型
- 普通对象  `{ name: 'Bob'}`  
- 函数      `function(){}`  
- 日期类型   `new Date()`
### 隐式类型转换
隐式转换中主要涉及到三种转换：

1、将值转为原始值，ToPrimitive()。  
2、将值转为数字，ToNumber()。  
3、将值转为字符串，ToString()。  

#### [[toPrimitive(input: any, preferedType?: 'string' |'number')]]方法  
第二个参数默认逻辑是:  
>如果input是Date类型,preferType是string,否则都是number  
>如果PreferredType被标记为Number，则会进行下面的操作流程来转换输入的值。  
1、如果输入的值已经是一个原始值，则直接返回它  
2、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，  
   如果valueOf()方法的返回值是一个原始值，则返回这个原始值。  
3、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。  
4、否则，抛出TypeError异常。  

>如果PreferredType被标记为string，则 1 -> 3 -> 2-> 4。  


#### valueOf 方法对于不同类型的值的返回结果
1. 对于Date(),valueOf值是1594974117251  
2. 对其它类型,返回对象本身  
#### toString 方法对于不同类型的值的返回结果
1. 对于boolean,string,number,function,array,Date,返回的都是string类型  
(数组[1,2]=>'1,2',数字变字符串,函数体都变字符串)  
2. 对象,返回"[object Object]"

### 通过ToNumber将值转换为数字
参数	结果  
undefined	NaN  
null	+0  
布尔值	true转换1，false转换为+0  
数字	无须转换  
字符串	有字符串解析为数字，例如：‘324 ’转换为324，‘qwer’转换为NaN  
对象(obj)	先进行 ToPrimitive(obj, Number)转换得到原始值，在进行ToNumber 转换为数字  

#### 操作符对 preferedType 的影响
- 使用模板字符串或者使用String(...)包装时，preferedType=string  
- 使用减法或者Number(...)包装时，`preferedType=number`  
- 加法时对于引用类型, 默认`preferedType` 是 `string`   
- 字符串 + 任意值 都会 拼接为 字符串  
- 非字符串 相加 都会先默认转成 number,再加  
- 任意值 - 任意值，一律执行ToNumber，进行数字运算  

# 例子
```js
({} + {}) = ?
两个对象的值进行+运算符，肯定要先进行隐式转换为原始类型才能进行计算。  
1、进行ToPrimitive转换，由于没有指定PreferredType类型，{}会使默认值为  Number，进行ToPrimitive(input, Number)运算。  
2、所以会执行valueOf方法，({}).valueOf(),返回的还是{}对象，不是原始值。  
3、继续执行toString方法，({}).toString(),返回"[object Object]"，是原始值。  
故得到最终的结果，"[object Object]" + "[object Object]" = "[object Object][object Object]"  
```
## 例子2
```js
2 * {} = ?  
1、首先*运算符只能对number类型进行运算，故第一步就是对{}进行ToNumber类型转换。  
2、由于{}是对象类型，故先进行原始类型转换，ToPrimitive(input, Number)运算。  
3、所以会执行valueOf方法，({}).valueOf(),返回的还是{}对象，不是原始值。  
4、继续执行toString方法，({}).toString(),返回"[object Object]"，是原始值。    
5、转换为原始值后再进行ToNumber运算，"[object Object]"就转换为NaN。  
故最终的结果为 2 * NaN = NaN  
```

## 3. ==运算符隐式类型转换
```js
比较运算 x==y, 其中 x 和 y 是值，返回 true 或者 false。这样的比较按如下方式进行：

1、若 Type(x) 与 Type(y) 相同， 则  

    1* 若 Type(x) 为 Undefined， 返回 true。  
    2* 若 Type(x) 为 Null， 返回 true。  
    3* 若 Type(x) 为 Number， 则  
  
        (1)、若 x 为 NaN， 返回 false。  
        (2)、若 y 为 NaN， 返回 false。  
        (3)、若 x 与 y 为相等数值， 返回 true。  
        (4)、若 x 为 +0 且 y 为 −0， 返回 true。  
        (5)、若 x 为 −0 且 y 为 +0， 返回 true。  
        (6)、返回 false。  
        
    4* 若 Type(x) 为 String, 则当 x 和 y 为完全相同的字符序列（长度相等且相同字符在相同位置）时返回 true。 否则， 返回 false。  
    5* 若 Type(x) 为 Boolean, 当 x 和 y 为同为 true 或者同为 false 时返回 true。 否则， 返回 false。  
    6*  当 x 和 y 为引用同一对象时返回 true。否则，返回 false。  
  
2、若 x 为 null 且 y 为 undefined， 返回 true。  
3、若 x 为 undefined 且 y 为 null， 返回 true。  
4、若 Type(x) 为 Number 且 Type(y) 为 String，返回比较 x == ToNumber(y) 的结果。  
5、若 Type(x) 为 String 且 Type(y) 为 Number，返回比较 ToNumber(x) == y 的结果。  
6、若 Type(x) 为 Boolean， 返回比较 ToNumber(x) == y 的结果。  
7、若 Type(y) 为 Boolean， 返回比较 x == ToNumber(y) 的结果。  
8、若 Type(x) 为 String 或 Number，且 Type(y) 为 Object，返回比较 x == ToPrimitive(y) 的结果。  
9、若 Type(x) 为 Object 且 Type(y) 为 String 或 Number， 返回比较 ToPrimitive(x) == y 的结果。  
10、返回 false。  
```
两个类型相同时,比较值就可以了,(+0===-0,+0==-0)  
类型不同时:  
主要是String,Boolean,number之间比较都转成number进行比较,有对象的话,就toPrimitive,再比较,  

## ==例子解析
```js
var a = {
  valueOf: function () {
     return 1;
  },
  toString: function () {
     return '123'
  }
}
true == a // true;
首先，x与y类型不同，x为boolean类型，则进行ToNumber转换为1,为number类型。
接着，x为number，y为object类型，对y进行原始转换，ToPrimitive(a, ?),没有指定转换类型，默认number类型。
而后，ToPrimitive(a, Number)首先调用valueOf方法，返回1，得到原始类型1。
最后 1 == 1， 返回true。
```
### ==例子2
```js
[] == !{}
//
1、! 运算符优先级高于==，故先进行！运算。
2、!{}运算结果为false，结果变成 [] == false比较。
3、根据上面第7条，等式右边y = ToNumber(false) = 0。结果变成 [] == 0。
4、按照上面第9条，比较变成ToPrimitive([]) == 0。
    按照上面规则进行原始值转换，[]会先调用valueOf函数，返回this。
   不是原始值，继续调用toString方法，x = [].toString() = ''。
   故结果为 '' == 0比较。
5、根据上面第5条，等式左边x = ToNumber('') = 0。
   所以结果变为： 0 == 0，返回true，比较结束。
```

# 终极例子
