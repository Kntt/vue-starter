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
    <mt-button size="large" type="primary" @click="showToast">Toast</mt-button>
    <mt-button size="large" type="primary" @click="showAlert">Modal</mt-button>
    <mt-button size="large" type="primary" @click="showPicker">Picker</mt-button>
    <mt-button size="large" @click="showTimePicker" plain>TimePicker</mt-button>
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
      ],
      colData: [{ text: 'item1', value: '1' }, { text: 'item2', value: '2' }, { text: 'item3', value: '3' }]
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
    },
    showPicker () {
      this.$createPicker({
        title: '大爷，选一个吧',
        data: [this.colData],
        onSelect: (selectedText, selectedIndex) => {
          this.$createModal({
            type: 'warn',
            content: `选中的内容是：${selectedText.join(',')} <br/> 选中的索引是 ${selectedIndex.join(',')}`
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            type: 'correct',
            txt: 'Picker canceled',
            time: 1000
          }).show()
        }
      }).show()
    },
    showTimePicker () {
      this.$createTimePicker({
        showNow: false,
        minuteStep: 10,
        delay: 10,
        day: {
          len: 35,
          filter: ['今天', '明天'],
          format: 'M月d日'
        },
        onSelect: (selectedTime, selectedText) => {
          this.$createModal({
            type: 'warn',
            title: `选中的时间戳是 ${selectedTime}`,
            content: `选中的内容是 ${selectedText}`
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            type: 'correct',
            txt: 'Picker canceled',
            time: 1000
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
