<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="app-container"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      prevRoutes: [],
      transitionName: 'slide-in'
    }
  },
  watch: {
  /* ====================================================================
    *                     页面切换动画
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
          this.transitionName = 'slide-out'
          this.prevRoutes.pop()
        } else {
          if (from.name) {
            this.transitionName = 'slide-in'
            this.prevRoutes.push(from.name)
          }
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'PingFangSC-Regular', '方正兰亭黑', '思源黑体', 'Droid Sans Fallback', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}
.app-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
