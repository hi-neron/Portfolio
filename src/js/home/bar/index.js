const yo = require('yo-yo')
const empty = require('empty-element')
const Mojs = require('mo-js')

let opened = false
let limit = false
let menuBar, msnry
// tags
const MAINK = ['Diseño', 'Dev', 'Animación', 'Mar', 'Ilustración', 'Resiliencia', 'Café']
const SECONDK = ['Brand', 'Week Challenge', 'Coffee & Sea lover', 'Front end']

// tag info template
let tag = yo`<span class="tag"></span>`
let message = yo`<span class="message"></span>`
let alertT = yo`<span class="alert"></span>`
let icon = yo`<div id="ico-bar" class="icon">▶︎</div>`

let tagInfo = yo`
<div class="tag-info">
  ${message}
  ${alertT}
  ${tag}
</div>
`

let bottom = yo`<div class="bar-bottom">
  <div class="bar-bottom-upper">
    <h1 class="bar-sanchez"></h1>
  </div>
</div>`

// lanzador
let trigger = yo`
  <div id="bar-trigger">
  ${icon}
  ${tagInfo}
  </div>
`

let template = createTemplate()

function createTemplate() {
  let linkTemplate
 
  let mainLinks = document.createElement('ul')
  mainLinks.setAttribute('class', 'main-bar-list')

  let secondaryLinks = document.createElement('ul')
  secondaryLinks.setAttribute('class', 'secondary-bar-list')
  
  // add main items
  for (let i = 0; i < MAINK.length; i++) {
    linkTemplate = yo`
    <span class="bar-link" data-label="${MAINK[i]}">
      ${MAINK[i]}
    </span>
    `
    mainLinks.appendChild(linkTemplate)
  }

  // add main items
  for (let i = 0; i < SECONDK.length; i++) {
    linkTemplate = yo`
      <span class="bar-link" data-label="${SECONDK[i]}">
        ${SECONDK[i]}
      </span>
    `
    secondaryLinks.appendChild(linkTemplate)
  }

  menuBar = yo`
    <div id="bar-menu">
      ${mainLinks}
      ${secondaryLinks}
      ${bottom}
    </div>
  `

  menuBar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('bar-link')) return
    const drawArticles = require('../')
    // tag to search
    let myTag = e.target.getAttribute('data-label')
    drawArticles(myTag)
  })

  let barTemplate = yo`
    <div class="bar-wrapper">
      ${menuBar}
      ${trigger}
    </div>
  `
  
  return barTemplate
}

let mainColor = '#ff4f4f'
let DURATION = 1000

const burst = new Mojs.Burst({
  parent: icon,
  left: 5,
  top: 4,
  count: 4,
  angle: 45,
  radius: {3: 12},
  children: {
    shape: 'line',
    radius: 8,
    scale: 1,
    strokeDasharray: '100%',
    strokeDashoffset: { '-100%' : '100%' },
    easing: 'ease.out',
    stroke: mainColor
  }
})

trigger.addEventListener('click', (e) => {
  let app = document.getElementById('app')
  let bar = document.getElementById('main-bar')
  console.log(e)
  burst
  .setSpeed(1)
  .replay()
  
  if (opened) {
    opened = false
    console.log('opened')
    app.classList.remove('main-bar-open-app');
    bar.classList.remove('main-bar-open-bar');
    icon.classList.remove('rotate-icon');
    
  } else {
    icon.classList.add('rotate-icon');
    app.classList.add('main-bar-open-app');
    bar.classList.add('main-bar-open-bar');
    opened = true
    console.log('closed')
  } 
})

window.addEventListener('scroll', (e) => {
  let vPosition = window.pageYOffset
  let app = document.getElementById('app')
  let bar = document.getElementById('main-bar')

  if (vPosition > 820) {
    limit = true
    trigger.classList.add('view');
  } else {
    limit = false
    opened = false
    trigger.classList.remove('view');
    app.classList.remove('main-bar-open-app');
    bar.classList.remove('main-bar-open-bar');
  }
})

window.addEventListener('tagChange', (e) => {
  let newTag = e.tag
  let newMessage = e.message
  let alert = e.alert

  empty(tag).innerHTML = newTag ? newTag: ''
  empty(alertT).innerHTML = alert ? alert: ''
  empty(message).innerHTML = newMessage
})

module.exports = function (cb) {
  cb(template)
}