import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layout/Home'
import HelloWorld from '@/views/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/office',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'office',
          name: 'Dashboard',
          component: HelloWorld
        }
      ]
    }
  ]
})
