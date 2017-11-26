import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layout/Home'
import office from '@/views/home/office'
import contacts from '@/views/home/contacts/index'
import message from '@/views/home/message'
import user from '@/views/home/user'
import visa from '@/views/pages/visa'
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
          name: 'officeIndex',
          component: office,
          meta: {
            index: 0
          }
        },
        {
          path: 'contacts',
          name: 'contactsIndex',
          component: contacts,
          meta: {
            index: 1
          }
        },
        {
          path: 'message',
          name: 'messageIndex',
          component: message,
          meta: {
            index: 2
          }
        },
        {
          path: 'user',
          name: 'userIndex',
          component: user,
          meta: {
            index: 3
          }
        }
      ]
    },
    {
      path: '/visa',
      name: 'visaIndex',
      component: visa
    }
  ]
})
