import Popup from './popup.vue'
import createAPI from '../common/js/create-api'

const addPopup = (Vue, Popup) => {
  createAPI(Vue, Popup, ['mask-click'], true)
}

Popup.install = function (Vue) {
  Vue.component(Popup.name, Popup)
  addPopup(Vue, Popup)
}

export default Popup
