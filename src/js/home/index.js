'use strict'

const page = require('page')

// contents
const intro = require('./intro')
const content = require('./content')
const phraseC = require('./phrase')

// phrase intro
let bioTags = ['DESIGNER', 'DEV', 'ILLUSTRATOR', 'RESILIENT', 'COFFEE', 'SEA LOVER']

// bar
const bar = require('./bar')
let app, mainContent, footer, introContainer, phrase

page('/', create, bar, (ctx, next) => {
  // get intro
  document.onload = intro.init(introContainer)

  app.appendChild(ctx.bar)
  
  content.getMainContent(null, (e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})
    mainContent.appendChild(r)
  })

  content.getFooter((e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})
    footer.appendChild(r)
  })

  document.body.appendChild(app)
  next()
})

function create(ctx, next) {
  app = document.createElement('div')
  app.setAttribute('id', 'app')
  ctx.app = app

  phrase = document.createElement('section')
  phrase.setAttribute('class', 'first-phrase')
  ctx.phrase = phrase

  phrase = phraseC(bioTags)

  mainContent = document.createElement('section')
  mainContent.setAttribute('id', 'main-content')
  ctx.mainContent = mainContent
  
  footer = document.createElement('footer')
  footer.setAttribute('id', 'footer')
  ctx.footer = footer

  introContainer = document.createElement('intro')
  introContainer.setAttribute('id', 'intro')
  ctx.introContainer = introContainer

  app.appendChild(introContainer)
  app.appendChild(phrase)
  app.appendChild(mainContent)
  app.appendChild(footer)
  next()
}

