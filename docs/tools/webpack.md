### 干嘛的
静态模块打包器.默认只认识js文件,因此遇到其他格式的文件的时候,需要告诉他用什么loader.   


### 4个概念的理解
#### 1. 入口
webpack使用哪个模块,来作为构建其内部依赖图的开始.
#### 2. 出口
在哪里输出打包好的bundle文件,以及如何命名
#### 3. loader
loader让webpack能够去处理那些非js文件,loader可以将所有类型的文件转换为webpack能够处理的有效模块,然后就可以利用webpack的打包能力,对他们进行处理   
配置的时候: test 和 use,分别指 文件类型,以及对应的loader  
1. url-loader  
> 图片音乐和字体都是url-loader进行处理的
2. babel-loader  
>js文件需要通过babel-loader来转换
3. vue-loader  
>可以将vue的单文件组件转化成js模块
#### 4. plugins  
dev 或者 build 流程中的 工具,如 `CopyWebpackPlugin,Tersor,CompressionWebpackPlugin,ProgressBarPlugin,HtmlWebpackPlugin,SpeedMeasurePlugin`