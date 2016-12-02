const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin')
const path = require('path')
const IS_PRODUCTION = !!process.env.PRODUCTION

// https://github.com/kangax/html-minifier#options-quick-reference
const htmlMinifierOptions = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  // vue-html-loader 默认设为了 true。设为 false 是为了让 html-minifier 不要在元素之间保留一个空格
  conservativeCollapse: false,
  removeAttributeQuotes: true,
  removeScriptTypeAttributes: true,
  removeStyleTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

const config = {
  entry: './src/index',
  output: {
    path: './dist',
    filename: IS_PRODUCTION ? '[name].[chunkhash:7].js' : '[name].js',
    chunkFilename: IS_PRODUCTION ? '[chunkhash:7].js' : '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.(woff2?|ttf|svg|eot)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: IS_PRODUCTION ? '[name].[hash:7].[ext]' : '[name].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
      }
    ]
  },
  postcss: function () {
    return [require('autoprefixer')()]
  },
  vue: {
    postcss: [require('autoprefixer')()],
    loaders: {
      // 不要给 .vue 文件开启 css-loader 的 sourceMap，
      // 因为异步加载 vue 组件时 sourceMap 会被内嵌在异步加载的 chunk 中导致文件变大
      // https://github.com/webpack/css-loader#sourcemaps
      css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!postcss-loader'),
      sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!postcss-loader!sass-loader')
    }
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new CopyWebpackPlugin([{ from: 'static' }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunksSortMode: 'dependency',
      minify: IS_PRODUCTION ? htmlMinifierOptions : false
    }),
    new ExtractTextPlugin(IS_PRODUCTION ? '[name].[contenthash:7].css' : '[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: IS_PRODUCTION ? '"production"' : '"development"'
      }
    })
  ],
  devtool: '#source-map'
}

if (IS_PRODUCTION) {
  config.vue.html = htmlMinifierOptions
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          // 这里会把从 node_modules 里加载的 js 及 css 从 app 里抽离出来变成 vendor.js 与 vendor.css
          /\.(js|css)$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // http://webpack.github.io/docs/list-of-plugins.html#3-move-common-modules-into-the-parent-chunk
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 2
    })
  )
}

module.exports = config
