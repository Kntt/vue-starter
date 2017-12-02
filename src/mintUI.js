/* ========================== mint-ui ============================ */
import Vue from 'vue'
import { Button, Tabbar, TabItem } from 'mint-ui'

let components = [
  Button,
  Tabbar,
  TabItem
]

components.forEach(component => {
  Vue.component(component.name, component)
})
