const webpack = require('webpack')
const config = require('./webpack.vendor')
const fs = require('fs')
const path = require('path')

webpack(config, function (err, stats) {
  if (err) {
    throw err
  }

  // 记录 vendor 里打包出来的文件，AddVendorToApp 插件会用到
  const filesName = stats.toJson({
    assetsByChunkName: true
  }).assetsByChunkName.vendor

  const manifestJson = require('../vendor-manifest.json')
  manifestJson.filesName = filesName
  fs.writeFileSync(path.resolve(__dirname, '../vendor-manifest.json'), JSON.stringify(manifestJson))
})
