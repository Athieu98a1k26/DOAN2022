const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  const clientBundleConfig = {
    stats: { modules: false },
    resolve: {
      extensions: [".js"],
    },
    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
          use: "url-loader?limit=100000",
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    entry: {
      vendor: [
        // "react-grid-layout/css/styles.css",
        // 'react-resizable/css/styles.css',
        // 'flatpickr/dist/flatpickr.min.css',
        // 'fullcalendar/dist/fullcalendar.min.css',

        "moment",
        // 'rc-slider',
        // 'autosize',
        // 'copy-to-clipboard',
        // 'flatpickr',
        // 'fullcalendar',
        "react",
        "react-dom",
        "react-router",
        "react-router-dom",
        "react-redux",
        "redux",
        "redux-thunk",
        "redux-persist",
        "@microsoft/signalr",
        // 'react-color',
        // 'react-dropzone',
        // 'react-modal',
        // 'react-rating',
        // 'react-select',
        // 'highcharts',
        // 'react-highcharts',
        // 'tieng-viet-khong-dau',
        // 'validator'
      ],
    },
    output: {
      publicPath: "vendor/",
      filename: "[name].js",
      library: "[name]_[hash]",
      path: path.join(__dirname, "../wwwroot", "vendor"),
    },
    mode: isDevBuild ? "development" : "production",
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.NormalModuleReplacementPlugin(
        /\/iconv-loader$/,
        require.resolve("node-noop")
      ), // Workaround for https://github.com/andris9/encoding/issues/16
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isDevBuild ? '"development"' : '"production"',
      }),
      new MiniCssExtractPlugin({
        filename: "vendor.css",
      }),
      new webpack.DllPlugin({
        path: path.join(
          __dirname,
          "../wwwroot",
          "vendor",
          "[name]-manifest.json"
        ),
        name: "[name]_[hash]",
      }),
    ],
    optimization: {
      minimize: !isDevBuild,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
  };

  return [clientBundleConfig];
};
