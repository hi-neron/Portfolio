'use strict'

const yo = require('yo-yo')

function articleGen(data) {
  let template = yo`
    <article class="article-container" title="${data.title}">
      <img src="${data.pictures.main.url}" alt="${data.pictures.main.comment}">
    </article>
  `
  return template
}

function createTemplate (items, cb) {
  let articleTemplate
  let main = yo`
    <div class="main-content-wrapper">
    </div>
  `

  for (let i = 0; i < items.length; i++) {
    articleTemplate = articleGen(items[i])
    main.appendChild(articleTemplate)
  }

  cb(null, main)
}

module.exports = createTemplate
