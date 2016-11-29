import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hello: 'Vue.js'
  },
  getters: {
    getHello (state) {
      return state.hello
    }
  }
})

