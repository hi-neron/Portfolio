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

  let me = yo`<div class="phrase-couple" title="thats-me">that's me.</div>`

  let bulletsClass = ['icon-certificate', 'icon-flash', 'icon-headphones']
  let bullets = []
  let containers = []

  for (let i = 0; i < 3; i++) {
    let tBullet = yo`<span class="${bulletsClass[i]}"></span>`
    let tContainers = yo`<div class="phrase-couple" title="num${i}"></div>`
    bullets.push(tBullet)
    containers.push(tContainers)
  }

  let counter = 0
  let counterContainer = 0

  for ( let x = 0; x < 3; x++) {
    // let c = containers[counterContainer - 1]
    // c.appendChild(myItem)
    let myContainer = containers[x]
    
    for (let i = 1; i < 3; i++) {
      let myItem = miniTemplateCreator(items[counter])
      myContainer.appendChild(myItem)
        if ( i === 1) {
            myContainer.appendChild(bullets[x])
          }
        counter++
    }

    template.appendChild(myContainer)
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