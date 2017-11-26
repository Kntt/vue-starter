<template>
  <div>
    <mt-header title="通讯录" fixed>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <container :data="data">
      <ul class="contacts-list">
        <li @click="itemClick(item)" class="contacts-item border-bottom-1px" v-for="item in data">
          <img src="../../../assets/100x100.png" alt="" class="contacts-item-icon">
          <p class="contacts-item-text">{{item}}</p>
          <p class="contacts-item-tip">{{item}}</p>
        </li>
      </ul>
    </container>
  </div>
</template>

<script>
export default {
  name: 'contacts-list',
  props: {
    data: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .contacts {
    &-item {
      display: flex;
      padding: 12px 15px;
      font-size: 16px;
      line-height: 36px;
      &-icon {
        width: 36px;
        height: 36px;
      }
      &-text {
        flex: 1;
        padding-left: 15px;
      }
      &-tip {
        color: #bbb;
      }
    }
  }
</style>
