# 待完善部分
6.3.2 借用构造函数,组合继承,原型式继承,寄生式继承,寄生组合式继承,

### 对象是?
js中的对象是无序属性的组合,其属性可以包含基本值,对象,或者函数.可以当成一个散列表,k-v组合
>对象属性名前面加_,表示私有变量,表明只能通过对象方法来访问,但是只是建议  

#### 数据属性
Configurable 能否通过delete删除属性而重新定义属性,或者修改属性的特性,或者将数据属性修改为访问器属性,用.创建.默认true  
Enumerable  能否通过for-in循环返回属性,用.创建.默认true  
Writable  是否可修改,用.创建.默认true  
Value  数据的值.默认undefined  

可以通过 `Object.defineProperty(obj,property,{writable,configurable,enumerable,value})`来修改属性的特性,也可以新添加属性,该属性默认的`configurable, enumerable, writable默认为false`. 修改已有属性时不会这样.  
>可以通过Object.getOwnPropertyDescriptor(obj,property)来获取属性的详情.或者Object.getOwnPropertyDescriptors(obj)获取所有属性的特性.(Symbol类型也可以)

#### 访问器属性
Configurable 能否通过delete删除属性而重新定义属性,或者修改属性的特性,或者将数据属性修改为访问器属性,用.创建.默认true  
Enumerable  能否通过for-in循环返回属性,用.创建.默认true  
get  获取值的时候,会调用此函数  
set  设置值的的时候,调用此函数  
 
### 继承
实现继承的主要方法是 原型链.  
>每个构造函数都有一个原型对象每个原型对象有一个constructor属性,指向构造函数.通过new 调用构造函数可以创建实例,实例有一个__proto__的属性,指向构造函数的原型对象.当然,每个构造函数继承了Object对象,故以下例子成立:  
```js
function test(){}
test.prototype.__proto__ === Object.prototype;
```
```js
// 实现一下继承
var sub = function(){}
var father = function(){}
var obj = new sub();  //sub为实例
var temp = sub.prototype;                     //在这里暂存一下sub原来的原型对象
console.log(obj.__proto__ === sub.prototype) //判断obj的__proto__是否指向sub的原型对象  true
sub.prototype = new father();
console.log(obj.__proto__ === sub.prototype)    // false,sub的原型对象 = new father了,因此sub.__proto__不再指向sub的原型了.
console.log(obj.__proto__ === temp)                                        //true,temp还是指向原来sub的原型对象
//father 和 sub 都继承了 Object对象
console.log(sub.prototype.__proto__ === Object.prototype)                  //false,sub的原型对象 = new father了
console.log(sub.prototype.__proto__ === father.prototype)               //true,因此指向了father的原型对象
console.log(father.prototype.__proto__===Object.prototype )            //true
// 新创建一个sub对象
var o2 = new sub();
o2.__proto__===sub.prototype;   //true
```
#### 继承的另一个例子
```js
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);// 这里相当于是 Bar.prototype === new Foo()
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true

console.log(Bar.prototype.__proto__ === Foo.prototype); //true
console.log(Baz.prototype.__proto__ === Bar.prototype); //true
```

    
#### 继承的注意事项
1.子类继承后,可以重写父类原型链上的方法,也可以在自己的原型上新创建方法.  
但不管怎样,一定要先重写子类的原型,再做上面的修改  
2. 如果子类是 function sub(){this.colors=["red","blud"]} 父类 father(){}  
子类继承父类, var o1 = new sub(); va2 o2 = new sub() .  
**o1和o2会共享colors数组**
      
#### 继承的实质是重写原型对象,取而代之的是新类型的实例
对象属性的搜索: 在上述例子中,对于对象属性的搜索,将会有三步:  
1. 在对象自身中搜索  
2. 在sub.prototype中搜索  
3. 在father>prototype中搜索

### Object的原型上有什么
Object.prototype  
1. constructor  
2. hasOwnProperty  
3. isPrototypeOf  
4. propertyIsEnumerable  
5. toLocalString  
6. toString  
7. valueOf