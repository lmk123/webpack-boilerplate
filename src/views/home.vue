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

<style lang="sass" rel="stylesheet/scss">
  html {
    body {
      color: red;
    }
  }
</style>
