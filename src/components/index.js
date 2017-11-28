import retina from './common/retina'
import header from './header'
import container from './container'
import slide from './slide'
import popup from './popup'
import toast from './toast'
import modal from './modal'

const components = [
  header,
  container,
  slide,
  popup,
  toast,
  modal
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
