import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('./pages/index.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./pages/404.vue')
    }
  ]
})

export default router
