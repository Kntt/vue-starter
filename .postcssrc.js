// https://github.com/michael-ciniawsky/postcss-load-config
const px2rem = require('postcss-px2rem-exclude')
const autoprefixer = require('autoprefixer')
module.exports = {
  "plugins": [
    px2rem({
      remUnit: 75,
      exclude: /node_modules/
    }),
    autoprefixer({
      browsers: [
        'iOS >= 8',
        'Android >= 4'
      ]
    })
  ]
}
