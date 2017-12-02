<template>
  <transition name="toast-fade">
    <popup type="toast" :mask="mask" v-show="isVisible">
      <icon v-show="!isLoading" class="toast-icon" :icon="iconName"></icon>
      <loading v-show="isLoading"></loading>
      <div v-show="txt" class="toast-tip">{{txt}}</div>
    </popup>
  </transition>
</template>
<script>
  import Loading from '../loading/loading.vue'
  import Popup from '../popup/popup.vue'
  import Icon from '../icon/icon.vue'
  import apiMixin from '../common/mixins/api'

  const COMPONENT_NAME = 'toast'

  export default {
    name: COMPONENT_NAME,
    mixins: [apiMixin],
    props: {
      type: {
        type: String,
        default: 'loading'
      },
      mask: {
        type: Boolean,
        default: false
      },
      txt: {
        type: String,
        default: ''
      },
      time: {
        type: Number,
        default: 3000
      }
    },
    computed: {
      iconName () {
        const classMap = {
          correct: 'correct-fill',
          error: 'close-fill',
          warn: 'tip-fill'
        }
        return classMap[this.type] || ''
      },
      isLoading () {
        return this.type === 'loading'
      }
    },
    methods: {
      show () {
        this.isVisible = true
        this.clearTimer()
        this.$nextTick(() => {
          if (this.time !== 0) {
            this.timer = setTimeout(() => {
              this.hide()
            }, this.time)
          }
        })
      },
      hide () {
        this.isVisible = false
        this.clearTimer()
      },
      clearTimer () {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    components: {
      Popup,
      Loading,
      Icon
    }
  }
</script>
<style lang="less">
  .toast {
    &.popup {
      z-index: 900;
    }
    .popup-content {
      display: flex;
      align-items: center;
      padding: 13px 16px; /*no*/
      color: #ccc;
      background-color: rgba(37, 38, 45, 0.9);
      border-radius: 2px;
    }
  }
  .toast-icon {
    width: 24px; /*no*/
    height: 24px; /*no*/
    color: #ccc;
  }
  .toast-tip {
    line-height: 20px; /*no*/
    font-size: 14px; /*no*/
    max-width: 12em; /*no*/
    max-height: 40px; /*no*/
    overflow: hidden;
    margin-left: 8px; /*no*/
  }
  .toast-fade-enter-active {
    animation: toast-in .2s;
  }
  .toast-fade-leave-active {
    animation: toast-out .2s;
  }

  @keyframes toast-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes toast-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
