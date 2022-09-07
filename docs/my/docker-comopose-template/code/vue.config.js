//     "copy-webpack-plugin": "^6.1.0",
// "@vue/cli-plugin-babel": "4.4.4",
// "@vue/cli-plugin-eslint": "^3.9.1",
// "@vue/cli-service": "4.4.4",
"use strict";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    chainWebpack(config) {
        config.when(process.env.NODE_ENV !== "development", (config) => {
            config.plugin("copy-static").use(CopyWebpackPlugin, [
                {
                    patterns: [{ from: path.resolve(__dirname, "config.json"), to: path.resolve(__dirname, "dist/") }],
                },
            ]);
        });
    },
};
