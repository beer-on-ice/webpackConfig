const webpack = require('webpack')
const proxy = require('./proxy')
const historyApiFallback = require('./historyfallback')

module.exports = {
  mode: 'development',
  // 将压缩文件恢复到源文件原始位置的映射代码
  devtool: 'cheap-module-source-map',
  optimization: {
    // 热加载时直接返回更新文件名(替换new webpack.NamedModulesPlugin())
    namedModules: true,
    namedChunks: true
  },
  devServer: {
    port: 9009,
    overlay: true,
    hot: true, // 会自动刷新页面
    // hotOnly: true, //不会刷新页面
    proxy: proxy,
    historyApiFallback: historyApiFallback
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
