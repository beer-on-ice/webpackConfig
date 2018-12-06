const {
  resolve
} = require('path')
// glob只能传一个参数，所以使用glob-all
const glob = require('glob-all')

// 打包时删除指定目录
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 将选择的chunk插入到html中,和HtmlwebpackPlugin同时使用时,注意htmlwebpackplugin中chunks的配置项
// const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
// 压缩js代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 优化或者压缩单独的css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 消除冗余的css代码
const PurifycssWebpack = require('purifycss-webpack')

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ], // 替代[new UglifyJsPlugin({...})]
    runtimeChunk: {
      name: 'manifest'
    },
    // 代码分割，提取公共代码(替代CommonsChunkPlugin)
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          reuseExistingChunk: false,
          priority: 100
        }
      }
    }
  },
  plugins: [
    /**
     *
     *  webpack3可用，用来优化打包速度
     * new webpack.DllReferencePlugin({
         manifest: require('../src/dll/ui-manifest.json')
       }),
       new webpack.DllReferencePlugin({
         manifest: require('../src/dll/vue-manifest.json')
       })
     *
     */

    // new HtmlWebpackInlineChunkPlugin({
    //   inlineChunks: ['manifest']
    // }),
    new CleanWebpackPlugin(resolve(__dirname, '../dist'), {
      root: resolve(__dirname, '../'),
      verbose: true
    }),
    new PurifycssWebpack({
      // 配置了一个paths,主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了
      paths: glob.sync([
        resolve(__dirname, './../*.html')
      ])
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.style\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ]
}
