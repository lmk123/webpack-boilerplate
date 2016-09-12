const webpack = require('webpack')
const config = require('./webpack.vendor')
const fs = require('fs')
const path = require('path')

webpack(config, function (err, stats) {
  if (err) {
    throw err
  }
  const vendorName = stats.toJson({
    assetsByChunkName: true
  }).assetsByChunkName.vendor

  const manifestJson = require('../vendor-manifest.json')
  manifestJson.filename = vendorName
  fs.writeFileSync(path.resolve(__dirname, '../vendor-manifest.json'), JSON.stringify(manifestJson))
})
