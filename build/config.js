module.exports = {
  staticRoot: 'static',
  htmlTemplate: 'src/index.ejs',
  fileLimit: 2000, // images and fonts less than 2KB will transform to Data URI by url-loader
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
    externally: false,
    env: {
      NODE_ENV: '"development"'
    }
  }
}
