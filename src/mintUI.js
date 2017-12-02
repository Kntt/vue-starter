/* ========================== mint-ui ============================ */
import Vue from 'vue'
import { Button, TabItem } from 'mint-ui'

let components = [
  Button,
  TabItem
]

components.forEach(component => {
  Vue.component(component.name, component)
})
