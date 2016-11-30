/**
 * 这个插件的作用是将 webpack.vendor 里打包出来的文件加入到 webpack.app 的打包过程中
 */

const path = require('path')
const fs = require('fs')

module.exports = AddVendorToApp

function AddVendorToApp (assets) {
  this.assets = assets
}

AddVendorToApp.prototype.apply = function (compiler) {
  const assets = this.assets

  // 如果有用到 html-webpack-plugin 则将文件加入到 assets 里面去
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      const htmlAssets = htmlPluginData.assets
      assets.forEach(function (asset) {
        var filename = asset.name
        var type = getFileType(filename)
        if (!type) return
        htmlAssets[type].unshift(htmlAssets.publicPath + filename)
      })
      callback(null, htmlPluginData)
    })
  })

  // 将 vendor 里打包出来的文件 emit 到 app 的打包过程里，
  // 这样使用 webpack-dev-server 的时候它会自动将这些文件写入 memoryFileSystem 中。
  // assets 里可能不仅仅只有 js 或 css，还可能有其他类型的文件如 png、woff 等
  compiler.plugin('emit', function (compilation, next) {
    assets.forEach(function (asset) {
      var filename = asset.name
      compilation.assets[filename] = {
        source: function () {
          return fs.readFileSync(path.resolve(__dirname, '../dist', filename))
        },
        size: function () {
          return asset.size
        }
      }
    })

    next()
  })
}

/**
 * 根据文件名的后缀判断文件类型。
 * 只判断 css 与 js，其余一律返回 null。
 * @param {String} filename
 * @return {String|null}
 */
function getFileType (filename) {
  if (filename.endsWith('.css')) {
    return 'css'
  }
  if (filename.endsWith('.js')) {
    return 'js'
  }
  return null
}
