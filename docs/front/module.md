### commonjs 和 es6 module 区别
1、CommonJS输出的是一个值的拷贝(`浅拷贝`)，ES6输出的是值的引用；  
2、CommonJS是运行时加载，ES6是编译时加载；      
3、CommonJS的require是同步加载模块(`阻塞`)，ES6的import是异步加载(`非阻塞`)，有独立模块依赖的解析阶段。  

#### 例子
[例子](https://www.php.cn/website-design-ask-491591.html)    

#### commonjs 怎么找到引入的文件的
node是怎么找到模块的位置的?  
1.  require("./index")这里面的参数叫做模块标识符,模块路径分析会分析这个参数,确定这个模块属于以下哪一类模块?  
--核心模块(Node自己带的)  
--路径模块(相对定位,或者绝对定位开始的模块)  
--自定义模块(node_modules里的模块)  
如果是核心模块,那就跳过路径分析,以及文件定位,如果是路径模块,那就去根据绝对位置或者相对位置去找.注意**自定义模块**:  
他会先去项目目录的node_modules里面找,没找到就去项目目录的上一级目录里找,一直找到根目录的node_modules,  
没找到就报错;  
2. 文件定位  
由于后缀可以省略,所以会依次补充上.js,.node,或者.json来尝试.  
>在NodeJS中, 省略了扩展名的文件, 会依次补充上.js, .node, .json来尝试, 如果传入的是一个目录, 那么NodeJS会把它当成一个包来看待,   
> 会采用以下方式确定文件名第一步, 找出目录下的package.json, 用JSON.parse()解析出main字段第二步, 如果main字段指定的文件还是省略了扩展, 
> 那么会依次补充.js, .node, .json尝试. 第三部, 如果main字段制定的文件不存在, 或者根本就不存在package.json, 那么会默认加载这个目录下的
> index.js, index.node, index.json文件. 以上就是文件定位的过程, 再搭配上路径分析的过程, 进行排列组合, 这得有多少种可能呀.  所以说, 自
> 定义模块的引入, 是最费性能的.