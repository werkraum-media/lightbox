const path = require("path");

const config = [
{
  entry: "./src/js/main.js",
  mode: "production",
  performance: { hints: false },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lightbox.min.js",
    library: "lightbox",
    libraryTarget: "umd",
    globalObject: "typeof self !== \"undefined\" ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|libs)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
},
{
  entry: "./src/js/bootstrap.js",
  mode: "production",
  performance: { hints: false },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.min.js"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ],
      }
    ]
  }
}];

module.exports = config;
