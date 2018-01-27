<template>
  <transition name="image-crop-fade">
    <popup
      type="image-crop"
      :center="false"
      :mask="false"
      v-show="isVisible"
      @touchmove.prevent="noop"
      @click="cancel">
      <transition name="image-crop-move">
        <div class="image-crop-panel" v-show="isVisible" @click.stop="noop">
          <canvas ref="cover" :width="coverWidth" :height="coverHeight" :style="style"></canvas>
          <div class="image-crop-btns border-top-1px">
            <a :href="_cancelBtn.href" class="image-crop-btn" :class="{'btn_highlight': _cancelBtn.active}" @click="cancel">{{_cancelBtn.text}}</a>
            <a :href="_confirmBtn.href" class="image-crop-btn" :class="{'btn_highlight': _confirmBtn.active}" @click="confirm">{{_confirmBtn.text}}</a>
          </div>
        </div>
      </transition>
    </popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Popup from '../popup/popup.vue'
  import apiMixin from '../common/mixins/api'
  const COMPONENT_NAME = 'image-crop'
  const EVENT_CONFIRM = 'confirm'
  const EVENT_CANCEL = 'cancel'
  const defHref = 'javascript:;'
  const defConfirmBtn = {
    text: '完成',
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
      width: {
        type: Number,
        default: 300
      },
      height: {
        type: Number,
        default: 300
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
        coverWidth: window.innerWidth,
        coverHeight: window.innerHeight
      }
    },
    methods: {
      noop () {
      },
      cancel () {
        this.hide()
        this.$emit(EVENT_CANCEL)
      },
      confirm (item, index) {
        this.hide()
        this.$emit(EVENT_CONFIRM, item, index)
      },
      renderCover () {
        const cover = this.$refs.cover
        let ctx = cover.getContext('2d')
        let w = cover.width
        let h = cover.height
        let cw = this.width
        let ch = this.height
        ctx.save()
        ctx.fillStyle = 'black'
        ctx.globalAlpha = 0.7
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        if (this.circle) {
          ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false)
        } else {
          ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
        }
        ctx.fill()
        ctx.restore()
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        if (this.circle) {
          ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false)
        } else {
          ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
        }
        ctx.stroke()
      }
    },
    computed: {
      _confirmBtn () {
        return parseBtn(this.confirmBtn, defConfirmBtn)
      },
      _cancelBtn () {
        return parseBtn(this.cancelBtn, defCancelBtn)
      },
      style () {
        return `width:${this.coverWidth}px;height:${this.coverHeight}px;z-index:100`
      }
    },
    mounted () {
      this.renderCover()
    },
    components: {
      Popup
    }
  }
</script>

<style lang="less">
  .image-crop-fade-enter, .image-crop-fade-leave-active {
    opacity: 0;
  }
  .image-crop-fade-enter-active, .image-crop-fade-leave-active {
    transition: all .3s ease-in-out;
  }
  .image-crop-panel {
    text-align: center;
    font-size: 14px; /*no*/
  }
  .image-crop-move-enter, .image-crop-move-leave-active {
    transform: translate3d(0, 100%, 0);
  }
  .image-crop-move-enter-active, .image-crop-move-leave-active {
    transition: all .3s ease-in-out;
  }
  .image-crop {
    &-panel {
      background-color: #000;
    }
    &-btns {
      display: flex;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 20px; /*no*/
      padding: 20px 15px; /*no*/
      justify-content: space-between;
      z-index: 101;
      .image-crop-btn {
        line-height: 20px; /*no*/
        text-decoration: none;
        &.btn_highlight {
          color: #0082e2;
        }
      }
    }
  }
</style>
