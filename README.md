# Webpack Boilerplate

这是我自用的一套 Webpack 项目模版，特点有：

 - 真正的做到了分离 vendor 与 app。详情见[我的这篇博文](https://github.com/lmk123/blog/issues/47)
 - 简单易用的开发命令：
  - `npm start`: 打开一个代码更改时自动刷新的网页
  - `npm run dev`：生成未经压缩也没有带 hash 的静态文件到 `dist` 目录
  - `npm run build`: 生成压缩并带上 hash 的静态文件到 `dist` 目录
  - `npm run lint`: 使用 [StandardJS](http://standardjs.com/) 的规则检查代码（包括 `*.vue` 文件）
 - 自带贴心功能：css autoprefix、复制静态文件到输出目录等。

详细情况可自行查看 `build` 目录下的 webpack 配置。

## 分离 vendor.js 与 app.js

将需要打包至 vendor.js 里的模块列在 `build/webpack.vendor.js` 的 `entry` 配置里即可。

## 许可

MIT
