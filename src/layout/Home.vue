<template>
  <div class="home">
    <div class="home-page">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <div class="home-tab-bar">
      <mt-tabbar v-model="selected">
      <mt-tab-item id="message">
        <img v-if="selected === 'message'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="connects">
        <img v-if="selected === 'connects'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        通讯录
      </mt-tab-item>
      <mt-tab-item id="office">
        <img v-if="selected === 'office'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        工作
      </mt-tab-item>
      <mt-tab-item id="user">
        <img v-if="selected === 'user'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      selected: 'message'
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    display: flex;
    height: 100%;
    flex-direction: column;
    &-page {
      flex: 1;
    }
    &-tab-bar {
      height: 60px; /*no*/
    }
  }
</style>
