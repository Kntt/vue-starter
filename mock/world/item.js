module.exports = {
  api: '/api/world',
  response: function (req, res) {
    res.json({
      status: 200,
      statusText: 'success',
      body: [
        {
          label: 'vue-router',
          link: 'http://router.vuejs.org/'
        },
        {
          label: 'vuex',
          link: 'http://vuex.vuejs.org/'
        },
        {
          label: 'vue-loader',
          link: 'http://vue-loader.vuejs.org/'
        },
        {
          label: 'awesome-vue',
          link: 'https://github.com/vuejs/awesome-vue'
        }
      ]
    })
  }
}
