const webpack = require('webpack')
const config = require('./webpack.vendor')
const fs = require('fs')
const path = require('path')

webpack(config, function (err, stats) {
  if (err) {
    throw err
  }

  // 记录 vendor 里打包出来的文件，AddVendorToApp 插件会用到
  const assets = stats.toJson({
    assets: true
  }).assets

  const manifestJson = require('../vendor-manifest.json')
  manifestJson.assets = assets
  fs.writeFileSync(path.resolve(__dirname, '../vendor-manifest.json'), JSON.stringify(manifestJson))
})
