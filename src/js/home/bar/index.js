const yo = require('yo-yo')
const empty = require('empty-element')
const _ = require('lodash')

let limit = false
let opened = false
let menuBar

// tag info template
let tag = yo`<span class="tag"></span>`
let message = yo`<span class="message"></span>`
let alertT = yo`<span class="alert"></span>`
let icon = yo`<div id="ico-bar" class="icon">▶︎</div>`

let tagInfo = yo`
<div class="tag-position">
  <div class="tag-background">
    ${message}
    ${alertT}
    ${tag}
  </div>
</div>
`

let bottom = yo`<div class="bar-bottom">
  <div class="bar-bottom-upper">
    <h1 class="bar-sanchez"></h1>
  </div>
</div>`

// Launcher
let trigger = yo`
  <div id="bar-trigger">
  ${tagInfo}
  </div>
`

function getTags () {
  const articles = require('../content/articles')
  let preTags = []
  let scoredTags = []
  for (let article in articles) {
    let articleTags = articles[article].keywords
    for (let i = 0; i < articleTags.length; i++) {
      preTags.push(articleTags[i])
    }
  }

  for (let x = 0; x < preTags.length; x++) {
    let counter = 0
    for (let y = 0; y < preTags.length; y++) {
      if (preTags[x] === preTags[y]) counter++
    }
    let score = {
      name : preTags[x],
      counter
    }
    scoredTags.push(score)
  }

  let result = _.sortBy(_.uniqBy(scoredTags, 'name'), 'counter')
  
  let maink = []
  let secondk = []

  result.map((ob) => {
    if(ob.counter > 2) {
      maink.push(ob.name)
    } else {
      secondk.push(ob.name)
    }
  })

  maink = _.orderBy(maink, [], ['asc'])
  secondk = _.orderBy(secondk, [], ['asc'])

  return {
    maink,
    secondk
  }

}

let template = createTemplate()

function createTemplate() {
  let linkTemplate

  let tags = getTags()

  let MAINK = tags.maink
  let SECONDK = tags.secondk

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
    const drawArticles = require('../').drawArticles
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

trigger.addEventListener('click', (e) => {
  let app = document.getElementById('app')
  let bar = document.getElementById('main-bar')
  console.log(e)

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

function barBehavior (mainContentP) {
  let vPosition = window.pageYOffset
  let app = document.getElementById('app')
  let bar = document.getElementById('main-bar')
  
  if (vPosition > mainContentP.top - 450) {
    limit = true
    trigger.classList.add('view');
  } else {
    limit = false
    opened = false
    trigger.classList.remove('view');
    app.classList.remove('main-bar-open-app');
    bar.classList.remove('main-bar-open-bar');
  }
}

window.addEventListener('tagChange', (e) => {
  let newTag = e.tag
  let newMessage = e.message
  let alert = e.alert

  empty(tag).innerHTML = newTag ? newTag: ''
  empty(alertT).innerHTML = alert ? alert: ''
  empty(message).innerHTML = newMessage
})

function templateP (cb) {
  cb(template)
}

module.exports = {
  templateP,
  barBehavior
}