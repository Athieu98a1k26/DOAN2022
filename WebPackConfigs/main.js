const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  const clientBundleOutputDir = "../wwwroot";

  const clientBundleConfig = {
    stats: { modules: false },
    resolve: { extensions: [".js", ".jsx"] },
    output: {
      filename: "js/[name].[hash].js",
      publicPath: "/",
      path: path.join(__dirname, clientBundleOutputDir),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /(node_modules|bower_components|public\/)/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevBuild ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            context: "App/asset",
          },
        },
        {
          test: /\.(woff|woff2)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "url-loader?prefix=font/&limit=5000",
          options: {
            name: "[path][name].[ext]",
            context: "App/asset",
          },
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream",
          options: {
            name: "[path][name].[ext]",
            context: "App/asset",
          },
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "[path][name].[ext]",
            context: "App/asset",
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "images/[path][name].[ext]",
            context: "App/asset/img",
          },
        },
        // {
        //   test: /\.html$/,
        //   loader: "html-loader?attrs[]=video:src",
        // },
        // {
        //   test: /\.mp4$/,
        //   loader: "url?limit=10000&mimetype=video/mp4",
        // },
        //   {
        //     test: [/\.mp4$/, /\.gif$/],
        //     loader: require.resolve("url-loader"),
        //     options: {
        //       limit: 10000,
        //       name: "videos/[path][name].[ext]",
        //       context: "App/asset/videos",
        //     },
        //   },
      ],
    },
    entry: isDevBuild
      ? {
        // host: "react-hot-loader/patch",
        main: "./App/index.jsx",
      }
      : {
        main: "./App/index.jsx",
      },
    mode: isDevBuild ? "development" : "production",
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isDevBuild ? '"development"' : '"production"',
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(__dirname, clientBundleOutputDir, "js/*"),
          path.join(__dirname, clientBundleOutputDir, "css/*"),
          path.join(
            __dirname,
            clientBundleOutputDir,
            "../_PublishOutput/wwwroot/js/*"
          ),
          path.join(
            __dirname,
            clientBundleOutputDir,
            "../_PublishOutput/wwwroot/css/*"
          ),
        ],
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "template.html"),
        inject: false,
        environment: isDevBuild ? "development" : "production",
      }),
      new AddAssetHtmlPlugin([
        {
          filepath: require.resolve("../wwwroot/vendor/vendor.js"),
          publicPath: "/vendor",
          outputPath: "/vendor",
          hash: true,
        },
        // {
        //     filepath: require.resolve('../wwwroot/vendor/vendor.css'),
        //     publicPath: "/vendor",
        //     outputPath: "/vendor",
        //     typeOfAsset: 'css',
        //     hash: true
        // }
      ]),
      new MiniCssExtractPlugin({
        filename: "css/main.css",
      }),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, "../"),
        manifest: require("../wwwroot/vendor/vendor-manifest.json"),
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

  if (isDevBuild) {
    clientBundleConfig.devServer = {
      index: "index.html",
      disableHostCheck: true,
      contentBase: path.resolve(__dirname, clientBundleOutputDir),
      port: 5008,
      historyApiFallback: true,
      hot: true,
      // stats: {
      //     children: false, // Hide children information
      //     maxModules: 0 // Set the maximum number of modules to be shown
      // },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, content-type, Authorization",
      },
    };
  }

  return [clientBundleConfig];
};
