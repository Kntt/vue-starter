<template>
  <div class="main" :class="{'is-ios': ios}">
    <transition :name="transitionName">
      <router-view class="main-content"/>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Page',
  data () {
    return {
      prevRoutes: [],
      transitionName: 'turn-on'
    }
  },
  watch: {
  /* ====================================================================
    *                     基于Page的组件页面切换动画
    * 原理简介：
    * 在这里对于页面之间的切换采用将路由堆栈的方法而不是类似子路由这样的根据路由长度来
    * 基本原理是每次路由切换将其堆入一个栈，最多存下两个路由
    * 如果进入的路由name 和 堆栈最后一个路由name相同， 证明是返回操作
    * 否则就是进入操作
    * 路由可以增加元数据noPageAnimation来禁用切换动画，只要设置了该值，
    * 无论进入该路由，还是从该路由进入其他路由都禁止切换动画
    * ==================================================================== */
    $route (to, from) {
      if (!(to.meta.noPageAnimation || from.meta.noPageAnimation)) {
        if (to.name === this.prevRoutes[this.prevRoutes.length - 1]) {
          this.transitionName = 'turn-off'
          this.prevRoutes.pop()
        } else {
          if (from.name) {
            this.transitionName = 'turn-on'
            this.prevRoutes.push(from.name)
          }
        }
      }
    }
  },
  computed: {
    ios () {
      return this.$deviceInfo.ios
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-top: 44px solid transparent; /*no*/
    overflow: hidden;
    &.is-ios {
      border-top: 64px solid transparent; /*no*/
    }
    &-content {
      box-sizing: border-box;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
