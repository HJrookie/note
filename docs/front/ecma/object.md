### 对象是?
js 中的对象是无序属性的组合,其属性可以包含基本值,对象,或者函数.可以当成一个散列表,k-v 组合

> 对象属性名前面加\_,表示私有变量,表明只能通过对象方法来访问,但是只是建议

#### 数据属性

Configurable 能否通过 delete 删除属性而重新定义属性,或者修改属性的特性,或者将数据属性修改为访问器属性,`用.创建 默认true`  
Enumerable 能否通过 for-in 循环返回属性,`用.创建 默认true`  
Writable 是否可修改,`用.创建 默认true`  
Value 数据的值.默认 undefined

可以通过 `Object.defineProperty(obj,property,{writable,configurable,enumerable,value})`来修改属性的特性,也可以新添加属性,该属性默认的`configurable, enumerable, writable默认为false`. 修改已有属性时不会这样.

> 可以通过 Object.getOwnPropertyDescriptor(obj,property)来获取属性的详情.或者 Object.getOwnPropertyDescriptors(obj)获取所有属性的特性.(Symbol 类型也可以)

#### 访问器属性

Configurable 能否通过 delete 删除属性而重新定义属性,或者修改属性的特性,或者将数据属性修改为访问器属性,`用.创建 默认true`  
Enumerable 能否通过 for-in 循环返回属性,`用.创建 默认true`  
get 获取值的时候,会调用此函数  
set 设置值的的时候,调用此函数

### 继承

实现继承的主要方法是 原型链.

> 每个构造函数都有一个原型对象每个原型对象有一个 constructor 属性,指向构造函数.通过 new 调用构造函数可以创建实例,实例有一个**proto**的属性,指向构造函数的原型对象.当然,每个构造函数继承了 Object 对象,故以下例子成立:

```js
function t() {}
t.prototype.constructor === t;
t.prototype.__proto__ === Object.prototype;
// 函数本身是 Function 的实例
t.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

```js
// 实现一下继承
var son = function () {};
var father = function () {};
var obj = new son(); //obj是 son 的实例
var temp = son.prototype; //在这里暂存一下son原来的原型对象
console.log(obj.__proto__ === son.prototype); //判断obj的__proto__是否指向son的原型对象  true

// 重写 son 的选型对象,  等同于 Object.setPrototypeOf(son.prototype,father.prototype)
son.prototype = new father();
console.log(obj.__proto__ === son.prototype); // false,son的原型对象 = new father了,因此son.__proto__不再指向son的原型了.
console.log(obj.__proto__ === temp); //true,temp还是指向原来son的原型对象
//father 和 son 都继承了 Object对象
console.log(son.prototype.__proto__ === Object.prototype); //false,son的原型对象 = new father了
console.log(son.prototype.__proto__ === father.prototype); //true,因此指向了father的原型对象
console.log(father.prototype.__proto__ === Object.prototype); //true

// 新创建一个son对象
let d = new son();
d.__proto__ === son.prototype; // t
son.prototype.__proto__ === father.prototype; // t
father.prototype.__proto__ === Object.prototype; // t
// d ---> son.prototype ---> father.prototype ---> Object.prototype ---> null
// son ---> Function.prototype --->  Object.prototype ---> null
// 通过 d.__proto__ 或者 Object.getPrototypeOf向上追溯
```

#### 通过原型链继承

```js
function father() {
  this.shared = [1, 2, 3];
}
father.prototype.getName = function (params) {
  return this.name;
};
function child() {}

child.prototype = new father(); // 继承
const c1 = new child();
c1.shared.push(4);
const c2 = new child();
c2.shared; // 长度为 4,因为 将 child.prototype 重写为 father 的实例,因此这个对象上有了 shared 属性
```

- 问题 1：原型中包含的引用类型属性将被所有实例共享；
- 问题 2：子类在实例化的时候不能给父类构造函数传参；

#### 借用构造函数实现继承

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
function SubType(name) {
  // 继承 SuperType
  SuperType.call(this, name); // 函数就是在特定上下文中执行代码的简单对象,每个实例都会有自己的 colors 属性
}
let instance1 = new SubType("name1"); // 并且可以传参数
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"
```

借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。  
- 必须在SubType构造函数中定义方法，因此函数不能重用。  
- 子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。

#### 组合继承`最常用`

```js
function father(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}
father.prototype.getName = function (params) {
  return this.name;
};
function child(name, age) {
  father.call(this, name);
  this.age = age;
}

child.prototype = new father(); // 继承
child.prototype.getAge = function (params) {
  return this.age;
};

const c1 = new child("c1", 1); //  各自的name,age,arr 都是独立的
const c2 = new child("c2", 2);
```


#### 继承的注意事项

1.子类继承后,可以重写父类原型链上的方法,也可以在自己的原型上新创建方法.  
但不管怎样,一定要先重写子类的原型,再做上面的修改  
2. 如果子类是 function son(){this.colors=["red","blud"]} 父类 father(){}  
子类继承父类, var o1 = new son(); va2 o2 = new son() .  
**o1 和 o2 会共享 colors 数组**

#### 继承的实质是重写原型对象,取而代之的是新类型的实例

对象属性的搜索: 在上述例子中,对于对象属性的搜索,将会有三步:

1. 在对象自身中搜索
2. 在 son.prototype 中搜索
3. 在 father.prototype 中搜索

### Object 的原型上有什么

Object.prototype

1. constructor
2. hasOwnProperty
3. isPrototypeOf
4. propertyIsEnumerable
5. toLocalString
6. toString
7. valueOf
