import Picker from './picker.vue'
import createAPI from '../common/js/create-api'

const addPicker = (Vue, Picker) => {
  const pickerAPI = createAPI(Vue, Picker, ['select', 'value-change', 'cancel', 'change'])
  pickerAPI.before((data, renderFn, single) => {
    if (single) {
      console.warn('Picker component can not be a singleton.')
    }
  })
}
Picker.install = function (Vue) {
  Vue.component(Picker.name, Picker)
  addPicker(Vue, Picker)
}

export default Picker
