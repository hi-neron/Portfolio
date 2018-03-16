'use strict'

const yo = require('yo-yo')

function phraseClick(e) {
  e.preventDefault()
  let src = e.srcElement.title
  console.log(src)
}

function miniTemplateCreator(item) {
  let i = yo`
    <span class="phrase-link" title="${item}">${item}</span>
  `
  let container = yo`
  <span class="phrase-word">
    ${i}
  </span>`

  container.onclick = phraseClick
  return container
}

function itemCreator(items) {
  let template = document.createElement('div')
  template.setAttribute('class', 'phrase-links-container')

  let me = yo`<div class="phrase-thats-me">that's me.</div>`

  let bulletsClass = ['icon-certificate', 'icon-flash', 'icon-headphones']
  let bullets = []

  for (let i = 0; i < 3; i++) {
    let tBullet = yo`<span class="${bulletsClass[i]}"></span>`
    bullets.push(tBullet)
  }

  console.log(bullets)
  let counter = 0

  for ( let i = 0; i < items.length; i++) {
    let myItem = miniTemplateCreator(items[i])
    template.appendChild(myItem)
    if ( i % 2 === 0) {
      template.appendChild(bullets[counter])
      counter += 1
    }
  }

  template.appendChild(me)

  return template
}

function createTemplate (phrase) {
  let items = itemCreator(phrase)

  let template = yo`
    <div class="phrase-container">
      <div class="phrase-wrapper">
        <h3 class="phrase-content">
          ${items}
        </h3>
      </div>
    </div>
  `
  return template
}

module.exports = function (phrase) {
  return createTemplate(phrase)
}