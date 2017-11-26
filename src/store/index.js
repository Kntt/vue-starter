import Vue from 'vue'
import Vuex from 'vuex'

// root
import mutations from './mutations'
import actions from './action'

// modules contacts
import contacts from './contacts'

Vue.use(Vuex)

const state = {
  world: []
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    contacts
  }
})
