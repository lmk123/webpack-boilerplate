const path = require('path')
const fs = require('fs')

module.exports = AddVendorToApp

function AddVendorToApp (vendorName) {
  this.vendorName = vendorName
}

AddVendorToApp.prototype.apply = function (compiler) {
  const vendorName = this.vendorName

  const vendorFilesContent = vendorName.map(function (filename) {
    return fs.readFileSync(path.resolve(__dirname, '../dist', filename), 'utf8')
  })

  // 如果有用到 html-webpack-plugin 则将文件加入到 assets 里面去
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      const assets = htmlPluginData.assets
      vendorName.forEach(function (filename) {
        var type = fileType(filename)
        if (!type) return
        assets[type].unshift(assets.publicPath + filename)
      })
      callback(null, htmlPluginData)
    })
  })

  compiler.plugin('emit', function (compilation, next) {
    vendorName.forEach(function (filename, i) {
      compilation.assets[filename] = {
        source: function () {
          return vendorFilesContent[i]
        },
        size: function () {
          return vendorFilesContent[i].length
        }
      }
    })

    next()
  })
}

function fileType (filename) {
  if (filename.endsWith('.css')) {
    return 'css'
  }
  if (filename.endsWith('.js')) {
    return 'js'
  }
  return null
}
