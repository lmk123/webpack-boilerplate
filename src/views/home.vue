<template>
  <div>
    hello {{getHello}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters(['getHello'])
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  html {
    body {
      color: red;
    }
  }
</style>
