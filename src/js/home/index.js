'use strict'

const page = require('page')

// contents
const intro = require('./intro')
const content = require('./content')
// const phraseC = require('./phrase')
const Masonry = require('masonry-layout')
const create = require('./utils/create')
const empty = require('empty-element')

const Lazy = require('vanilla-lazyload')

// phrase intro
let bioTags = ['DESIGNER', 'DEV', 'SEA LOVER']

// bar
const barCreator = require('./bar')
let app, mainContent, introContainer, phrase, msnry

// loader
const loader = require('./loader')

page('/:tag?', create, loader, (ctx, next) => {
  // vars
  app = ctx.app
  let introContainer = ctx.introContainer
  let phrase = ctx.phrase
  let footer = ctx.footer
  let bar = ctx.bar
  let tag = ctx.params.tag

  mainContent = ctx.mainContent
  drawArticles(tag)
  
  // get intro
  document.onload = intro.init(introContainer, ctx)
  
  // Bar
  barCreator((t) => {
    bar.appendChild(t)
  })
  
  // Bio
  // phraseC((template) => {
  //   phrase.appendChild(template)  
  // })

  content.getFooter((e, r) => {
    if (e) return console.log(new Error({message: 'An Error has ocurred'}))
    console.log(r)
    footer.appendChild(r)
  })

  document.body.appendChild(app)
  setTimeout(() => {
    msnry.layout()
  }, 500); 
  next()

  window.addEventListener('articleScreen', (e) => {
    if (app.classList.contains('fixScroll')) {
      let pos = getPosition(mainContent)
      app.classList.remove('fixScroll')
      window.scrollTo(0, pos.top)     
    } else {
      app.classList.add('fixScroll')
    } 

  })
})

function drawArticles (tag) {
  tag = tag ? tag.toLowerCase(): ''
  let overW = document.createElement('div')
  overW.setAttribute('class', 'main-over-wrapper')
  ChangeUrl('san', `/#!/${tag}`)

  let pos = getPosition(mainContent)
  window.scrollTo(0, pos.top)

  content.getMainContent(tag, (e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})
    let main = r.main

    empty(overW).appendChild(main)
    empty(mainContent).appendChild(overW)

    msnry = new Masonry(main, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      initLayout: false,
      transitionDuration: 0.5,
      originTop: false
    })

    msnry.layout()
    
    new Lazy({
      container: app,
      threshold: 1000,
      callback_load: (e) => {
        console.log(e)
        msnry.layout()
      }
    })
  })
}

// get position to scroll them
function getPosition(e){
  let _x = 0;
  let _y = 0;
  while( e && !isNaN( e.offsetLeft ) && !isNaN( e.offsetTop ) ) {
      _x += e.offsetLeft - e.scrollLeft;
      _y += e.offsetTop - e.scrollTop;
      e = e.offsetParent;
  }
  return { top: _y, left: _x };
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
