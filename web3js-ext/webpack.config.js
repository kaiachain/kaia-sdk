const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
    fallback: {
      "querystring": false, // referenced in web3rpc/ApiClient, which is unused.
    },
  },
  output: {
    // Output dist/web3js-ext.bundle.js
    filename: "web3js-ext.bundle.js",
    path: path.resolve(__dirname, "dist"),
    // Define window.web3_ext
    library: "web3_ext",
    libraryTarget: "window",
  },
};
