# Webpack Boilerplate

你可以访问[在线演示地址](https://lmk123.github.io/webpack-boilerplate)查看这个项目最终生成的文件结构。

这是我自用的一套 Webpack 项目模版，特点有：

 - 真正的做到了分离 vendor 与 app。详情见[我的这篇博文](https://github.com/lmk123/blog/issues/47)。
 - 简单易用的开发命令：
   - `npm start`：打开一个代码更改时自动刷新的网页
   - `npm run dev`：生成未经压缩也没有带 hash 的静态文件到 `dist` 目录
   - `npm run build`：生成压缩并带上 hash 的静态文件到 `dist` 目录
   - `npm run lint`：使用 [StandardJS](http://standardjs.com/) 的规则检查代码（包括 `*.vue` 文件）
   - `npm run deploy`：请删掉它 :joy:
 - 自带贴心功能：css autoprefix、复制静态文件到输出目录等。

详细情况可自行查看 `build` 目录下的 webpack 配置。

如果你勤快的话，记得运行 `npm un gh-pages -D` 并删掉 package.json 里的 `scripts.deploy` 命令，这条命令是我发布 demo 站点用的。

## 分离 vendor 与 app

将需要打包至 vendor 里的模块列在 [build/webpack.vendor.js](/build/webpack.vendor.js#L10) 的 `entry` 配置里即可，支持分离 vendor 内的 css 文件。

## 许可

MIT
