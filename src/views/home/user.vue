<template>
  <div>
    <mt-header fixed>
      <mt-button icon="add" slot="right"></mt-button>
    </mt-header>
    <container>
      我的
    </container>
  </div>
</template>

<script>
import mtHeader from '@/components/header'
import container from '@/components/container'
export default {
  name: 'user',
  components: {
    mtHeader, container
  }
}
</script>

<style scoped>
</style>
