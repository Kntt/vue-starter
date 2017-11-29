import TimePicker from './time-picker.vue'
import createAPI from '../common/js/create-api'

const addTimePicker = (Vue, TimePicker) => {
  const timePickerAPI = createAPI(Vue, TimePicker, ['select', 'cancel', 'change'])
  timePickerAPI.before((data, renderFn, single) => {
    if (single) {
      console.warn('TimePicker component can not be a singleton.')
    }
  })
}

TimePicker.install = function (Vue) {
  Vue.component(TimePicker.name, TimePicker)
  addTimePicker(Vue, TimePicker)
}

export default TimePicker
