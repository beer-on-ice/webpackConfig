/**
 *  webpack： ^3.11.0可用，webpack4报错
 */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vue: ['vue', 'vue-router', 'vuex', 'axios'],
    ui: ['element-ui']
  },
  output: {
    path: path.join(__dirname, '../src/dll/'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [

    new webpack.DllPlugin({
      path: path.join(__dirname, '../src/dll', '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
