<template>
  <div class="hello">
    <m-title :text="msg"/>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="item in hello"><a :href="item.link" target="_blank">{{item.label}}</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li v-for="item in world"><a :href="item.link" target="_blank">{{item.label}}</a></li>
    </ul>
  </div>
</template>

<script>
import mTitle from '@/components/Title'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  components: {
    mTitle
  },
  mounted () {
    this.getHello()
    this.getWorld()
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hello: [],
      world: []
    }
  },
  methods: {
    async getHello () {
      let { data } = await axios('/api/hello')
      this.hello = data.body
    },
    async getWorld () {
      let { data } = await axios('/api/world')
      this.world = data.body
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
