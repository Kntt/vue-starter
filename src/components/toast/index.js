import Loading from '../loading'
import Toast from './toast.vue'
import createAPI from '../common/js/create-api'

const addToast = (Vue, Toast) => {
  const toast = createAPI(Vue, Toast, [], true)
  const types = ['loading', 'correct', 'error', 'warn']
  types.forEach(type => {
    toast[type] = function (config) {
      config.type = type
      return toast.create(config)
    }
  })
}

Toast.install = function (Vue) {
  Vue.component(Loading.name, Loading)
  Vue.component(Toast.name, Toast)
  addToast(Vue, Toast)
}

Toast.Loading = Loading

export default Toast
