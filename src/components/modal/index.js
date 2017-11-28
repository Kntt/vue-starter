import Modal from './modal.vue'
import createAPI from '../common/js/create-api'

const addModal = (Vue, Modal) => {
  createAPI(Vue, Modal, ['confirm', 'cancel', 'close', 'btn-click', 'link-click'], true)
}

Modal.install = function (Vue) {
  Vue.component(Modal.name, Modal)
  addModal(Vue, Modal)
}

export default Modal
