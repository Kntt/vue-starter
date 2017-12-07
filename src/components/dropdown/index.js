import Dropdown from './dropdown.vue'
import createAPI from '../common/js/create-api'

const addDropdown = (Vue, Dropdown) => {
  createAPI(Vue, Dropdown, ['select', 'cancel'], true)
}

Dropdown.install = function (Vue) {
  Vue.component(Dropdown.name, Dropdown)
  addDropdown(Vue, Dropdown)
}

export default Dropdown
