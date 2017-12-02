<template>
  <a class="mint-tab-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="mint-tab-item-icon"><slot name="icon"></slot></div>
    <div class="mint-tab-item-label"><slot></slot></div>
  </a>
</template>

<script>
export default {
  name: 'mt-tab-item',
  props: ['id']
}
</script>

<style lang="less">
  .mint {
    &-tab-item {
      display: block;
      padding: 7px 0 8px; /*no*/
      flex: 1;
      text-decoration: none;
      &-icon {
        width: 24px; /*no*/
        height: 24px; /*no*/
        margin: 5px auto 4px; /*no*/
        &:empty {
          display: none;
        }
        & > * {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      &-label {
        color: inherit;
        font-size: 10px; /*no*/
        line-height: 1;
      }
    }
  }
</style>
