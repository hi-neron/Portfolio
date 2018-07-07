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

// phrase intro
let bioTags = ['DESIGNER', 'DEV', 'SEA LOVER']

// bar
const barCreator = require('./bar').templateP
const barBehavior = require('./bar').barBehavior
const curriculumCreator = require('./curriculum').barBehavior
let app, mainContent, introContainer, phrase, msnry, imgLoaded

let scrollA = true

// loader
const loader = require('./loader')

// scroll
let sum = []
let scrollM = 0
let maxDistance, windowSize
let scrolling = false

page('/:tag?', create, loader, (ctx, next) => {
  // vars
  app = ctx.app

  let introContainer = ctx.introContainer
  let footer = ctx.footer
  let bar = ctx.bar
  let tag = ctx.params.tag
  let curriculum = ctx.cv

  mainContent = ctx.mainContent

  // get intro
  document.onload = intro.init(introContainer, ctx)
  drawArticles(tag, ctx)
  

  // Bar
  barCreator((t) => {
    bar.appendChild(t)
  })
  
  curriculumCreator((c) => {
    curriculum.appendChild(c)
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
    transitionDuration: 300,
    gutter: 10
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
  // move!
  // move!
  scroll(null, pos)

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

//
// Scroll Event Listener
// 


function getAccelerationNormal (sum) {
  let size = sum.length
  let result = 0

  sum.map(element => {
    result = result + parseFloat(element)
    return element
  })

  return result / size
}

function windowScroll (acceleration, direction) {
  direction = direction ? 1 : -1
  scrollM += (acceleration * direction)
  let maxScroll = maxDistance - windowSize
  if (scrollM < 0) {
    scrollM = 0
    return false
  }
  if (scrollM > maxScroll) {
    scrollM = maxScroll
    return false
  }
  console.log(scrollM)
  window.scrollTo(0, scrollM.toFixed(2))
  return true
}

let speed = 0
let acceleration = 0

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
  e.preventDefault()
  scroll(e)
  barBehavior()
})

module.exports = { drawArticles, setNewWindowSize }

  /*
    // set new y scroll speed
    let maxSpeed = 16
    let friction = 0.05
    // scroll
    let direction, absAcceleration, distance, moving = true

    // scroll Move
    let startValue, endingDistance, easingValue, time, currentIteration

    if (e) {

      let deltaY = e.deltaY
      let scrollAcceleration = deltaY * maxSpeed / 700

      while (sum.length > 3) {
        sum.shift()
      }

      sum.push(scrollAcceleration)

      let accelerationNormalized = getAccelerationNormal(sum)
      direction = accelerationNormalized > 0 ? true: false
      absAcceleration = Math.abs(accelerationNormalized)
      scrollAnimate()

    } else {
      // let direction = (scrollM - to) > 0 ? false: true
      startValue = scrollM
      endingDistance = scrollM - to
      easingValue = 0
      time = 1000
      currentIteration = 0
      scrollMove()
    }

    function scrollAnimate () {
      // window.scrollTo(0, speed)
      absAcceleration -= friction

      if (absAcceleration > 0.1 && moving ) {
        moving = windowScroll(absAcceleration, direction)
        window.requestAnimationFrame(scrollAnimate)
      } else {
        absAcceleration = 0
        sum = []
      }

    }

    function scrollMove () {

      // let changeInValue = endingDistance - startValue
      // let totalIterations = time / 60;

      // let easingValue = easeInOut(currentIteration, startValue, changeInValue, totalIterations);

      // currentIteration++;

      // scrollM -= distance

      // // window.scrollTo(0, easingValue)
      // console.log(easingValue)

      // if (currentIteration <= totalIterations) {
      //   window.requestAnimationFrame(scrollMove);
      // }
    }
  */