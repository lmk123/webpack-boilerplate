const IS_PRODUCTION = !!process.env.PRODUCTION

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: {
    vendor: ['vue', 'vue-router', 'vuex', 'fastclick', 'lodash', 'normalize.css/normalize.css']
  },
  output: {
    path: './dist',
    filename: IS_PRODUCTION ? '[name].[chunkhash:7].js' : '[name].js',
    library: 'vendor_lib'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: './vendor-manifest.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: IS_PRODUCTION ? '"production"' : '"development"'
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin(IS_PRODUCTION ? '[name].[contenthash:7].css' : '[name].css')
  ]
}

if (IS_PRODUCTION) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config

