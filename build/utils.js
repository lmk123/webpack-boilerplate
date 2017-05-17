var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var IS_PRODUCTION = process.env.NODE_ENV === 'production'

exports.absolutePath = function (prePath) {
  return path.resolve(__dirname, '..', prePath)
}

exports.cssLoaders = getCssLoaders

function getCssLoaders (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: IS_PRODUCTION,
      sourceMap: options.sourceMap
    }
  }

  /**
   * 生成 loader 配置
   * @param {string} [ext]
   * @param {object} [loaderOptions]
   * @return {Array}
   */
  function generateLoader (ext, loaderOptions) {
    // vue-loader 会自动给 .vue 文件中的 <style> 块应用 postcss-loader，
    // 但当直接在项目中引用 CSS 文件时就不会，所以
    // 这里统一加上 postcss-loader
    var loaders = [
      cssLoader,
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: options.sourceMap
        }
      }
    ]

    if (ext) {
      loaders.push({
        loader: ext + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 生产环境时将所有 .vue 中的 CSS 合并成一个单独的 main.css
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoader(),
    less: generateLoader('less'), // 需要单独安装 less-loader
    sass: generateLoader('sass'),
    scss: generateLoader('sass'),
    stylus: generateLoader('stylus') // 需要单独安装 stylus-loader
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = getCssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.enableOffline = function (webpackConfig) {
  webpackConfig.plugins.push(new (require('offline-plugin'))({
    safeToUseOptionalCaches: true,
    caches: {
      main: IS_PRODUCTION
        // TODO 这里写成 / 其实对相对路径的站点很不友好，需要加一波文档
        ? ['/', '**/@(manifest|vendor|main).*.js', '**/@(main|vendor).*.css']
        : ['/', 'main.js'],
      // additional 里的匹配会自动去除 main 里已经匹配到的文件
      additional: ['**/*.@(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)', '**/*.js']
    },
    externals: ['/'],
    excludes: ['**/*.map'],
    // 如果网站用的是 History API 模式则需要取消下面的注释
    // https://github.com/NekR/offline-plugin/blob/master/docs/cache-maps.md
    // cacheMaps: [
    //   {
    //     match: function () {
    //       return new URL('/', location)
    //     },
    //     requestTypes: ['navigate']
    //   }
    // ],
    ServiceWorker: {
      events: true,
      // 假设我们的网站部署在 https://www.mysite.com/ 下，
      // 但 webpack 的 publicPath 设置成了另一个域名（比如 https://cdn.mysite.com/），
      // 那默认就会请求 CDN 域名下的 sw 文件（https://cdn.mysite.com/sw.js），
      // 但 sw.js 只能从部署域名下请求，
      // 所以这里需要覆盖 publicPath 值，
      // 让 sw.js 永远从 https://www.mysite.com/sw.js 获取
      publicPath: 'sw.js'
    },
    AppCache: false
  }))
}
