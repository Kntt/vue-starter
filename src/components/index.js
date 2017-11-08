import header from './header'
import container from './container'

const components = [
  header,
  container
]

const install = function (Vue) {
  if (install.installed) {
    return
  }

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
