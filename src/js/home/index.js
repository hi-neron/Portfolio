'use strict'

const page = require('page')

// contents
const intro = require('./intro')
const content = require('./content')

// For grid
const Masonry = require('masonry-layout')

// For load images
const ImagesLoaded = require('imagesloaded')

// initilize elements
const create = require('./utils/create')

// utility to create empty elements
const empty = require('empty-element')

const Lazy = require('vanilla-lazyload')

// phrase intro
let bioTags = ['DESIGNER', 'DEV', 'SEA LOVER']

// bar
const barCreator = require('./bar')
let app, mainContent, introContainer, phrase, msnry, imgLoaded

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
  
  // get intro
  document.onload = intro.init(introContainer, ctx)
  drawArticles(tag, ctx)
  
  // Bar
  barCreator((t) => {
    bar.appendChild(t)
  })
  
  content.getFooter((e, r) => {
    if (e) return console.log(new Error({message: 'An Error has ocurred'}))
    console.log(r)
    footer.appendChild(r)
  })

  window.addEventListener('articleScreen', (e) => {
    if (app.classList.contains('fixScroll')) {
      let pos = getPosition(mainContent)
      app.classList.remove('fixScroll')
      window.scrollTo(0, pos.top)     
    } else {
      app.classList.add('fixScroll')
    } 
  })

  app.addEventListener('scroll', (e) => {
    console.log('scroll')
  })
  
  next()
})

function contentDraw (w, r, cb) {
  empty(w).appendChild(r.main)
  empty(mainContent).appendChild(w)

  msnry = new Masonry(r.main, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: 300,
    gutter: 14
  })

  let images = document.querySelectorAll('.images-to-load')
  imgLoaded = ImagesLoaded(images)

  cb()
}

// dibula los articulos 
function drawArticles (tag, ctx) {
  tag = tag ? tag.toLowerCase(): ''
  let overW = document.createElement('div')
  overW.setAttribute('class', 'main-over-wrapper')
  ChangeUrl('san', `/#!/${tag}`)

  let pos = getPosition(mainContent)
  pos = pos.top - 12
  window.scrollTo(0, pos)

  content.getMainContent(tag, (e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})

    contentDraw(overW, r, () => {
      let main = r.main
      let initialize = r.resizeEvents

      imgLoaded.on('done', function (i) {
        setTimeout(() => {
          initialize()
          msnry.layout()
          ctx.mainLoader.vanish()
          setTimeout(() => {
            msnry.layout()
          }, 200);
        }, 1200);
      })
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
