import 'normalize.css/normalize.css'
import './assets/fontello/css/fontello.css'
import './assets/stylesheets/global.scss'

import Vue from 'vue'
import App from './app.vue'
import { install, applyUpdate } from 'offline-plugin/runtime'

install({
  onUpdateReady () {
    applyUpdate()
  },
  onUpdated () {
    window.location.reload()
  }
})

document.body.appendChild(new Vue(App).$mount().$el)
