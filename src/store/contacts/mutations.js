import { UPDATE_CONTACTS, UPDATE_CURRENTNODE } from './types'

export default {
  [UPDATE_CONTACTS] (store, payload) {
    store.list = payload.val
  },
  [UPDATE_CURRENTNODE] (store, payload) {
    store.currentNode = payload.val
  }
}
