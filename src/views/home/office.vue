<template>
  <div>
    <mt-header title="工作" fixed>
      <mt-button icon="add" slot="right"></mt-button>
    </mt-header>
    <div class="slide-wrapper">
      <div class="slide-content">
        <slide>
          <div v-for="item in items">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slide>
      </div>
    </div>
    <router-link to="/visa">
      <h3>visa</h3>
    </router-link>
    <mt-button type="primary" @click="showToast">Toast</mt-button>
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
    showToast () {
      const toast = this.$createToast({
        time: 0,
        txt: 'Toast time 1s'
      })
      toast.show()
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
