<template>
  <header
    class="nav-header border-bottom-1px"
    :class="{ 'is-fixed': fixed, 'is-ios': ios }">
    <div class="nav-header-button is-left">
      <slot name="left"></slot>
    </div>
    <h1 class="nav-header-title">
      {{ title }}
    </h1>
    <div class="nav-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
/**
 * 重写Mini-UI Header 来实现更多自定义效果
 * 增加ios 增加顶部高度
 */
export default {
  name: 'nav-header',
  props: {
    fixed: Boolean,
    title: String
  },
  computed: {
    ios () {
      return this.$deviceInfo.ios
    }
  }
}
</script>

<style lang="less">
  @import '../../styles/theme/default.less';
  .nav {
    &-header {
      align-items: center;
      background-color: @header-bgc;
      box-sizing: border-box;
      color: @color-text;
      display: flex;
      font-size: 18px; /*no*/
      height: 44px; /*no*/
      line-height: 1;
      padding: 0 10px; /*no*/
      position: relative;
      text-align: center;
      white-space: nowrap;
      .mint-button {
        background-color: transparent;
        border: 0;
        box-shadow: none;
        color: inherit;
        display: inline-block;
        padding: 0;
        font-size: inherit;
        &::after {
          content: none;
        }
      }
      &-button {
        flex: .5;
        > a {
          color: inherit;
        }
        &.is-left {
          text-align: left;
        }
        &.is-right {
          text-align: right;
        }
      }
      &-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: inherit;
        font-weight: normal;
        flex: 1;
      }
      &.is-fixed {
        top: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
      }
      &.is-ios{
        height: 64px; /*no*/
        /* Status bar height on iOS 10 */
        padding-top: 20px; /*no*/
        /* Status bar height on iOS 11.0 */
        padding-top: constant(safe-area-inset-top);
        /* Status bar height on iOS 11+ */
        padding-top: env(safe-area-inset-top);
      }
    }
  }
</style>
