import { defineUserConfig } from "vuepress";
import { defaultTheme } from "vuepress";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import codeCopyPlugin from "@snippetors/vuepress-plugin-code-copy";

export default defineUserConfig({
    lang: "zh-CN",
    port: 8082,
    title: "VuePress",
    description: "不积跬步无以至千里",
    markdown: {
        toc: {
            includeLevel: [1, 2, 3, 4],
        },
    },
    // bundler: viteBundler({
    //     viteOptions: {},
    //     vuePluginOptions: {},
    // }),
    plugins: [
        // backToTopPlugin(),
        // mediumZoomPlugin({
        //     // 配置项
        // }),
        // nprogressPlugin(),
        docsearchPlugin({
            apiKey: "e545798dfec8a6328fd5f84996a8de96",
            indexName: "dev",
            // 配置项
        }),
        codeCopyPlugin({
            align: "top",
        }),
    ],
    theme: defaultTheme({
        lastUpdated: "最后更新时间",
        repoLabel: "Github",
        base: "/note/",
        repo: "https://github.com/HJrookie/note",
        // 侧边栏数组
        // 所有页面会使用相同的侧边栏
        sidebar: {
            "/": [
                {
                    text: "工作常用",
                    children: [
                        {
                            text: "Linux 命令",
                            link: "/note/cmd.md",
                        },
                        {
                            text: "gitlab Runner 安装",
                            link: "/note/install-gitlab.md",
                        },
                    ],
                },
                {
                    text: "自己写的玩具",
                    // collapsible: true,
                    children: [
                        {
                            text: "Nodejs 爬虫",
                            link: "/my/spider.md",
                        },
                        {
                            text: "响应式 demo",
                            link: "/my/reactive.md",
                        },
                        {
                            text: "docker-compose",
                            // link: "/my/docker-comopose-template/overview.md",
                            children: [
                                {
                                    text: "概览",
                                    link: "/my/docker-comopose-template/overview.md",
                                },
                                {
                                    text: "前端代码",
                                    link: "/my/docker-comopose-template/code/index.md",
                                },
                            ],
                        },
                        // {
                        //     text: "琐碎记录",
                        //     link: "/my/others.md",
                        // },
                    ],
                },
                {
                    text: "ECMA",
                    // collapsible: true,
                    children: [
                        {
                            text: "正则",
                            link: "/front/ecma/regexp.md",
                        },
                        {
                            text: "map-set-array",
                            link: "/front/ecma/map-set-array.md",
                        },

                        {
                            text: "Closure",
                            link: "/front/ecma/closure.md",
                        },
                        {
                            text: "Object",
                            link: "/front/ecma/object.md",
                        },
                        {
                            text: "Iterator",
                            link: "/front/ecma/iterator.md",
                        },
                        {
                            text: "Generator",
                            link: "/front/ecma/generator.md",
                        },
                        {
                            text: "AutoRunner",
                            link: "/front/ecma/autoRunner.md",
                        },
                        {
                            text: "worker",
                            link: "/front/ecma/worker.md",
                        },
                    ],
                },
                {
                    text: "Utils",
                    // collapsible: true,
                    children: [
                        {
                            text: "拷贝",
                            link: "/front/write/copy.md",
                        },
                        {
                            text: "手写各种函数",
                            link: "/front/write/write.md",
                        },
                        {
                            text: "对象数组格式化",
                            link: "/front/write/object-format-reverse.md",
                        },

                        {
                            text: "todo",
                            link: "/front/write/todo.md",
                        },
                    ],
                },
                {
                    text: "浏览器相关",
                    // collapsible: true,
                    children: [
                        {
                            text: "跨域",
                            link: "/browser/cors.md",
                        },
                        {
                            text: "事件Event",
                            link: "/browser/event.md",
                        },
                        {
                            text: "Ajax",
                            link: "/browser/ajax.md",
                        },
                        {
                            text: "Event Loop",
                            link: "/browser/Event-loop.md",
                        },
                        {
                            text: "Cache",
                            link: "/browser/cache.md",
                            collapsible: true,
                            children: [
                                {
                                    text: "Chrome",
                                    link: "/browser/chrome-cache.md",
                                },
                            ],
                        },
                    ],
                },
                {
                    text: "工具",
                    // collapsible: true,
                    children: [
                        {
                            text: "nginx",
                            link: "/tools/nginx.md",
                        },
                        {
                            text: "webpack",
                            link: "/tools/webpack.md",
                        },
                        {
                            text: "docker",
                            link: "/tools/docker.md",
                        },
                    ],
                },
                // {
                //     text: "思想",
                //     // collapsible: true,
                //     children: [
                //         {
                //             text: "概览",
                //             link: "/thought/overview.md",
                //         },
                //     ],
                // },
                {
                    text: "速记",
                    // collapsible: true,
                    children: [
                        {
                            text: "Quick",
                            link: "/quick/quick.md",
                        },
                    ],
                },
                {
                    text: "协议",
                    // collapsible: true,
                    children: [
                        {
                            text: "HTTP(2/s/3)",
                            link: "/protocol/http.md",
                        },
                        {
                            text: "TCP-UDP",
                            link: "/protocol/tcp-udp.md",
                        },
                        {
                            text: "websocket",
                            link: "/protocol/websocket.md",
                        },
                    ],
                },
                {
                    text: "网络知识",
                    children: [
                        {
                            text: "5 层",
                            link: "/network/5layer.md",
                        },

                    ],
                },
                {
                    text: "CSS",
                    children: [
                        {
                            text: "Tips",
                            link: "/css/tips.md",
                        },
                        {
                            text: "css3",
                            link: "/css/css3.md",
                        },
                        {
                            text: "伪类",
                            link: "/css/3. 伪类-伪元素.md",
                        },
                    ],
                },
                {
                    text: "公司项目",
                    // collapsible: true,
                    children: [
                        {
                            text: "天津大赛",
                            collapsible: true,
                            children: [
                                {
                                    text: "form",
                                    link: "/company/tianjin/form.md",
                                },
                                {
                                    text: "mixins",
                                    link: "/company/tianjin/mixins.md",
                                },
                                {
                                    text: "form + mixins",
                                    link: "/company/tianjin/form-mixins.md",
                                },
                            ],
                            link: "/company/tianjin/tianjin-contest.md",
                        },
                        {
                            text: "letms",
                            children: [],
                            link: "/company/letms/letms.md",
                        },
                        {
                            text: "train",
                            children: [],
                            link: "/company/letms/train.md",
                        },
                    ],
                },
                {
                    text: "一些问题",
                    // collapsible: true,
                    children: [
                        {
                            text: "1. commonJS 和 CMD区别 ",
                            link: "/question/common-cmd/1.common-cmd.md",
                        },
                        {
                            text: "2. 构建工具 ",
                            link: "/question/build-tools/2.build-tools.md",
                        },
                        {
                            text: "3. tcp哪些方法保证可靠交付 ",
                            link: "/question/3. tcp-way.md",
                        },
                        {
                            text: "4. symbol ",
                            link: "/question/4. symbol.md",
                        },
                        {
                            text: "5. 迭代器 ",
                            link: "/question/5.iterator.md",
                        },
                        {
                            text: "6. Promise",
                            link: "/question/6. promiseA+.md",
                        },
                        {
                            text: "7. 宏任务-微任务-理论",
                            link: "/question/7. twoTask.md",
                        }, {
                            text: "8. 宏任务-微任务-例子",
                            link: "/question/8.twoTaskExample.md",
                        },
                        {
                            text: "9. Regexp",
                            link: "/question/9.Regexp.md",
                        },
                        {
                            text: "10. GC 堆栈",
                            link: "/question/10.gc.md",
                        },
                        {
                            text: "11. BFC",
                            link: "/css/2. 清除浮动-bfc.md",
                        },
                        {
                            text: "12. CSS3",
                            link: "/css/css3.md",
                        },

                        {
                            text: "14. Flex-Grid",
                            link: "/css/flex-grid.md",
                        },
                    ],
                },
            ],
        },
    }),
});
