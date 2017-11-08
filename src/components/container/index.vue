<template>
  <div class="container" :class="{'scroll': scroll}" :style="{'background-color': bg}">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    name: 'container',
    props: {
      bg: { // 背景色
        type: String,
        default: '#F9F9F9'
      },
      scroll: { // 溢出滚动
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    &.scroll {
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>