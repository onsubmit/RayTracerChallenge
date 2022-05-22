const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/html/index.html",
  }),
];

module.exports = {
  mode: "development",
  entry: {
    index: ["./src/ts/index.ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.worker\.js$/,
        loader: "worker-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      ts: path.resolve(__dirname, "src/ts/"),
      less: path.resolve(__dirname, "src/less/"),
    },
  },
  plugins: plugins,
  output: {
    filename: "app.js",
  },
  optimization: {
    minimize: true,
  },
  devtool: "eval-source-map",
};
