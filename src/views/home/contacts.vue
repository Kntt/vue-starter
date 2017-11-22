<template>
  <div>
    <mt-header title="通讯录" fixed>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <container :data="list">

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
