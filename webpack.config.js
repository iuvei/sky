const path = require('path')
const os = require('os')
const { resolve } = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pkgInfo = require('./package.json')
const url = require('url')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('styles/[name]-one.css')
// const extractLESS = new ExtractTextPlugin('styles/[name]-two.css')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = (options = {}) => {
  const config = require('./config/' +
    (process.env.npm_config_config || options.config || 'default'))

  const plugins = [
    new HtmlWebpackPlugin({
      favicon: 'assets/favicon.ico',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new HappyPack({
      id: 'js',
      // threads: os.cpus().length,
      threadPool: happyThreadPool,
      loaders: ['babel-loader?compact=false&cacheDirectory=true']
    }),
    new HappyPack({
      id: 'scss',
      threadPool: happyThreadPool,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }),
    new HappyPack({
      id: 'vue',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'style-loader!css-loader!sass-loader',
              sass: 'style-loader!css-loader!sass-loader?indentedSyntax'
            }
          }
        }
      ]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 2
    }),
    extractCSS,
    // extractLESS,
    new webpack.DefinePlugin({
      DEBUG: Boolean(options.dev),
      VERSION: JSON.stringify(pkgInfo.version),
      CONFIG: JSON.stringify(config.runtimeConfig)
    }),
    // new webpack.ProvidePlugin({
    //   introJs: ['intro.js', 'introJs']
    // }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets'),
        to: './assets',
        ignore: ['.*']
      }
    ])
  ]
  if (!options.dev) {
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // new tinyPngWebpackPlugin({
    //   key: 'bO1eLnXzWu8xRuzIgSBGOXarq0Ft6PDD', // can be Array, eg:['your key 1','your key 2'....]
    //   ext: ['png', 'jpeg', 'jpg'],
    //   proxy: '' // img ext name
    //   // proxy: 'http://user:pass@192.168.0.1:8080' // http proxy,eg:如果你来自中国，同时拥有shadowsocks，翻墙默认配置为 http:127.0.0.1:1080 即可。（注，该参数因为需要超时断开连接的原因，导致最后会延迟执行一会webpack。但相对于国内网络环境，用此参数还是非常划算的，测试原有两张图片，无此参数耗时2000ms+，有此参数耗时1000ms+节约近半。）
    // })
    // new ParallelUglifyPlugin({
    //   workerCount: os.cpus().length,
    //   uglifyJS: {
    //     output: {
    //       beautify: false, // 不需要格式化
    //       comments: false // 保留注释
    //     },
    //     compress: {
    //       warnings: false, // 删除无用代码时不输出警告
    //       drop_console: true, // 删除console语句
    //       collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
    //       reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
    //     }
    //   }
    // })
    // new ParallelUglifyPlugin({
    //   workerCount: os.cpus().length,
    //   uglifyES: {
    //     output: {
    //       beautify: false, // 不需要格式化
    //       comments: false // 保留注释
    //     },
    //     compress: {
    //       warnings: false, // 删除无用代码时不输出警告
    //       drop_console: true, // 删除console语句
    //       collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
    //       reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
    //     }
    //   }
    // })
    // const CompressionWebpackPlugin = require('compression-webpack-plugin')

    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

    plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          comments: false,
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: true,
        parallel: true
      })
    )
    // plugins.push(
    //   new CompressionWebpackPlugin({
    //     asset: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
    //     threshold: 10240,
    //     minRatio: 0.8
    //   })
    // )
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/img/audio'),
          to: path.resolve(__dirname, 'dist/img/audio')
        }
      ])
    )
    // plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
    // if (process.argv.includes('report')) {
    //   plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8889 }))
    // }
    plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 9999 }))
  }
  return {
    cache: true,
    devtool: options.dev ? 'eval-source-map' : 'source-map',
    entry: {
      vendor: ['babel-polyfill'],
      app: './src/index'
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: options.dev ? 'js/[name].js' : 'js/[name].js?[chunkhash]',
      chunkFilename: 'js/[name].[chunkhash].js?[chunkhash]',
      publicPath: config.publicPath
    },
    externals: {
      // vue: 'Vue'
    },
    module: {
      noParse: [/dayjs.js/],
      rules: [
        {
          test: /\.vue$/,
          loader: ['happypack/loader?id=vue']
          // use: [
          //   {
          //     loader: 'vue-loader',
          //     options: {
          //       loaders: {
          //         scss: 'style-loader!css-loader!sass-loader',
          //         sass: 'style-loader!css-loader!sass-loader?indentedSyntax'
          //       }
          //     }
          //   },
          //   'eslint-loader'
          // ]
        },

        {
          test: /\.js$/,
          // exclude: /node_modules/,
          include: [
            resolve('src'),
            resolve('test'),
            resolve('api'),
            resolve('server'),
            resolve('./node_modules/vue-introjs/src')
          ],
          // use: ['babel-loader', 'eslint-loader']
          loader: ['happypack/loader?id=js']
        },

        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                root: resolve(__dirname, 'src'),
                attrs: ['link:href']
              }
            }
          ]
        },

        {
          test: /\.css$/,
          use: options.dev
            ? ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
            : extractCSS.extract(['css-loader', 'postcss-loader'])
        },
        {
          test: /\.scss$/,
          // use: options.dev
          //   ? ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
          //   : extractLESS.extract([
          //     'css-loader',
          //     'sass-loader',
          //     'postcss-loader'
          //   ])
          loader: ['happypack/loader?id=scss']
        },
        {
          test: /favicon\.(ico|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                // name: '[name].[ext]?[hash:7]'
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /manifest\.json$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                // name: '[name].[ext]?[hash:7]'
                name: '[name].[ext]'
              }
            }
          ]
        },
        // {
        //   test: /\.json$/,
        //   loader: 'json-loader'
        // },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins,

    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.css'],
      alias: {
        '~': resolve(__dirname, 'src'),
        vue: !options.dev ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
        css: resolve(__dirname, 'src/css'),
        js: resolve(__dirname, 'src/js'),
        img: resolve(__dirname, 'src/img'),
        dayjs: 'dayjs/dayjs.min.js',
        ydui: 'vue-ydui/dist/ydui.rem.js'
        // lodash: 'lodash/lodash.min.js'
      }
    },

    devServer: config.devServer
      ? {
        host: '0.0.0.0',
        port: config.devServer.port,
        proxy: config.devServer.proxy,
        historyApiFallback: {
          index: url.parse(config.publicPath).pathname,
          disableDotRule: true
        }
      }
      : undefined,

    performance: {
      hints: options.dev ? false : 'warning'
    }
  }
}
