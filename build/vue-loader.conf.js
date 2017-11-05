'use strict'
const utils = require('./utils')
const config = require('../config')
const px2rem = require('postcss-px2rem-exclude')
const autoprefixer = require('autoprefixer')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
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
  ],
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
