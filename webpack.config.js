const MinifyPlugin = require("babel-minify-webpack-plugin")

module.exports = {
  entry : {
    async : ['babel-polyfill', './src/js']
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['env']
      }
    }]
  },
  output: {
    filename: 'app.js'
  },
  plugins: [
    new MinifyPlugin()
  ]
}