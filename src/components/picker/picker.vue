<template>
  <transition name="picker-fade">
    <popup
        type="picker"
        :mask="true"
        :center="false"
        v-show="isVisible"
        @touchmove.prevent
        @mask-click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="isVisible" @click.stop>
          <div class="picker-choose border-bottom-1px">
            <span data-action="cancel" @click="cancel">{{cancelTxt}}</span>
            <span data-action="confirm" @click="confirm">{{confirmTxt}}</span>
            <h1>{{title}}</h1>
          </div>
          <div class="picker-content">
            <i class="border-bottom-1px"></i>
            <i class="border-top-1px"></i>
            <div class="picker-wheel-wrapper" ref="wheelWrapper">
              <div v-for="data in pickerData">
                <ul class="wheel-scroll">
                  <li v-for="item in data" class="wheel-item">{{item.text}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="picker-footer"></div>
        </div>
      </transition>
    </popup>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Popup from '../popup/popup.vue'
  import apiMixin from '../common/mixins/api'
  const COMPONENT_NAME = 'picker'
  const EVENT_SELECT = 'select'
  const EVENT_VALUE_CHANGE = 'value-change'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CHANGE = 'change'
  export default {
    name: COMPONENT_NAME,
    mixins: [apiMixin],
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      title: {
        type: String
      },
      cancelTxt: {
        type: String,
        default: '取消'
      },
      confirmTxt: {
        type: String,
        default: '确定'
      },
      selectedIndex: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        pickerData: this.data.slice(),
        pickerSelectedIndex: this.selectedIndex
      }
    },
    created () {
      this.pickerSelectedVal = []
      if (!this.pickerSelectedIndex.length) {
        this.pickerSelectedIndex = []
        for (let i = 0; i < this.pickerData.length; i++) {
          this.pickerSelectedIndex[i] = 0
        }
      }
    },
    methods: {
      confirm () {
        if (!this._canConfirm()) {
          return
        }
        this.hide()
        let changed = false
        let pickerSelectedText = []
        for (let i = 0; i < this.pickerData.length; i++) {
          let index = this.wheels[i].getSelectedIndex()
          this.pickerSelectedIndex[i] = index
          let value = null
          let text = ''
          if (this.pickerData[i].length) {
            value = this.pickerData[i][index].value
            text = this.pickerData[i][index].text
          }
          if (this.pickerSelectedVal[i] !== value) {
            changed = true
          }
          this.pickerSelectedVal[i] = value
          pickerSelectedText[i] = text
        }
        this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, pickerSelectedText)
        if (changed) {
          this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, pickerSelectedText)
        }
      },
      cancel () {
        this.hide()
        this.$emit(EVENT_CANCEL)
      },
      show () {
        if (this.isVisible) {
          return
        }
        this.isVisible = true
        if (!this.wheels || this.dirty) {
          this.$nextTick(() => {
            this.wheels = []
            let wheelWrapper = this.$refs.wheelWrapper
            for (let i = 0; i < this.pickerData.length; i++) {
              this._createWheel(wheelWrapper, i)
            }
            this.dirty = false
          })
        } else {
          for (let i = 0; i < this.pickerData.length; i++) {
            this.wheels[i].enable()
            this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
          }
        }
      },
      hide () {
        if (!this.isVisible) {
          return
        }
        this.isVisible = false
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].disable()
        }
      },
      setData (data, selectedIndex) {
        this.pickerSelectedIndex = selectedIndex ? [...selectedIndex] : []
        this.pickerData = data.slice()
        this.dirty = true
      },
      refill (datas) {
        let ret = []
        if (!datas.length) {
          return ret
        }
        datas.forEach((data, index) => {
          ret[index] = this.refillColumn(index, data)
        })
        return ret
      },
      refillColumn (index, data) {
        const wheelWrapper = this.$refs.wheelWrapper
        let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
        let wheel = this.wheels ? this.wheels[index] : false
        let dist = 0
        if (scroll && wheel) {
          let oldData = this.pickerData[index]
          this.$set(this.pickerData, index, data)
          let selectedIndex = wheel.getSelectedIndex()
          if (oldData.length) {
            let oldValue = oldData[selectedIndex].value
            for (let i = 0; i < data.length; i++) {
              if (data[i].value === oldValue) {
                dist = i
                break
              }
            }
          }
          this.pickerSelectedIndex[index] = dist
          this.$nextTick(() => {
            // recreate wheel so that the wrapperHeight will be correct.
            wheel = this._createWheel(wheelWrapper, index)
            wheel.wheelTo(dist)
          })
        }
        return dist
      },
      scrollTo (index, dist) {
        const wheel = this.wheels[index]
        this.pickerSelectedIndex[index] = dist
        wheel.wheelTo(dist)
      },
      refresh () {
        this.$nextTick(() => {
          this.wheels.forEach((wheel) => {
            wheel.refresh()
          })
        })
      },
      _createWheel (wheelWrapper, i) {
        if (!this.wheels[i]) {
          const wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
            wheel: {
              selectedIndex: this.pickerSelectedIndex[i] || 0
            }
          })
          wheel.on('scrollEnd', () => {
            this.$emit(EVENT_CHANGE, i, wheel.getSelectedIndex())
          })
        } else {
          this.wheels[i].refresh()
        }
        return this.wheels[i]
      },
      _canConfirm () {
        return this.wheels.every((wheel) => {
          return !wheel.isInTransition
        })
      }
    },
    watch: {
      data (newData) {
        this.setData(newData, this.selectedIndex)
      }
    },
    components: {
      Popup
    }
  }
