<template>
  hello {{helloValue}}.
</template>

<script>
  import { helloValue } from '../vuex/getters'
  export default {
    vuex: {
      getters: {
        helloValue
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  html {
    body {
      color: red;
    }
  }
</style>
