const config = require('./webpack.app')
const OpenPack = require('openpack')

config.watch = true
config.plugins.push(new OpenPack({ lan: true }))
config.devServer = {
  noInfo: true,
  host: '0.0.0.0',
  port: '13456',
  contentBase: './static'
}

module.exports = config
