const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AddVendorToPlugin = require('./AddVendorToAppPlugin')
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
  entry: {
    app: './src/index'
  },
  output: {
    path: './dist',
    filename: IS_PRODUCTION ? '[name].[chunkhash:7].js' : '[name].js'
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
        test: /\.(woff2?|ttf|svg|eot|png|jpg|jepg|gif|bmp)(\?\S*)?$/,
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
        loader: 'vue-html-loader'
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
    return [require('autoprefixer')]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader'),
      scss: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('../vendor-manifest.json')
    }),
    new AddVendorToPlugin(require('../vendor-manifest.json').assets),
    new CopyWebpackPlugin([{ from: 'static' }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  )
}

module.exports = config
