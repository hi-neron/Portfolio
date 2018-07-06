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

// bar
const barCreator = require('./bar').templateP
const barBehavior = require('./bar').barBehavior
let app, mainContent, msnry, imgLoaded, maxDistance, windowSize

// loader
const loader = require('./loader')

// resize events
const introR = require('./intro/world').onWindowResize
const resizeEvents = require('./content/content').resizeEvents

let scrollA = true

page('/:tag?', create, loader, (ctx, next) => {
  // vars
  app = ctx.app

  let introContainer = ctx.introContainer
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

  // ABRE EL ARTICULO: Lo dibuja cuando se abre
  // se llama desde /content/content
  window.addEventListener('articleScreen', (e) => {
    if (app.classList.contains('fixScroll')) {
      let pos = getPosition(mainContent)
      app.classList.remove('fixScroll')
      window.scrollTo(0, pos.top)
    } else {
      app.classList.add('fixScroll')
    } 
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
    transitionDuration: 300
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
  pos = pos.top
  // move!
  // move!

  // si no hay un loader, entonces hace scroll
  if (!ctx) {
    scroll(null, pos)
  }

  content.getMainContent(tag, (e, r) => {
    if (e) return new Error({message: 'An Error has ocurred'})

    contentDraw(overW, r, () => {
      let main = r.main
      let initialize = r.resizeEvents

      imgLoaded.on('done', function (i) {
        setTimeout(() => {
          initialize()
          msnry.layout()
          // close loader
          if (ctx) {
            ctx.mainLoader.vanish()
          }

          setTimeout(() => {
            setNewWindowSize()
            msnry.layout()
          }, 200);
        }, 1200);
      })
    })
  })
}

function setNewWindowSize () {
  let body = document.body, html = document.documentElement;
  maxDistance = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )
  windowSize = window.innerHeight
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

function scroll (e, pos) {
  let actualPosition, nextPosition, direction, add, factor, curve, util
  let move = 0
  if (e) {
    // define velocidad positiva o negativa
    // let r = 0
    // let deltaY = e.deltaY
    // if (deltaY > 0) {
    //   r = 5
    // } else if(deltaY < 0){
    //   r = -5
    // }

    // speed += r

    // console.log(deltaY, r, speed, intro)
  } else {
    // scroll to x pos
    actualPosition = window.pageYOffset
    nextPosition = pos
    direction = actualPosition - nextPosition
    util = Math.abs(direction)

    factor = util / 50
    add = direction >= 0 ? factor * -1 : factor
    direction = Math.abs(direction)
    
    scrollmove()
  } 
  
  function scrollmove () {
    scrollA = false
    
    if (direction <= 1) {
      scrollA = true
    } else {
      window.scrollTo(0, actualPosition += add)
      direction -= factor
      console.log(direction, scrollA, factor, nextPosition, actualPosition)
      window.requestAnimationFrame(scrollmove)
    }
  }

}

window.addEventListener('wheel', (e) => {
  // dont scroll
  if (!scrollA) {
    e.preventDefault
  }
  // e.preventDefault()
  scroll(e)
  barBehavior(getPosition(mainContent))
})

window.addEventListener( 'resize', (e) => {
  introR()
  resizeEvents()
  setNewWindowSize()
})

module.exports = { drawArticles, setNewWindowSize }
