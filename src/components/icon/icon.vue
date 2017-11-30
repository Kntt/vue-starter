<template>
  <svg class="icon">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
{
  const _require = require.context('../../assets/icons', true, /\.svg$/)
  _require.keys().forEach(key => _require(key))
}
const COMPONENT_NAME = 'icon'
export default {
  name: COMPONENT_NAME,
  props: [
    'icon'
  ],
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    }
  }
}
</script>