<template>
  <button
    :type="nativeType"
    class="x-button"
    :class="['x-button--' + type, 'x-button--' + size, {
      'is-disabled': disabled,
      'is-plain': plain
    }]"
    @click="handleClick"
    :disabled="disabled">
    <span class="x-button-icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <icon v-if="icon" :icon="icon" size="16"/>
      </slot>
    </span>
    <label class="x-button-text"><slot></slot></label>
  </button>
</template>

<script>
import Icon from '../icon/icon.vue'

const COMPONENT_NAME = 'x-button'
export default {
  name: COMPONENT_NAME,
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  },
  props: {
    icon: String,
    disabled: Boolean,
    nativeType: String,
    plain: Boolean,
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return [
          'default',
          'danger',
          'primary'
        ].indexOf(value) > -1
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator (value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1
      }
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="less">
  @import '../../styles/theme/default.less';
  .x {
    &-button {
      appearance: none;
      border-radius: 4px; /*no*/
      border: 0;
      box-sizing: border-box;
      color: inherit;
      display: block;
      font-size: 18px; /*no*/
      height: 41px; /*no*/
      outline: 0;
      overflow: hidden;
      position: relative;
      text-align: center;
      &::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      &:not(.is-disabled):active::after {
        opacity: .2;
      }
      &-icon {
        font-size: 0;
        vertical-align: middle;
        display: inline-block;
      }
      &--default {
        color: @button-default-color;
        background-color: @button-default-background-color;
        box-shadow: @button-default-box-shadow;
        &.is-plain {
          border: 1px solid @button-default-plain-color; /*no*/
          background-color: transparent;
          box-shadow: none;
          color: @button-default-plain-color;
        }
      }
      &--primary {
        color: @button-primary-color;
        background-color: @button-primary-background-color;
        &.is-plain {
          border: 1px solid @button-primary-background-color; /*no*/
          background-color: transparent;
          color: @button-primary-background-color;
        }
      }
      &--danger {
        color: @button-danger-color;
        background-color: @button-danger-background-color;
        &.is-plain {
          border: 1px solid @button-danger-background-color; /*no*/
          background-color: transparent;
          color: @button-danger-background-color;
        }
      }
      &--large {
        display: block;
        width: 100%;
      }
      &--normal {
        display: inline-block;
        padding: 0 12px; /*no*/
      }
      &--small {
        display: inline-block;
        font-size: 14px; /*no*/
        padding: 0 12px; /*no*/
        height: 33px; /*no*/
      }
      &.is-disabled {
        opacity: .6;
      }
    }
  }
</style>