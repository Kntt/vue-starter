<template>
  <div>
    <div class="home" :class="{'is-ios': ios}">
      <router-view class="home-container"/>
    </div>
    <tabbar v-model="active">
      <tab-item id="/office">
        <img v-if="active === '/office'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        工作
      </tab-item>
      <tab-item id="/contacts">
        <img v-if="active === '/contacts'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        通讯录
      </tab-item>
      <tab-item id="/message">
        <img v-if="active === '/message'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        消息
      </tab-item>
      <tab-item id="/user">
        <img v-if="active === '/user'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        我的
      </tab-item>
    </tabbar>
  </div>
</template>
<script>

export default {
  name: 'Home',
  data () {
    return {
      active: this.$route.fullPath
    }
  },
  computed: {
    ios () {
      return this.$deviceInfo.ios
    }
  },
  watch: {
    active (tab) {
      this.$router.replace(tab)
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-top: 44px solid transparent; /*no*/
    border-bottom: 60px solid transparent; /*no*/
    overflow: hidden;
    &.is-ios {
      border-top: 64px solid transparent; /*no*/
    }
    &-container {
      box-sizing: border-box;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
