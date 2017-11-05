import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layout/Home'
import office from '@/views/home/office'
import contacts from '@/views/home/contacts'
import message from '@/views/home/message'
import user from '@/views/home/user'

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
          component: office
        },
        {
          path: 'contacts',
          name: 'contactsIndex',
          component: contacts
        },
        {
          path: 'message',
          name: 'messageIndex',
          component: message
        },
        {
          path: 'user',
          name: 'userIndex',
          component: user
        }
      ]
    }
  ]
})
