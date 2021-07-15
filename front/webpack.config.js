const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {
  name: "streaks-front",
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].js?v=[contenthash]",
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|jsx|tsx)?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 versions"] },
              },
            ],
            "@babel/preset-react",
          ],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("./public/index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],

  devServer: {
    port: 3000,
  },
};

module.exports = config;
