/* ========================== mint-ui ============================ */
import Vue from 'vue'
import { Header, Button, Tabbar, TabItem } from 'mint-ui'

let components = [
  Header,
  Button,
  Tabbar,
  TabItem
]

components.forEach(component => {
  Vue.component(component.name, component)
})
