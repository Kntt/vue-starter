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
        <div ref="croppingBox" class="image-crop-panel" v-show="isVisible" @click.stop="noop" :style="style">
          <img ref="image" :src="imageSource" @load="imageOnload" :style="imgStyle">
          <canvas ref="cover" :width="coverWidth" :height="coverHeight" :style="coverStyle"></canvas>
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
  import AlloyFinger from 'alloyfinger'
  import Transform from 'css3transform'
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
  const dataURLtoBlob = (dataUrl) => {
    let dataArr = dataUrl.split(',')
    let type = dataArr[0].match(/:(.*?);/)[1]
    let binStr = atob(dataArr[1])
    let len = binStr.length
    let arr = new Uint8Array(len)

    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i)
    }

    return new Blob([arr], {type})
  }
  export default {
    name: COMPONENT_NAME,
    mixins: [apiMixin],
    props: {
      width: {
        type: [Number, String],
        default: 300
      },
      height: {
        type: [Number, String],
        default: 300
      },
      img: {
        type: [File, String]
      },
      circle: {
        type: Boolean,
        default: false
      },
      output: {
        type: [Number, String],
        default: 2
      },
      type: {
        type: String,
        default: 'png'
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
        imageSource: '',
        imageWidth: 0,
        imageHeight: 0,
        canvas: '',
        ctx: '',
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
        this.crop()
        let dataUrl = this.canvas.toDataURL(`image/${this.type}`)
        this.$emit(EVENT_CONFIRM, dataUrl, dataURLtoBlob(dataUrl))
      },
      renderCover () {
        const cover = this.$refs.cover
        let ctx = cover.getContext('2d')
        let w = cover.width
        let h = cover.height
        let cw = this.width
        let ch = this.height
        ctx.clearRect(0, 0, w, h)
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
      },
      imageOnload () {
        let imageElement = this.$refs.image
        this.imageWidth = imageElement.width
        this.imageHeight = imageElement.height
        Transform(imageElement, true)
        let scalingX = window.innerWidth / this.imageWidth
        // let scalingY = window.innerHeight / this.imageHeight
        // let scaling = scalingX > scalingY ? scalingY : scalingX
        this.initScale = scalingX
        this.originScale = scalingX
        imageElement.scaleX = imageElement.scaleY = scalingX
        this.first = 1
        let self = this
        /* eslint-disable no-new */
        new AlloyFinger(this.$refs.croppingBox, {
          multipointStart: function (evt) {
            let centerX = (evt.touches[0].pageX + evt.touches[1].pageX) / 2
            let centerY = (evt.touches[0].pageY + evt.touches[1].pageY) / 2
            let cr = imageElement.getBoundingClientRect()
            let imgCenterX = cr.left + cr.width / 2
            let imgCenterY = cr.top + cr.height / 2
            let offX = centerX - imgCenterX
            let offY = centerY - imgCenterY
            let preOriginX = imageElement.originX
            let preOriginY = imageElement.originY
            imageElement.originX = offX / imageElement.scaleX
            imageElement.originY = offY / imageElement.scaleY
  
            imageElement.translateX += offX - preOriginX * imageElement.scaleX
            imageElement.translateY += offY - preOriginY * imageElement.scaleX
  
            if (self.first === 1) {
              imageElement.scaleX = imageElement.scaleY = self.initScale * 1.1
              ++self.first
            }

            self.initScale = imageElement.scaleX
          },
          pinch: function (evt) {
            let cr = imageElement.getBoundingClientRect()
            let boxOffY = (document.documentElement.clientHeight - self.height) / 2

            let tempo = evt.zoom
            let dw = (cr.width * tempo - cr.width) / 2
            let dh = (cr.height - cr.height * tempo) / 2
            if ((self.initScale * tempo <= 1.6) && (self.initScale * tempo >= self.originScale) && (dw >= cr.left) && (-dw <= (cr.right - self.width)) && (dh <= (boxOffY - cr.top)) && (dh <= (cr.bottom - boxOffY - self.height))) {
              imageElement.scaleX = imageElement.scaleY = self.initScale * tempo
            }
          },
          pressMove: function (evt) {
            let cr = imageElement.getBoundingClientRect()
            let boxOffY = (document.documentElement.clientHeight - self.height) / 2
            if ((cr.left + evt.deltaX <= 0) && (cr.right + evt.deltaX >= self.width)) {
              imageElement.translateX += evt.deltaX
            }
            if ((boxOffY - cr.top - evt.deltaY >= 0) && (cr.bottom + evt.deltaY - boxOffY >= self.height)) {
              imageElement.translateY += evt.deltaY
            }
            evt.preventDefault()
          }
        })
        this.renderCover()
      },
      setSourceImg () {
        if (typeof this.img === 'object') {
          let fr = new FileReader()
          fr.onload = (e) => {
            this.imageSource = fr.result
          }
          fr.readAsDataURL(this.img)
        } else {
          this.imageSource = this.img
        }
      },
      crop () {
        this.calculateRect()
        this.ctx.drawImage(this.$refs.image, this.cropRect[0], this.cropRect[1], this.cropRect[2], this.cropRect[3], 0, 0, this.cropRect[2] * this.$refs.image.scaleX, this.cropRect[3] * this.$refs.image.scaleY)
      },
      calculateRect () {
        let cr = this.$refs.image.getBoundingClientRect()
        let cLeft = window.innerWidth / 2 - this.width / 2
        let cTop = window.innerHeight / 2 - this.height / 2
        let coverRect = [cLeft, cTop, this.width + cLeft, this.height + cTop]
        let imgRect = [cr.left, cr.top, cr.width + cr.left, cr.height + cr.top]
        let intersectRect = this.getOverlap(...coverRect.concat(imgRect))
        let left = (intersectRect[0] - imgRect[0]) / this.$refs.image.scaleX
        let top = (intersectRect[1] - imgRect[1]) / this.$refs.image.scaleY
        let width = intersectRect[2] / this.$refs.image.scaleX
        let height = intersectRect[3] / this.$refs.image.scaleY

        if (left < 0) {
          left = 0
        }
        if (top < 0) {
          top = 0
        }
        if (left + width > this.imgWidth) {
          width = this.imgWidth - left
        }
        if (top + height > this.imgHeight) {
          height = this.imgHeight - top
        }

        this.cropRect = [left, top, width, height]
      },
      getOverlap (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
        if (ax2 < bx1 || ay2 < by1 || ax1 > bx2 || ay1 > by2) {
          return [0, 0, 0, 0]
        }
        let left = Math.max(ax1, bx1)
        let top = Math.max(ay1, by1)
        let right = Math.min(ax2, bx2)
        let bottom = Math.min(ay2, by2)
        return [left, top, right - left, bottom - top]
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
        return {
          width: `${this.coverWidth}px`,
          height: `${this.coverHeight}px`
        }
      },
      coverStyle () {
        return {
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${this.coverWidth}px`,
          height: `${this.coverHeight}px`,
          zIndex: 100
        }
      },
      imgStyle () {
        return {
          position: 'fixed',
          zIndex: 99,
          left: '50%',
          top: `${this.coverHeight / 2}px`,
          marginLeft: `${this.imageWidth / -2}px`,
          marginTop: `${this.imageHeight / -2}px`
        }
      }
    },
    updated () {
      this.setSourceImg()
      this.canvas = document.createElement('canvas')
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.ctx = this.canvas.getContext('2d')
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
