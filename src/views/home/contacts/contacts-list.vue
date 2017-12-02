<template>
  <div>
    <nav-header title="通讯录" fixed>
      <mt-button v-if="currentNode" @click="back" icon="back" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </nav-header>
    <container :data="data">
      <ul class="contacts-list">
        <li @click="itemClick(item, index)" class="contacts-item border-bottom-1px" v-for="item, index in data">
          <img :src="item.icon" alt="" class="contacts-item-icon">
          <p class="contacts-item-text">{{item.name}}</p>
          <p class="contacts-item-tip">{{item.conut}}</p>
        </li>
      </ul>
    </container>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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
  },
  methods: {
    ...mapMutations('contacts', ['UPDATE_CURRENTNODE']),
    itemClick (val, index) {
      if (val.children && val.children.length) {
        this.UPDATE_CURRENTNODE({val: index})
      }
    },
    back () {
      this.UPDATE_CURRENTNODE({val: ''})
    }
  },
  computed: {
    ...mapState('contacts', ['currentNode'])
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
