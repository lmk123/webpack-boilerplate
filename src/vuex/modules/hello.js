export default {
  mutations: {
    'Set Value' (state, hello) {
      state.value = hello
    }
  },
  state: {
    value: 'world'
  }
}
