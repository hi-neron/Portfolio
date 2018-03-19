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
let app, mainContent, footer, introContainer, phrase, msnry

page('/:tag?', create, bar, (ctx, next) => {
  // vars
  let app = ctx.app
  let introContainer = ctx.introContainer
  let phrase = ctx.phrase
  let tag = ctx.params.tag

  mainContent = ctx.mainContent
  drawArticles(tag, mainContent)

  // get intro
  document.onload = intro.init(introContainer)

  phrase.appendChild(phraseC(bioTags))
  app.appendChild(ctx.bar)

  content.getFooter((e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})
    footer.appendChild(r)
  })

  document.body.appendChild(app)
  next()
})

function drawArticles (tag, container) {
  content.getMainContent(tag || null, (e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})
    let main = r.main
  
    empty(container).appendChild(main)
  
    msnry = new Masonry(main, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 12
    })
  
    new Lazy({
      container: main,
      callback_load: (e) => {
        msnry.layout()
      }
    })
  })
}
