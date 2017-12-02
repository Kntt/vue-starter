<template>
  <div class="mint-tabbar" :class="{
      'is-fixed': fixed
    }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'mt-tabbar',
  props: {
    fixed: Boolean,
    value: {}
  }
}
</script>

<style lang="less">
  @import '../../styles/theme/default.less';
  .mint {
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
      > .mint-tab-item.is-selected {
        background-color: #fff;
        color: @color-tabbar-active;
      }
    }
  }
</style>
