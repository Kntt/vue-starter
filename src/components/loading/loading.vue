<template>
  <div class="loading">
    <span class="loading-spinners" :style="style">
      <i class="loading-spinner" v-for="item in balde"></i>
    </span>
  </div>
</template>
<script>
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME,
    data () {
      return {
        balde: 12
      }
    },
    props: {
      size: {
        type: Number,
        default: 24
      }
    },
    computed: {
      style () {
        const value = `${this.size}px`
        return {
          width: value,
          height: value
        }
      }
    }
  }
</script>
<style lang="less">
  // less 使用mixin做循环
  .loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));
    &:nth-child(@{counter}) {
      animation-delay: (@counter - 1) / 12s;
      transform: rotate(30deg * (@counter - 6)) translateY(-150%);
    }
  }

  .loading {
    font-size: 0;
  }
  .loading-spinners {
    position: relative;
    display: inline-block;
    width: 20px; /*no*/
    height: 20px; /*no*/
  }
  .loading-spinner {
    position: absolute;
    left: 44.5%;
    top: 37%;
    width: 10%;
    height: 25%;
    border-radius: 50%/20%;
    opacity: .25;
    background-color: currentColor;
    animation: spinner-fade 1s linear infinite;
    .loop(12)
  }
  @keyframes spinner-fade {
    0% {
      opacity: .85;
    }
    50% {
      opacity: .25;
    }
    100% {
      opacity: .25;
    }
  }

</style>
