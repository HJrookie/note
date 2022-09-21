import { defineUserConfig } from "vuepress";
import { defaultTheme } from "vuepress";
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default defineUserConfig({
    lang: "zh-CN",
    title: "VuePress",
    description: "不积跬步无以至千里",
    markdown: {
        toc: {
            includeLevel: [1, 2, 3, 4]
        }
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
            apiKey: 'e545798dfec8a6328fd5f84996a8de96',
            indexName: 'dev',
            // 配置项
        }),
    ],
    theme: defaultTheme({
        lastUpdated: '最后更新时间',
        repoLabel: 'Github',
        base: '/note/',
        repo: 'https://github.com/HJrookie/note',
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
                        {
                            text: "琐碎记录",
                            link: "/my/others.md",
                        },
                    ],
                },
                {
                    text: "ECMA",
                    // collapsible: true,
                    children: [
                        {
                            text: '正则',
                            link: '/front/ecma/regexp.md'
                        },
                        {
                            text: 'map-set-array',
                            link: '/front/ecma/map-set-array.md'
                        },
                        {
                            text: 'iterator',
                            link: '/front/ecma/iterator.md'
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
                            text: '对象数组格式化',
                            link: '/front/write/object-format-reverse.md'
                        },
                    ],
                },
                {
                    text: "浏览器相关",
                    // collapsible: true,
                    children: [
                        {
                            text: "跨域",
                            link: "/browser/cross-origin.md",
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
                            text: 'Event Loop',
                            link: '/browser/Event-loop.md'
                        },
                        {
                            text: "Cache",
                            link: "/browser/cache.md",
                            collapsible: true,
                            children: [
                                {
                                    text: "Chrome",
                                    link: "/browser/chrome-cache.md",
                                },]
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
                            text: "HTTP",
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
                    text: '网络知识',
                    link: '/network/index.md'
                },
                {
                    text: 'CSS',
                    children: [{
                        text: 'Tips',
                        link: '/css/tips.md',

                    },
                    {
                        text: '伪类',
                        link: '/css/3. 伪类-伪元素.md'
                    }]
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
                            children: [
                            ],
                            link: "/company/letms/letms.md",
                        },
                    ],
                },
            ],
        },
    }),

});
