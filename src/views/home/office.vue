<template>
  <div>
    <mt-header title="工作" fixed>
      <mt-button icon="add" slot="right"></mt-button>
    </mt-header>
    <div class="slide-wrapper">
      <div class="slide-content">
        <slide @change="changePage">
          <slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandle(item, index)">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </slide-item>
        </slide>
      </div>
    </div>
    <router-link to="/visa">
      <h3>visa</h3>
    </router-link>
    <mt-button type="primary" @click="showToast">Toast</mt-button>
    <mt-button type="primary" @click="showAlert">Modal</mt-button>
  </div>
</template>

<script>
export default {
  name: 'office',
  data () {
    return {
      items: [
        {
          linkUrl: 'javascript:;',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
          id: 11351
        },
        {
          linkUrl: 'javascript:;',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
          id: 11372
        },
        {
          linkUrl: 'javascript:;',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
          id: 11378
        },
        {
          linkUrl: 'javascript:;',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg',
          id: 11375
        },
        {
          linkUrl: 'javascript:;',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg',
          id: 11287
        }
      ]
    }
  },
  methods: {
    changePage (current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandle (item, index) {
      console.log(item, index)
    },
    showToast () {
      this.$createToast({
        time: 3000,
        txt: 'Toast time 1s'
      }).show()
    },
    showAlert () {
      this.$createModal({
        type: 'confirm',
        title: '我是标题',
        content: '我是内容',
        confirmBtn: {
          text: '确定按钮',
          active: true,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消按钮',
          active: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$createToast({
            time: 1000,
            txt: '点击确认按钮'
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            time: 1000,
            txt: '点击取消按钮'
          }).show()
        }
      }).show()
    }
  }
}
</script>

<style lang="less" scoped>
.slide-wrapper {
  position: relative;
  width: 100%;
  padding-top: 40%; /*no*/
  overflow: hidden;
  .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
