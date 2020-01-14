const path = require("path");
const ProgressBar = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: path.resolve("./src/app.jsx")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/px/',
    filename: "bundle.js",
    sourceMapFilename: "[file].map"
  },
  devtool: "source-map",
  devServer: {
    // contentBase: path.resolve(__dirname, "dist"),
    // publicPath: '/px/',
    port: 9000,
    compress: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    // open: true,
    historyApiFallback: true,
    // headers: {
    //   "Referer": ""
    // },
    proxy: {
      "/get": {
        // target: "https://img.cheerfun.dev:23334",
        target: "https://bigimg.cheerfun.dev",
        changeOrigin: true,
        // ws: true,
        secure: false,
        logLevel: "debug",
        proxyTimeout: 10 * 60 * 1000,
        bypass: (req, res) => {
          if (req.headers && req.headers.referer) {
            // req.headers.referer = "http://test.pixivic.com/";
            // req.headers.host = "img.cheerfun.dev";

            delete req.headers.host;
            delete req.headers.referer;
            // req.headers.host = "bigimg.cheerfun.dev";
          }
        }
      }
    }
  },
  resolve: {
    extensions: [".jsx", ".js", ".styl", ".css", ".yml"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              sourceMaps: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg|eot|svg|ttf|woff|woff2|ico)$/,
        loader: "url-loader"
      },
      {
        test: /\.(styl|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              hmr: process.env.NODE_ENV === "development"
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "stylus-loader"
          }
        ]
      },
      {
        test: /\.ya?ml$/,
        use: ["json-loader", "yaml-loader"]
      }
    ]
  },
  plugins: [
    new ProgressBar({
      width: 100,
      format: `webpack build [:bar] :percent (:elapsed seconds)`,
      clear: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./src/index.html",
      favicon: "./src/assets/images/favicon.ico",
      minify: { html5: true, minifyCSS: true, collapseWhitespace: true }
    })
  ]
};
