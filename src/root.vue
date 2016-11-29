<template>
  <router-view></router-view>
</template>

<script>
  import store from './store'
  import router from './router'
  export default {
    router,
    store
  }
</script>
