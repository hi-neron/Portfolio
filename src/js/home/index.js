'use strict'

const page = require('page')

// contents
const intro = require('./intro')
const content = require('./content')
const phraseC = require('./phrase')
const Masonry = require('masonry-layout')
const create = require('./utils/create')
const empty = require('empty-element')

const Lazy = require('vanilla-lazyload')

// phrase intro
let bioTags = ['DESIGNER', 'DEV', 'ILLUSTRATOR', 'RESILIENT', 'COFFEE', 'SEA LOVER']

// bar
const bar = require('./bar')
let app, mainContent, introContainer, phrase, msnry

page('/:tag?', create, bar, (ctx, next) => {
  // vars
  let app = ctx.app
  let introContainer = ctx.introContainer
  let phrase = ctx.phrase
  let footer = ctx.footer
  let tag = ctx.params.tag

  mainContent = ctx.mainContent
  drawArticles(tag)

  // get intro
  document.onload = intro.init(introContainer)

  phrase.appendChild(phraseC(bioTags))
  app.appendChild(ctx.bar)

  content.getFooter((e, r) => {
    if (e) return console.log(new Error({message: 'An Error has ocurred'}))
    console.log(r)
    footer.appendChild(r)
  })

  document.body.appendChild(app)
  next()
})

function drawArticles (tag) {
  tag = tag ? tag.toLowerCase(): ''
  let overW = document.createElement('div')
  overW.setAttribute('class', 'main-over-wrapper')
  ChangeUrl('san', `/#!/${tag}`)

  content.getMainContent(tag, (e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})
    let main = r.main

    empty(overW).appendChild(main)
    empty(mainContent).appendChild(overW)

    msnry = new Masonry(main, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    })
  
    new Lazy({
      container: main,
      callback_load: (e) => {
        msnry.layout()
      }
    })
  })
}

function ChangeUrl(title, url) {
  if (typeof (history.pushState) != "undefined") {
      var obj = { Title: title, Url: url }
      history.pushState(obj, obj.Title, obj.Url)
  } else {
      alert("Browser does not support HTML5.")
  }
}
module.exports = drawArticles
