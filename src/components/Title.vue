<template>
  <h1>{{ text }}</h1>
</template>

<script>
  export default {
    props: ['text'],
    mounted: function () {
      document.title = this.text
    }
  }
</script>