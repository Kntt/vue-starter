<template>
  <div class="hello">
    <mt-header title="小凡" fixed>
      <mt-button icon="add" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import mtHeader from '@/components/header'
export default {
  name: 'HelloWorld',
  components: {
    mtHeader
  }
}
</script>

<style scoped>
</style>
