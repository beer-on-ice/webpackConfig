const {
  resolve
} = require('path')
const webpack = require('webpack')
// webpack-merge 使用webpack-merge将webpack的配置文件进行合并
const merge = require('webpack-merge')
// 提取单独的css文件(替代ExtractTextWebpackPlugin)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 简化创建服务于 webpack bundle 的 HTML 文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

/// ///////////////////// 生产环境配置 ////////////////////////
const productionConfig = require('./webpack.prod.conf')
/// ///////////////////// 开发环境配置 ////////////////////////
const developmentConfig = require('./webpack.dev.conf')

const generateConfig = env => {
  // js处理
  const scriptLoader = ['babel-loader'].concat(
    env === 'production' ? [] : [{
      loader: 'eslint-loader',
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }]
  )

  // 样式处理
  const cssLoaders = [{
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: env === 'development'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: env === 'development',
        plugins: [require('postcss-cssnext')()].concat(
          env === 'production' ?
          require('postcss-sprites')({
            spritePath: 'dist/assets/imgs/sprites', // 精灵图输出位置
            retina: true // 处理两倍图片的大小
          }) : []
        )
      }
    }
  ]
  const styleLoader =
    env === 'production' ? [MiniCssExtractPlugin.loader].concat(cssLoaders) : [{
      loader: 'style-loader'
    }].concat(cssLoaders)

  // 文件处理
  const fileLoader =
    env === 'production' ? [{
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].[ext]',
        limit: 8197,
        outputPath: 'assets/imgs/'
      }
    }] : [{
      loader: 'file-loader',
      options: {
        name: '[name]-[hash:5].[ext]',
        outputPath: 'assets/imgs/'
      }
    }]
  const htmlLoader = env === 'production' ? [{
    // 处理html中图片
    loader: 'html-url-loader',
    options: {
      deep: true
    }
  }] : []
  return {
    // 入口文件
    entry: {
      app: './src/app.js'
    },
    // 输出文件
    output: {
      path: resolve(__dirname, './../dist'),
      publicPath: '/',
      filename: 'js/[name]-bundle-[chunkhash:5].js'
    },
    // 加载本地第三方js库
    // resolve: {
    //   alias: {
    //     jQuery$: resolve(__dirname, './../src/libs/jquery.js')
    //   }
    // },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: [resolve(__dirname, './../src/libs')],
          include: [resolve(__dirname, './../src')],
          use: scriptLoader
        },
        {
          test: /\.less$/,
          use: styleLoader.concat({
            loader: 'less-loader',
            options: {
              sourceMap: env === 'development'
            }
          })
        },
        {
          test: /\.css$/,
          use: styleLoader
        },
        {
          test: /\.(jpg|jpeg|png|gif)$/,
          use: fileLoader.concat(
            env === 'production' ? {
              loader: 'img-loader', // 压缩图片
              options: {
                pngquant: { // png图片适用
                  quality: 80
                }
              }
            } : []
          )
        },
        {
          test: /\.(eot|woff2?|ttf|svg|otf)$/,
          use: fileLoader
        }, {
          test: /\.html$/,
          use: htmlLoader
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name]-bundle-[hash:5].css'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        minify: {
          collapseWhitespace: true
        },
        chunksSortMode: 'none'
      }),
      // 所有页面都会引入变量，不用再import引入
      new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash'
      }),
      // 长缓存优化
      new webpack.NamedChunksPlugin(),
      new webpack.NamedModulesPlugin()
    ]
    // performance: {
    //   hints: 'warning', // 枚举
    //   maxAssetSize: 30000000, // 整数类型（以字节为单位）
    //   maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    //   assetFilter: function (assetFilename) {
    //     // 提供资源文件名的断言函数
    //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    //   }
    // }
  }
}

module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env), config)
}

// eslint-friendly-formatter 可以让eslint的错误信息出现在终端上
