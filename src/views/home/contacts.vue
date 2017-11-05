<template>
  <div>
    <mt-header title="通讯录" fixed>
      <mt-button icon="add" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import mtHeader from '@/components/header'
export default {
  name: 'contacts',
  components: {
    mtHeader
  }
}
</script>

<style scoped>
</style>
