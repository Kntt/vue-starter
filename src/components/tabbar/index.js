import Tabbar from './tabbar.vue'
import TabbarItem from './tabbar-item.vue'

Tabbar.install = function (Vue) {
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabbarItem.name, TabbarItem)
}

Tabbar.Item = TabbarItem

export default Tabbar
