import Vue from 'vue'
import Vuex from 'vuex'
import dataserver from './dataserver'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dataserver
  }
})
