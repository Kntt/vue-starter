<template>
  <transition name="modal-fade">
    <popup type="modal" :mask="true" :center="true" v-show="isVisible">
      <div class="modal-main">
        <span class="modal-close" v-show="showClose" @click="close"><i class="cubeic-close"></i></span>
        <div :class="containerClass">
          <p class="modal-icon" v-if="icon"><i :class="icon"></i></p>
          <h2 v-if="title || $slots.title" class="modal-title">
            <slot name="title">
              <p class="modal-title-def">{{title}}</p>
            </slot>
          </h2>
          <div class="modal-content">
            <slot name="content">
              <div class="modal-content-def">
                <p v-html="content"></p>
              </div>
            </slot>
          </div>
          <div class="modal-btns" :class="{'border-right-1px': isConfirm}">
            <slot name="btns">
              <a :href="_cancelBtn.href" class="modal-btn border-top-1px" :class="{'modal-btn_highlight': _cancelBtn.active}" v-if="isConfirm" @click="cancel">{{_cancelBtn.text}}</a>
              <a :href="_confirmBtn.href" class="modal-btn border-top-1px" :class="{'modal-btn_highlight': _confirmBtn.active}" @click="confirm">{{_confirmBtn.text}}</a>
            </slot>
          </div>
        </div>
      </div>
    </popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Popup from '../popup/popup.vue'
  import apiMixin from '../common/mixins/api'
  const COMPONENT_NAME = 'modal'
  const EVENT_CONFIRM = 'confirm'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CLOSE = 'close'
  const defHref = 'javascript:;'
  const defConfirmBtn = {
    text: '确定',
    active: true,
    href: defHref
  }
  const defCancelBtn = {
    text: '取消',
    active: false,
    href: defHref
  }
  const parseBtn = (btn, defBtn) => {
    if (typeof btn === 'string') {
      btn = {
        text: btn
      }
    }
    return Object.assign({}, defBtn, btn)
  }
  export default {
    name: COMPONENT_NAME,
    mixins: [apiMixin],
    props: {
      type: {
        type: String,
        default: 'alert'
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: false
      },
      confirmBtn: {
        type: [Object, String],
        default () {
          return {
            ...defConfirmBtn
          }
        }
      },
      cancelBtn: {
        type: [Object, String],
        default () {
          return {
            ...defCancelBtn
          }
        }
      }
    },
    data () {
      return {
        defHref
      }
    },
    computed: {
      _confirmBtn () {
        return parseBtn(this.confirmBtn, defConfirmBtn)
      },
      _cancelBtn () {
        return parseBtn(this.cancelBtn, defCancelBtn)
      },
      isConfirm () {
        return this.type === 'confirm'
      },
      containerClass () {
        return `modal-${this.type}`
      }
    },
    methods: {
      confirm (e) {
        this.hide()
        this.$emit(EVENT_CONFIRM, e)
      },
      cancel (e) {
        this.hide()
        this.$emit(EVENT_CANCEL, e)
      },
      close (e) {
        this.hide()
        this.$emit(EVENT_CLOSE, e)
      }
    },
    components: {
      Popup
    }
  }
</script>

<style lang="less">
  .modal-main {
    width: 270px;
    padding: 0;
    text-align: center;
    overflow: hidden;
    border-radius: 2px; /*no*/
    background-color: #fff;
  }
  .modal-confirm, .modal-alert {
    position: relative;
    overflow: hidden;
  }
  .modal-icon {
    margin-top: 20px;
    margin-bottom: 16px;
    line-height: 1;
    color: #4a4c5b;
    font-size: 30px;
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      padding: 10px;
      border-radius: 50%;
      background-color: #f3f4f5;
    }
    + .modal-title {
      .modal-title-def {
        margin-top: 0;
      }
    }
    + .modal-content {
      margin-top: -4px;
    }
  }
  .modal-title {
    color: #333;
    font-size: 16px;
    line-height: 1;
    + .modal-content {
      margin-top: 12px;
    }
  }
  .modal-title-def {
    margin: 30px 16px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .modal-content {
    margin: 16px 0;
    text-align: left;
    color: #666;
    font-size: 14px;
    line-height: 22px;
  }
  .modal-content-def {
    padding: 0 16px;
    > p {
      display: table;
      margin: auto;
    }
  }
  .modal-confirm {
    .modal-btns {
      .modal-btn {
        width: 50%;
        float: left;
      }
      &.border-right-1px {
        &::after {
          right: 50%;
          border-color: #ebebeb;
        }
      }
    }
  }
  .icon-confirm {
    background-size: 262px 53px
  }
  .modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    color: #999;
    font-size: 18px;
  }
  .modal-btns {
    overflow: hidden;
    width: 100%;
    font-size: 0;
  }
  .modal-btn {
    display: inline-block;
    width: 100%;
    padding: 17px 10px;
    margin: 0;
    font-size: 16px;
    line-height: 1;
    text-align: center;
    text-decoration: none;
    color: #999;
    background-color: #fff;
    background-clip: padding-box;
    box-sizing: border-box;
    &:active {
      background-color: rgba(0, 0, 0, .04);
    }
  }
  .modal-btn_highlight {
    color: #4a4c5b;
    &:active {
      background-color: rgba(252, 145, 83, .04);
    }
  }
  .modal-btn_disabled {
    color: #999;
    &:active {
      background-color: transparent;
    }
  }
  .modal-fade-enter-active {
    animation: modal-fadein .4s;
    .modal-main {
      animation: modal-zoom .4s;
    }
  }
  @keyframes modal-fadein {
    0% {
      opacity: 0 
    }
    100% {
      opacity: 1 
    }
  }
  @keyframes modal-zoom {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(1.1)
    }
    100% {
      transform: scale(1)
    }
  }
</style>
