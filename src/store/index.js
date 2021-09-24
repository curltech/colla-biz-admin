import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: null,
  mutations: {
    resetState (state) {
      state = null
    }
  },
  actions: {

  },
  modules: {

  },
  getters: {}
})

export default store
