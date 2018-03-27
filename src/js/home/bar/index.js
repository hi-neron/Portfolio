const yo = require('yo-yo')
const empty = require('empty-element')

let opened = false
let limit = false
let menuBar
// tags
const MAINK = ['Design', 'Dev', 'Animation', 'Illustration', 'Resilience']
const SECONDK = ['Brand', 'Week Challenge', 'Coffee & Sea lover', 'Front end']

// tag info template
let tag = yo`<span class="tag"></span>`
let message = yo`<span class="message"></span>`
let alertT = yo`<span class="alert"></span>`

let tagInfo = yo`
  <div class="tag-info">
    ${message}
    ${alertT}
    ${tag}
  </div>
`

// lanzador
let trigger = yo`
  <div id="bar-trigger">
  <div class="icon">△</div>
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
      <li class="bar-main-item item-bar-link">
        <span class="bar-link" data-label="${MAINK[i]}">
          ${MAINK[i]}
        </span>
      </li>
    `
    mainLinks.appendChild(linkTemplate)
  }

  // add main items
  for (let i = 0; i < SECONDK.length; i++) {
    linkTemplate = yo`
      <li class="bar-secondary-item item-bar-link">
        <span class="bar-link" data-label="${SECONDK[i]}">
          ${SECONDK[i]}
        </span>
      </li>
    `
    secondaryLinks.appendChild(linkTemplate)
  }

  menuBar = yo`
    <div id="bar-menu">
      <span class="labels">leitmotiv</span>
      ${mainLinks}
      ${secondaryLinks}
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


trigger.addEventListener('click', (e) => {
  let app = document.getElementById('app')
  let bar = document.getElementById('main-bar')

  if (opened) {
    opened = false
    console.log('opened')
    app.classList.remove('main-bar-open-app');
    bar.classList.remove('main-bar-open-bar');
  } else {
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

  if (vPosition > 720) {
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