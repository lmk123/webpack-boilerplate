# Webpack Boilerplate

顾名思义，这是一套 Webpack 项目模版。

你可以访问[在线演示地址](https://lmk123.github.io/webpack-boilerplate)查看这个项目最终生成的文件结构。

## 特点

 - 真正的做到了分离 vendor 与 app。详情见[我的这篇博文](https://github.com/lmk123/blog/issues/47)。
 - 提供简单易用的开发命令（见下文）
 - 自带贴心功能：
  - 使用 Babel 转换 ES2015 代码
  - CSS autoprefix
  - 复制静态文件到输出目录
  - 使用 eslint 检查代码风格

## 开始使用

 1. clone 这个项目到本地或者下载 zip 包并解压到工作目录
 2. 如果你有洁癖的话，删掉 package.json 的 `devDependencies` 里的 `gh-pages` 并删掉 `scripts.deploy` 命令。这个命令是我上传 demo 站点用的。
 3. 使用 NPM 3.0 及以上版本安装项目依赖 `npm i`
 4. 运行 `npm start`

## 使用手册

### 分离 vendor 与 app

这套模版会自动将从 `node_modules` 里引用的 js 和  css 打包至 vendor.js 与 vendor.css

### 提供的命令

 - `npm start`：打开一个代码更改时自动刷新的网页
 - `npm run dev`：生成未经压缩也没有带 hash 的静态文件到 `dist` 目录
 - `npm run build`：生成压缩过并带上 hash 的静态文件到 `dist` 目录
 - `npm run lint`：使用 [StandardJS](http://standardjs.com/) 的规则检查代码（包括 `*.vue` 文件）

### 注意事项

项目里配置了一个 .npmrc 文件用于从淘宝源下载代码，但如果你是想使用 `npm publish` 发布你的代码，记得先注释掉 .npmrc 里 registry 那一行。

.babaelrc 文件里没有配置 `transform-runtime` 插件，所以 polyfill 不会自动添加进来。你可以自行开启这个插件，或者手动添加 polyfill。

`static` 内的文件会原封不动的复制到 `dist` 目录下，适合放置一些与项目无关的文件，例如 robots.txt。

## 许可

MIT
