<template>
  <div class="hello">
    <m-title :text="msg"/>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="item in hello"><a :href="item.link" target="_blank">{{item.label}}</a></li>
    </ul>
    <h2 class="btn" @click="getEcosystem">getEcosystem</h2>
    <ul>
      <li v-for="item in world"><a :href="item.link" target="_blank">{{item.label}}</a></li>
    </ul>
  </div>
</template>

<script>
import mTitle from '@/components/Title'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  components: {
    mTitle
  },
  mounted () {
    this.getHello()
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hello: []
    }
  },
  methods: {
    ...mapActions(['getEcosystem']),
    async getHello () {
      let { data } = await axios('/api/hello')
      this.hello = data.body
    }
  },
  computed: {
    ...mapState(['world'])
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
.btn {
  width: 180px;
  margin: 0 auto;
  padding: 8px;
  text-align: center;
  border-radius: 10px;
  background-color: #42b983;
}
.btn:active {
  background-color: #42ff83;
}
</style>
