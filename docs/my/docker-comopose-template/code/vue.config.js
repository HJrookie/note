"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const name = defaultSettings.title || ""; // page title
// All configuration item explanations can be find in https://cli.vuejs.org/config/
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
