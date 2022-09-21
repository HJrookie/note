#### 闭包是什么?
MDN: 函数和其词法环境的引用结合在一起,构成闭包.可以在函数内部访问到外部的词法作用域.
#### 闭包的基础
1. js中的函数可以像变量一样返回  
2. 词法作用域

#### Exampl-001 :
```js
var name = "outer"
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        console.log(name);     //这里如果加了this.返回的就是 "outer"了
    }
    return displayName;
}
var myFunc = makeFunc();
myFunc();
```
> 解析: myFunc 是执行 makeFunc 时,返回的 displayName 函数实例的引用,displayName 的实例维持了一个对它的词法环境（变量 name 存在于其中）的引用。因此，当 myFunc 被调用时，变量 name 仍然可用，其值 Mozilla 就被传递到console.log中。  

#### Exampl-002:
下面是一个更有意思的示例 — 一个 makeAdder 函数：  
```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
在这个示例中，我们定义了 makeAdder(x) 函数，它接受一个参数 x ，并返回一个新的函数。返回的函数接受一个参数 y，并返回x+y的值。

从本质上讲，makeAdder 是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将   其参数和 5 求和，另一个和 10 求和。  

add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。
  
    
#### 闭包的作用
1. **用闭包模拟私有方法**
在Java里,可以将方法声明为私有,实现了`权限控制`.  
js里可以通过闭包,模拟实现**使用闭包来定义公共函数，并令其可以访问私有函数和变量** ,也被称为`模块模式:`
```js
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }   
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```
在之前的示例中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：Counter.increment，Counter.decrement 和 Counter.value。

该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 privateCounter 的变量和名为 changeBy 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 privateCounter 变量和 changeBy 函数。
#### 上面例子的发展
>这里只是把IIFE(Immediately Invoked Function Expression)转换成表达式.v1,v2分别维护不同的词法环境
```js
var makeCounter = function() {
  var value = 0;
  function change(v) {
    value += v;
  }
  return {
    plus: function() {
      change(1)
    },
    jian: function() {
      change(-1)
    },
    vv: function() {
      return value
    }
  }
}
var v1 = makeCounter()
var v2 = makeCounter()
console.log(v1.vv(), v2.vv()) // 0  0
v1.plus(); v1.plus();v2.jian()
console.log(v1.vv(), v2.vv())      // 2  -1
```
### 闭包引发的问题
在循环中创建闭包：一个常见错误
在 ECMAScript 2015 引入 let 关键字 之前，在循环中有一个常见的闭包创建问题。参考下面的示例：
```js
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp(); 
```
数组 helpText 中定义了三个有用的提示信息，每一个都关联于对应的文档中的input 的 ID。通过循环这三项定义，依次为相应input添加了一个 onfocus  事件处理函数，以便显示帮助信息。

运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个input上，显示的都是关于年龄的信息。

原因是赋值给 onfocus 的是闭包。这些闭包是由他们的函数定义和在 setupHelp 作用域中捕获的环境所组成的。  
这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量item。  
这是因为变量item使用var进行声明，由于变量提升，所以具有函数作用域。当onfocus的回调执行时，item.help的值被决定。  
由于循环在事件触发之前早已执行完毕，变量对象item（被三个闭包所共享）已经指向了helpText的最后一项。  
##### 解决方案1
解决这个问题的一种方案是使用更多的闭包：特别是使用前面所述的函数工厂：
```js
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp(); 
```
这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境，  
makeHelpCallback 函数为每一个回调创建一个新的词法环境。在这些环境中，help 指向 helpText 数组中对应的字符串。
##### 解决方案2 
```js
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // 马上把当前循环项的item与事件回调相关联起来
  }
}

setupHelp();
```
