module.exports = {
  api: '/api/hello',
  response: function (req, res) {
    res.json({
      status: 200,
      statusText: 'success',
      body: [
        {
          label: 'Core Docs',
          link: 'https://vuejs.org'
        },
        {
          label: 'Forum',
          link: 'https://forum.vuejs.org'
        },
        {
          label: 'Community Chat',
          link: 'https://chat.vuejs.org'
        },
        {
          label: 'Twitter',
          link: 'https://twitter.com/vuejs'
        },
        {
          label: 'Docs for This Template',
          link: 'http://vuejs-templates.github.io/webpack/'
        }
      ]
    })
  }
}
