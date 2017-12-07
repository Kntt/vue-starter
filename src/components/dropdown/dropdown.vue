<template>
  <transition name="dropdown-fade">
    <popup
      type="dropdown"
      :center="false"
      :mask="true"
      v-show="isVisible"
      @touchmove.prevent="noop"
      @mask-click="cancel">
      <transition slot="mask" name="dropdown-move">
        <div class="dropdown-panel" :style="dropdownStyle" v-show="isVisible" @click.stop="noop">
          <div class="dropdown-content">
            <ul class="dropdown-list">
              <li
                class="dropdown-item border-bottom-1px"
                v-for="(item, index) in data"
                :class="[index === active ? 'dropdown-item_active': '']"
                @click="itemClick(item, index)">
                  <icon size="20" :icon="item.icon"/>
                  <label class="dropdown-item-text" v-text="item.content"></label>
                </li>
            </ul>
          </div>
        </div>
      </transition>
    </popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Popup from '../popup/popup.vue'
  import Icon from '../icon/icon.vue'
  import apiMixin from '../common/mixins/api'
  const COMPONENT_NAME = 'dropdown'
  const EVENT_SELECT = 'select'
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
      target: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.targetRect = this.target.$el.getBoundingClientRect()
      console.log(this.target.$el.getBoundingClientRect())
    },
    data () {
      return {
        targetRect: {},
        clientW: 0,
        clientH: 0,
        width: 0,
        top: 0
      }
    },
    methods: {
      noop () {
      },
      cancel () {
        this.hide()
      },
      itemClick (item, index) {
        this.hide()
        this.$emit(EVENT_SELECT, item, index)
      }
    },
    computed: {
      dropdownStyle () {
        return {
          top: `${this.targetRect.bottom + 10}px`,
          right: '5px'
        }
      }
    },
    components: {
      Popup,
      Icon
    }
  }
</script>

<style lang="less">
  .dropdown-fade-enter, .dropdown-fade-leave-active {
    opacity: 0;
  }
  .dropdown-fade-enter-active, .dropdown-fade-leave-active {
    transition: all .3s ease-in-out;
  }
  .dropdown-move-enter, .dropdown-move-leave-active {
    transform: scaleY(0);
  }
  .dropdown-move-enter-active, .dropdown-move-leave-active {
    transition: all .3s ease-in-out;
  }
  .dropdown {
    &-panel {
      position: absolute;
      text-align: center;
      font-size: 14px; /*no*/
      background: #fff;
      border-radius: 4px; /*no*/
      box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
      transform-origin: top center;
    }
    &-content {
      overflow: hidden;
    }
    &-list {
      list-style: none;
    }
    &-item{
      list-style: none;
      user-select: none;
      padding: 12px 20px; /*no*/
      &:last-of-type {
        &::before, &::after {
          display: none;
        }
      }
      &_active {
        color: #0B97FF;
      }
      &-text {
        line-height: 20px; /*no*/
        vertical-align: middle;
      }
    }
  }
</style>
