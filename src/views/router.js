const router = new VueRouter()

router.map({
  '/': {
    name: 'home',
    component: require('./home.vue')
  }
})

export default router
