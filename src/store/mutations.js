import { ADD_ECOSYSTEM } from './types'

export default {
  [ADD_ECOSYSTEM] (store, payload) {
    store.world = payload
  }
}
