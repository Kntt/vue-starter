<template>
  <div>
    <nav-header title="打卡" fixed>
      <x-button @click="$router.back()" icon="arrow-left" slot="left"></x-button>
      <x-button icon="calendar" slot="right"></x-button>
    </nav-header>
  </div>
</template>

<script>
export default {
  name: 'office'
}
</script>

<style scoped>
</style>
