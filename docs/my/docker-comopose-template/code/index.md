### 简介
为了实现一个镜像,处处运行这样的目标,则需要把 http 的 请求地址放置在外部文件中(即 config.json),然后在生产环境中读取 config.json 文件中的配置,
再发出 http 请求,以适配复杂的部署环境
####  api.js 读取 config.json 文件逻辑
@[code js](./api.js)

####  请求地址配置
这样子配置的话,在 dev 环境就会使用 api.js 中默认的测试环境的地址,如果在生产环境的话,就会使用 config.json 中的配置
@[code js](./request.js)

####  webpack 配置
由于 config.json 需要在打包时放置在静态文件的根目录,因此就需要修改 webpack 的一些配置
@[code js](./vue.config.js)


#### config.json
@[code json](./config.json)
