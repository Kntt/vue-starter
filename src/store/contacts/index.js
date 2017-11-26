import mutations from './mutations'
import actions from './action'

const state = {
  currentNode: '',
  list: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
