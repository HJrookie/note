import { defineUserConfig } from "vuepress";
import { defaultTheme } from "vuepress";

export default defineUserConfig({
    lang: "zh-CN",
    title: "你好， VuePress ！",
    description: "这是我的第一个 VuePress 站点",
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
                    text: "自己的项目",
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
                    ],
                },
            ],
        },
    }),
});
