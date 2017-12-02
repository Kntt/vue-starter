/* ========================== mint-ui ============================ */
import Vue from 'vue'
import { Button } from 'mint-ui'

let components = [
  Button
]

components.forEach(component => {
  Vue.component(component.name, component)
})
