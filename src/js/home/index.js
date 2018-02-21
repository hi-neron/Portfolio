'use strict'

const page = require('page')
const intro = require('./intro')

page('/', (ctx, next) => {
  document.onload = intro
  console.log('first')
  next()
})
