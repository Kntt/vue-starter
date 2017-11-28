import Dialog from './dialog.vue'
import createAPI from '../common/js/create-api'

const addDialog = (Vue, Dialog) => {
  createAPI(Vue, Dialog, ['confirm', 'cancel', 'close', 'btn-click', 'link-click'], true)
}

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog)
  addDialog(Vue, Dialog)
}

export default Dialog
