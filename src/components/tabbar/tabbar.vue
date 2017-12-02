<template>
  <div class="x-tabbar" :class="{
      'is-fixed': fixed
    }">
    <slot></slot>
  </div>
</template>

<script>
const COMPONENT_NAME = 'tabbar'

export default {
  name: COMPONENT_NAME,
  props: {
    fixed: Boolean,
    value: {}
  }
}
</script>

<style lang="less">
  @import '../../styles/theme/default.less';
  .x {
    &-tabbar {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      background-color: @tabbar-bgc;
      background-size: 100% 1px; /*no*/
      background-repeat: no-repeat;
      background-position: top left;
      &.is-fixed {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
      }
      > .x-tab-item.is-selected {
        background-color: #fff;
        color: @color-tabbar-active;
      }
    }
  }
</style>
