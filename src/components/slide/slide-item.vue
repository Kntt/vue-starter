<template>
  <div class="slide-item">
    <slot></slot>
  </div>
</template>

<script>
  const COMPONENT_NAME = 'slide-item'
  export default {
    name: COMPONENT_NAME
  }
</script>

<style lang="less">
  .slide-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    a {
      display: block;
      width: 100%;
      overflow: hidden;
      text-decoration: none;
    }
    img {
      display: block;
      width: 100%;
    }
  }
</style>
