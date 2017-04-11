var webpackBaseConfig = require('./webpack.base.config')
var webpack = require('webpack')
var utils = require('./utils')
var merge = require('webpack-merge')
var config = require('./config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var opn = require('opn')

module.exports = merge(webpackBaseConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.sourceMap })
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.absolutePath(config.htmlTemplate)
    }),
    {
      apply: function (compiler) {
        compiler.plugin('done', function doneCb (stats) {
          var cbs = stats.compilation.compiler._plugins['done']
          cbs.splice(cbs.indexOf(doneCb), 1)

          function getURI (host) {
            return 'http://' + host + ':' + config.dev.port
          }

          opn(getURI('localhost'))

          if (config.dev.externally) {
            console.log('Project also available on:')
            var ifaces = require('os').networkInterfaces()
            for (var key in ifaces) {
              ifaces[key].forEach(obj => {
                var address = obj.address
                if (obj.family === 'IPv4' && address !== '127.0.0.1') {
                  console.log('  ' + getURI(address))
                }
              })
            }
          }
        })
      }
    }
  ],
  devServer: {
    contentBase: utils.absolutePath(config.staticRoot),
    noInfo: true,
    port: config.dev.port,
    host: config.dev.externally ? '0.0.0.0' : 'localhost',
    proxy: config.dev.proxy
  }
})
