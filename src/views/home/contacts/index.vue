<template>
  <component :is="currentView"/>
</template>

<script>
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
  data () {
    return {
      list: ['前站业务线', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item']
    }
  },
  computed: {
    currentView () {
      return creatListView(this.list)
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
