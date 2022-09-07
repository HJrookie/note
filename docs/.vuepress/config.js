import { defineUserConfig } from "vuepress";
import { defaultTheme } from "vuepress";
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default defineUserConfig({
    lang: "zh-CN",
    title: "VuePress",
    description: "Linux FrondEnd 前端",
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
        backToTopPlugin(),
        mediumZoomPlugin({
            // 配置项
        }),
        nprogressPlugin(),
        docsearchPlugin({
            apiKey: 'e545798dfec8a6328fd5f84996a8de96',
            indexName: 'dev',
            // 配置项
        }),
    ],
    theme: defaultTheme({
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
                    text: "前端八股文",
                    // collapsible: true,
                    children: [
                        {
                            text: "拷贝",
                            link: "/front/copy.md",
                        },
                        {
                            text: "手写各种函数",
                            link: "/front/write.md",
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
