const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    publicPath: "/",
    // if you want to auto-load edited web-page after saving, publickPath should "/" with webpack-dev-server.
  },
  module: {
    rules: [
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      templateParameters: {
        title: "Adela",
      },
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname + "/dist"),
    index: "index.html",
    port: 9000,
    hot: true,
    // if you do not want to remain past-bundled-file in dist, remove "writeToDisk".
  },
};
