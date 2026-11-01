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
  devServer: { port: 3000, headers: { "Access-Control-Allow-Origin": "*" } },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        content: "content@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: dependencies.react },
        "react-dom": { singleton: true, requiredVersion: dependencies["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({ templateContent: '<div id="root"></div>' }),
  ],
};
