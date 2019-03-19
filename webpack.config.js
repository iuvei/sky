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
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const edition = require('./config/edition.json').edition
process.env.edition = edition

const fileListPlugin = require('./plugin/sw')

module.exports = (options = {}) => {
  const config = require('./config/' +
    (process.env.npm_config_config || options.config || 'default'))
  process.env.edition = edition
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
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/img/audio'),
          to: path.resolve(__dirname, 'dist/img/audio')
        }
      ])
    )
    plugins.push(new fileListPlugin({ config: true }))
    // plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
    // if (process.argv.includes('report')) {
    //   plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8889 }))
    // }
    // plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 9999 }))
  }

  return {
    cache: true,
    devtool: options.dev ? 'source-map' : false,
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
        // {
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   include: [resolve('src')],
        //   options: {
        //     failOnError: true
        //   }
        // },
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
    // eslint: {
    //   failOnError: true, // eslint报error了就终止webpack编译
    //   cache: true // 开启eslint的cache，cache存在node_modules/.cache目录里
    // },
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
          host: '192.168.100.160',
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
