import retina from './common/retina'
import header from './header'
import Tabbar from './tabbar'
import Button from './button'
import container from './container'
import slide from './slide'
import popup from './popup'
import toast from './toast'
import modal from './modal'
import picker from './picker'
import timePicker from './time-picker'
import actionSheet from './action-sheet'
import icon from './icon'

const components = [
  header,
  Tabbar,
  Button,
  container,
  slide,
  popup,
  toast,
  modal,
  picker,
  timePicker,
  actionSheet,
  icon
]

const install = function (Vue) {
  if (install.installed) {
    return
  }
  components.forEach(component => {
    component.install(Vue)
  })
  retina()
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
