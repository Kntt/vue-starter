<template>
  <div class="main">
    <transition name="fade">
      <router-view/>
    </transition>
    <mt-tabbar v-model="active">
      <mt-tab-item id="office">
        <img v-if="active === 'office'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        工作
      </mt-tab-item>
      <mt-tab-item id="contacts">
        <img v-if="active === 'contacts'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        通讯录
      </mt-tab-item>
      <mt-tab-item id="message">
        <img v-if="active === 'message'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="user">
        <img v-if="active === 'user'" slot="icon" src="../assets/logo.png">
        <img v-else slot="icon" src="../assets/100x100.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      active: 'office'
    }
  },
  watch: {
    active (tab) {
      this.$router.replace(`/${tab}`)
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    height: 100%;
  }
</style>