</script>

<style lang="less">
  .picker-fade-enter, .picker-fade-leave-active {
    opacity: 0;
  }
  .picker-fade-enter-active, .picker-fade-leave-active {
    transition: all .3s ease-in-out;
  }
  .picker-panel {
    height: 273px; /*no*/
    text-align: center;
    font-size: 14px; /*no*/
    background: #fff;
  }
  .picker-move-enter, .picker-move-leave-active {
    transform: translate3d(0, 273px, 0); /*no*/
  }
  .picker-move-enter-active, .picker-move-leave-active {
    transition: all .3s ease-in-out;
  }
  .picker-choose {
    position: relative;
    height: 60px; /*no*/
    > span {
      position: absolute;
      top: 6px; /*no*/
      padding: 16px 16px; /*no*/
      font-size: 14px; /*no*/
    }
    > [data-action="confirm"] {
      right: 0;
      color: #0B97FF;
      &:active {
        color: #0082E2;
      }
    }
    > [data-action="cancel"] {
      left: 0;
      color: #999;
      &:active {
        color: #ccc;
      }
    }
    > h1 {
      margin: 0;
      line-height: 60px; /*no*/
      text-align: center;
      font-weight: normal;
      font-size: 18px; /*no*/
      color: #333;
    }
  }
  .picker-content {
    position: relative;
    top: 20px; /*no*/
    > i {
      position: absolute;
      z-index: 10;
      left: 0;
      width: 100%;
      height: 68px; /*no*/
      pointer-events: none;
      transform: translateZ(0);
    }
    > .border-bottom-1px {
      top: 0;
      background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    }
    > .border-top-1px {
      bottom: 1px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    }
  }
  .picker-wheel-wrapper {
    display: flex;
    padding: 0 16px; /*no*/
    > div {
      flex: 1;
      flex-basis: 0.000000001px; /*no*/
      width: 1%;
      height: 173px; /*no*/
      overflow: hidden;
      font-size: 20px; /*no*/
    }
  }
  .wheel-scroll {
    padding: 0;
    margin-top: 68px; /*no*/
    line-height: 36px; /*no*/
    list-style: none;
    > li {
      list-style: none;
      height: 36px; /*no*/
      overflow: hidden;
      white-space: nowrap;
      color: #333;
    }
  }
  .picker-footer {
    height: 20px; /*no*/
  }
</style>