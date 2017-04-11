import 'normalize.css/normalize.css'
import './assets/fontello/css/fontello.css'
import './stylesheets/global.scss'

import Vue from 'vue'
import App from './app.vue'

document.body.appendChild(new Vue(App).$mount().$el)
