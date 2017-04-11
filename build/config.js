module.exports = {
  staticRoot: 'static',
  htmlTemplate: 'src/index.ejs',
  fileLimit: 2000, // 小于 2KB 的文件会被转换成 Data URI 内嵌在文件中
  build: {
    assetsRoot: 'dist',
    publicPath: '',
    sourceMap: true,
    env: {
      NODE_ENV: '"production"'
    },
    analyzer: false
  },
  dev: {
    port: 8080,
    proxy: {},
    sourceMap: true,
    externally: true,
    env: {
      NODE_ENV: '"development"'
    }
  }
}
