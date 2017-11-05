<template>
  <div>
    <mt-header title="消息" fixed>
      <mt-button icon="add" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import mtHeader from '@/components/header'
export default {
  name: 'message',
  components: {
    mtHeader
  }
}
</script>

<style scoped>
</style>
