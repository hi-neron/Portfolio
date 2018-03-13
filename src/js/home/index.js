'use strict'

const page = require('page')
const intro = require('./intro')

let content = require('./content')
let app = document.createElement('div')
app.setAttribute('id', 'app')

page('/', (ctx, next) => {
  // get intro
  document.onload = intro.init(app)

  // add app to document
  document.body.appendChild(app)

  content().then(t => {
    setTimeout(() => {
      app.appendChild(t)
    }, 300);
  }).catch(e => {
    console.log(e)
  })

  next()
})

