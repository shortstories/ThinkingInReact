const webpack = require("webpack");
const path = require("path");
const fs = require('fs');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, "src", "entry.js")
  ],
  output: {
    path: path.join(__dirname, "src", "static", "js"),
    filename: "bundle.js",
    publicPath: '/static/'
  },
  devtool: "source-map", // or "inline-source-map"
  devServer: {
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        loaders: ['react-hot', "babel-loader?presets[]=es2015,presets[]=react,cacheDirectory=babel_cache"],
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};