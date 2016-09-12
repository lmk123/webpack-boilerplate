# Webpack Boilerplate

这是我自用的一套 Webpack 项目模版，特点有：

 - 真正的做到了分离 vendor 与 app
 - 简单易用的开发命令：
  - `npm start`: 打开一个代码更改时自动刷新的网页
  - `npm run build`: 生成压缩并带 hash 的静态文件
  - `npm run lint`: 使用 [StandardJS](http://standardjs.com/) 的规则检查代码（包括 `*.vue` 文件）
 - 自带贴心功能：css autoprefix、复制静态文件到输出目录等。

详细情况可自行查看 `build` 目录下的 webpack 配置。

## 许可

MIT
