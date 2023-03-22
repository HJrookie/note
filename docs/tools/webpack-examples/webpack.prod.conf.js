"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const env = process.env.NODE_ENV === "testing" ? require("../config/test.env") : require("../config/prod.env");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
  },

  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new MiniCssExtractPlugin({
      filename: path.posix.join("static/css", "app_[name]_[contenthash:7].css"),
      chunkFilename: path.posix.join("static/css", "[name]_[contenthash:7].css"),
    }),
    // duplicated CSS from different components can be deduped. 移除重复 css
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true },
    }),
    // generate dist Home.html with correct asset hash for caching.
    // you can customize output by editing /Home.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === "testing" ? "index.html" : config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency",
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimization.minimizer
    // new webpack.optimize.SplitChunksPlugin({
    //   cacheGroups: {
    //     vendor: {
    //       minChunks(module) {
    //         // any required modules inside node_modules are extracted to vendor
    //         return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0;
    //       },
    //     },
    //     manifest: {
    //       minChunks: Infinity,
    //     },
    //     app: {
    //       async: "vendor-async",
    //       children: true,
    //       minChunks: 3,
    //     },
    //   },
    // }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"],
      },
      {
        from: path.resolve(__dirname, "../.well-known"),
        to: ".well-known",
        ignore: [".*"],
      },
    ]),
    // gzip 压缩
    new CompressionWebpackPlugin({
      // asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + config.build.productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimizer: [
      // 压缩 js
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        cache: false, //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
        parallel: true,
        exclude: ["/node_modules/"],
        uglifyOptions: {
          // compress: {},
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // only package third parties that are initially dependent
        },
        elementUI: {
          name: "chunk-elementUI", // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
});

// if (config.build.productionGzip) {
//   const CompressionWebpackPlugin = require("compression-webpack-plugin");
//
//   webpackConfig.plugins.push(
//
//   );
// }

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
