const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { dependencies } = require("../../package.json");

module.exports = {
  context: __dirname,
  entry: "./src/index.ts",
  mode: "development",
  output: { publicPath: "auto", clean: true },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "esbuild-loader", options: { loader: "tsx" } }],
  },
  devServer: { port: 3002, headers: { "Access-Control-Allow-Origin": "*" } },
  plugins: [
    new ModuleFederationPlugin({
      name: "content",
      filename: "remoteEntry.js",
      exposes: { "./Content": "./src/Content" },
      shared: {
        react: { singleton: true, requiredVersion: dependencies.react },
        "react-dom": { singleton: true, requiredVersion: dependencies["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({ templateContent: '<div id="root"></div>' }),
  ],
};
