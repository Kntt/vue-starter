import retina from './common/retina'
import header from './header'
import container from './container'
import slide from './slide'

const components = [
  header,
  container,
  slide
]

const install = function (Vue) {
  if (install.installed) {
    return
  }
  components.forEach(component => {
    Vue.component(component.name, component)
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
