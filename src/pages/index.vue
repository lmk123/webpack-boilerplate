<template>
  <div id="page-index">
    <div class="images">
      <div>
        <img src="../assets/webpack.png" alt="Webpack logo">
      </div>
      <div>
        <img src="../assets/vue.png" alt="Vue.js logo">
      </div>
    </div>
    <h3>Hello Webpack and Vue.js</h3>
    <p>
      Learn more on <a href="https://github.com/lmk123/webpack-boilerplate"><span class="icon-github-circled"></span>lmk123/webpack-boilerplate</a>
    </p>
  </div>
</template>

<style lang="scss" type="text/scss">
  #page-index {
    margin-top: 200px;

    img {
      max-width: 100%;
    }

    text-align: center;

    .images {
      width: 400px;
      margin: 30px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div {
        flex-basis: 45%;
      }
    }
  }
</style>
