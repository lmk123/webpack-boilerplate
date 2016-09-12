const path = require('path')
const fs = require('fs')

module.exports = AddVendorToApp

function AddVendorToApp (vendorName) {
  this.vendorName = vendorName
}

AddVendorToApp.prototype.apply = function (compiler) {
  const vendorName = this.vendorName
  const vendor = fs.readFileSync(path.resolve(__dirname, '../dist', vendorName), 'utf8')

  // 如果有用到 html-webpack-plugin 则将文件加入到 assets 里面去
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      htmlPluginData.assets.js.unshift(vendorName)
      callback(null, htmlPluginData)
    })
  })

  compiler.plugin('emit', function (compilation, next) {
    compilation.assets[vendorName] = {
      source: function () {
        return vendor
      },
      size: function () {
        return vendor.length
      }
    }
    next()
  })
}
