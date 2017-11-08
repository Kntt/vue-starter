// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as utils from './utils/tool'
import './mintUI'
/* 全局样式 定义主题 */
import './styles/index.less'

Vue.config.productionTip = false

Vue.prototype.$deviceInfo = utils.getDeviceInfo()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function (event) {
  var element = event.target
  var tags = {
    'INPUT': 1,
    'TEXTAREA': 1
  }
  if ((element.tagName in tags)) {
    setTimeout(function () {
      element.scrollIntoViewIfNeeded()
    }, 400)
  }
}, false)
