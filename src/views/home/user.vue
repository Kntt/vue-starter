<template>
  <div>
    <mt-header fixed>
      <mt-button icon="add" slot="right"></mt-button>
    </mt-header>
    <div class="page">
      我的
    </div>
  </div>
</template>

<script>
import mtHeader from '@/components/header'
export default {
  name: 'user',
  components: {
    mtHeader
  }
}
</script>

<style scoped>
</style>
