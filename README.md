# Webpack With Vue.js Boilerplate

This is a Webpack + Vue.js boilerplate that heavy inspired by [vuejs-templates/webpack](https://github.com/vuejs-templates/webpack) with these features:

 - Apply [Autoprefixer](https://github.com/postcss/autoprefixer) outside of `.vue` components. See [vuejs-templates/webpack#600](https://github.com/vuejs-templates/webpack/issues/600) for more information.
 - Use [webpack-dev-server](https://github.com/webpack/webpack-dev-server) instead of custom develop server.
 - [Simple config](build/config.js).
 - Not lint-on-save with ESLint: run `npm run lint` instead. This make me easy to debug code temporary.
 - Use relative public path by default. See [vuejs-templates/webpack#200](https://github.com/vuejs-templates/webpack/issues/200) for more information.
 - Apply Babel plugins with [babel-preset-env](https://github.com/babel/babel-preset-env).
 - Use [HashedModuleIdsPlugin](https://github.com/webpack/webpack/blob/master/lib/HashedModuleIdsPlugin.js) to keep module ids consistent. See [vuejs-templates/webpack#406](https://github.com/vuejs-templates/webpack/issues/406) for more information.
 - Similar to JS, also split CSS to `vendor.css` and `main.css`.
 - Ready to use `import('./path/to/module')` syntax to [code-splitting](https://webpack.js.org/guides/code-splitting-import/).

...and other little improve.

## Usage

 1. Clone this template use [Git](https://git-scm.com/) or [download it](https://github.com/vuejs-templates/webpack/archive/master.zip).
 2. Install dependencies: `npm install`

Now you have three commands:

 - `npm start`
 - `npm run build`
 - `npm run lint`: Lint code with ESLint (use [JavaScript Standard Style](https://standardjs.com/) rules)

## Trouble-shooting

This boilerplate use [Sass](http://sass-lang.com/) by default so I specified `node-sass` and `sass-loader` in package.json, but if you want use [less](http://lesscss.org/) or [stylus](http://stylus-lang.com/), you need install then by yourself:

```
npm install less-loader --save-dev
npm install stylus-loader --save-dev
```

**FOR CHINESE USER:** 如果你在安装 `node-sass` 时遇到问题，请参考这篇文章解决：[安装 node-sass 的正确姿势](https://github.com/lmk123/blog/issues/28)
