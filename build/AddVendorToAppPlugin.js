/**
 * 这个插件的作用是将 webpack.vendor 里打包出来的文件加入到 webpack.app 的打包过程中
 */

const path = require('path')
const fs = require('fs')

module.exports = AddVendorToApp

function AddVendorToApp (filesName) {
  this.filesName = filesName
}

AddVendorToApp.prototype.apply = function (compiler) {
  const filesName = this.filesName
  const filesContent = filesName.map(function (filename) {
    return fs.readFileSync(path.resolve(__dirname, '../dist', filename), 'utf8')
  })

  // 如果有用到 html-webpack-plugin 则将文件加入到 assets 里面去
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      const assets = htmlPluginData.assets
      filesName.forEach(function (filename) {
        var type = getFileType(filename)
        if (!type) return
        assets[type].unshift(assets.publicPath + filename)
      })
      callback(null, htmlPluginData)
    })
  })

  // 将 vendor 里打包出来的文件 emit 到 app 的打包过程里，
  // 这样使用 webpack-dev-server 的时候它会自动将这些文件写入 memoryFileSystem 中
  compiler.plugin('emit', function (compilation, next) {
    filesName.forEach(function (filename, i) {
      const content = filesContent[i]
      compilation.assets[filename] = {
        source: function () {
          return content
        },
        size: function () {
          return content.length
        }
      }
    })

    next()
  })
}

/**
 * 根据文件名的后缀判断文件类型
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
