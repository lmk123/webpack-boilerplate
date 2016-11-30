# Webpack Boilerplate

顾名思义，这是一套 Webpack 项目模版。

你可以访问[在线演示地址](https://lmk123.github.io/webpack-boilerplate)查看这个项目最终生成的文件结构。

## 特点

 - 真正的做到了分离 vendor 与 app。详情见[我的这篇博文](https://github.com/lmk123/blog/issues/47)。
 - 简单易用的开发命令：
   - `npm start`：打开一个代码更改时自动刷新的网页
   - `npm run dev`：生成未经压缩也没有带 hash 的静态文件到 `dist` 目录
   - `npm run build`：生成压缩并带上 hash 的静态文件到 `dist` 目录
   - `npm run lint`：使用 [StandardJS](http://standardjs.com/) 的规则检查代码（包括 `*.vue` 文件）
   - `npm run deploy`：请删掉它 :joy:
 - 自带贴心功能：css autoprefix、复制静态文件到输出目录等。

## 开始使用

 1. clone 这个项目到本地或者下载 zip 包并解压到工作目录
 2. 如果你有洁癖的话，删掉 package.json 的 `devDependencies` 里的 `gh-pages` 并删掉 `scripts.deploy` 命令。这个命令是我上传 demo 站点用的。
 3. 使用 NPM 3.0 及以上版本安装项目依赖 `npm i`
 4. 运行 `npm start`

## 使用手册

### 分离 vendor 与 app

将需要打包至 vendor 里的模块列在 [build/webpack.vendor.js](/build/webpack.vendor.js#L10) 的 `entry` 配置里即可，支持分离 vendor 内的 css 文件。

这套模版会自动帮你处理 css 里引用到的静态文件（使用 file-loader），如果你需要自行处理特定静态文件，请更改 build/webpack.vendor.js 里的 loader。

### 提供的命令

 - `npm start`：打开一个代码更改时自动刷新的网页
 - `npm run dev`：生成未经压缩也没有带 hash 的静态文件到 `dist` 目录
 - `npm run build`：生成压缩并带上 hash 的静态文件到 `dist` 目录
 - `npm run lint`：使用 [StandardJS](http://standardjs.com/) 的规则检查代码（包括 `*.vue` 文件）

### 注意事项

**记得更改 build/webpack.vendor.js 里的 entry 配置！**

项目里配置了一个 .npmrc 文件用于从淘宝源下载代码，但如果你是想使用 `npm publish` 发布你的代码，记得先注释掉 .npmrc 里 registry 那一行。

.babaelrc 文件关闭了 `transform-runtime` 的自动添加 polyfill 的功能，如果需要可以开启。

`static` 内的文件会原封不动的复制到 `dist` 目录下，适合放置一些与项目无关的文件，例如 robots.txt。

## 许可

MIT
