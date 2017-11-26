<template>
  <div>
    <mt-header title="通讯录" fixed>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <container :data="list">
      <ul class="contacts-list">
        <li class="contacts-item border-bottom-1px" v-for="item in list">{{item}}</li>
      </ul>
    </container>
  </div>
</template>

<script>
export default {
  name: 'contacts',
  data () {
    return {
      list: ['item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item']
    }
  }
}
</script>

<style scoped>
</style>
