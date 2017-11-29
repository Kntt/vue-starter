<template>
  <transition name="action-sheet-fade">
    <popup
      type="action-sheet"
      :class="{'action-sheet_picker': pickerStyle}"
      :center="false"
      :mask="true"
      v-show="isVisible"
      @touchmove.prevent="noop"
      @click="cancel">
      <transition name="action-sheet-move">
        <div class="action-sheet-panel" v-show="isVisible" @click.stop="noop">
          <h1 class="action-sheet-title border-bottom-1px" v-show="pickerStyle || title">{{title}}</h1>
          <div class="action-sheet-content">
            <ul class="action-sheet-list">
              <li
                class="action-sheet-item border-bottom-1px"
                v-for="(item, index) in data"
                :data-align="item.align"
                :class="[
                  item.class || '',
                  index === active ? 'action-sheet-item_active': ''
                ]"
                v-html="item.content"
                @click="itemClick(item, index)"></li>
            </ul>
          </div>
          <div class="action-sheet-space"></div>
          <div class="action-sheet-cancel" @click="cancel"><span>取消</span></div>
        </div>
      </transition>
    </popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Popup from '../popup/popup.vue'
  import apiMixin from '../common/mixins/api'
  const COMPONENT_NAME = 'action-sheet'
  const EVENT_SELECT = 'select'
  const EVENT_CANCEL = 'cancel'
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
      active: {
        type: Number,
        default: -1
      },
      title: {
        type: String,
        default: ' '
      },
      pickerStyle: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      noop () {
      },
      cancel () {
        this.hide()
        this.$emit(EVENT_CANCEL)
      },
      itemClick (item, index) {
        this.hide()
        this.$emit(EVENT_SELECT, item, index)
      }
    },
    components: {
      Popup
    }
  }
</script>

<style lang="less">
  .action-sheet-fade-enter, .action-sheet-fade-leave-active {
    opacity: 0;
  }
  .action-sheet-fade-enter-active, .action-sheet-fade-leave-active {
    transition: all .3s ease-in-out;
  }
  .action-sheet-panel {
    text-align: center;
    font-size: 14px; /*no*/
  }
  .action-sheet-move-enter, .action-sheet-move-leave-active {
    transform: translate3d(0, 100%, 0);
  }
  .action-sheet-move-enter-active, .action-sheet-move-leave-active {
    transition: all .3s ease-in-out;
  }
  .action-sheet-cancel {
    background-color: #fff;
  }
  .action-sheet-cancel span, .action-sheet-title, .action-sheet-item {
    display: block;
    padding: 17px 16px; /*no*/
    margin: 0;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px; /*no*/
    font-weight: normal;
    line-height: 1;
    color: #666;
    background-color: #fff;
  }
  .action-sheet-cancel span, .action-sheet-item {
    &:active {
      background-color: rgba(0, 0, 0, .04);
    }
  }
  .action-sheet-title {
    padding-top: 16px; /*no*/
    padding-bottom: 16px; /*no*/
    color: #333;
    font-size: 18px; /*no*/
  }
  .action-sheet-content {
    overflow: hidden;
    background: #fff;
  }
  .action-sheet-list {
    list-style: none;
  }
  .action-sheet-item{
    list-style: none;
    user-select: none;
    &:last-of-type {
      // border-none
      &::before, &::after {
        display: none;
      }
    }
    &[data-align="left"] {
      text-align: left;
    }
    &[data-align="right"] {
      text-align: right;
    }
  }
  .action-sheet-space {
    height: 6px; /*no*/
  }
  .action-sheet-item_active {
    color: #0B97FF;
  }
  .action-sheet_picker {
    .action-sheet-space {
      height: 0;
    }
    .action-sheet-title {
      height: 1em;
      padding-top: 21px; /*no*/
      padding-bottom: 21px; /*no*/
    }
    .action-sheet-cancel {
      position: absolute;
      top: 0;
      background-color: transparent;
      span {
        padding-top: 23px;
        padding-bottom: 23px;
        color: #999;
        font-size: 14px; /*no*/
        background-color: transparent;
        &:active {
          color: #ccc;
          background-color: transparent;
        }
      }
    }
  }
</style>
