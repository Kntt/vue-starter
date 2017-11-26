<template>
  <component :is="currentView"/>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import contactList from './contacts-list'
function creatListView (data) {
  return {
    name: contactList.name,
    render (createElement) {
      return createElement(contactList, { props: { data } })
    }
  }
}

export default {
  name: 'contacts',
  // data () {
  //   return {
  //     data: ['前站业务线', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item']
  //   }
  // },
  mounted () {
    this.getContacts()
  },
  methods: {
    ...mapActions('contacts', ['getContacts'])
  },
  computed: {
    ...mapState('contacts', ['list', 'currentNode']),
    currentView () {
      return creatListView(this.data)
    },
    data () {
      if (this.currentNode) {
        let arr = this.list.filter((v, k) => {
          return k === this.currentNode
        })
        return arr[0].children
      } else {
        return this.list
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .contacts {
    &-item {
      display: flex;
      padding: 12px 15px;
      font-size: 16px;
      line-height: 36px;
      &-icon {
        width: 36px;
        height: 36px;
      }
      &-text {
        flex: 1;
        padding-left: 15px;
      }
      &-tip {
        color: #bbb;
      }
    }
  }
</style>
