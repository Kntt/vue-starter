<template>
  <header
    class="mint-header"
    :class="{ 'is-fixed': fixed, 'is-ios': ios }">
    <div class="mint-header-button is-left">
      <slot name="left"></slot>
    </div>
    <h1 class="mint-header-title">
      {{ title }}
    </h1>
    <div class="mint-header-button is-right">
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
  name: 'mt-header',
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