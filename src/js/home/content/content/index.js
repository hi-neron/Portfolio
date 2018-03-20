'use strict'

const yo = require('yo-yo')

function articleGen(data) {
  let template = yo`
    <div class="grid-item ${data.important? 'grid-item-widthx2': ''}" title="${data.title}">
      <img data-src="${data.pictures.main.url}" alt="${data.pictures.main.comment}">
      <h4 class="article-label">${data.title}</h4>
    </div>
  `
  return template
}

function createTemplate (items, cb) {
  let articleTemplate

  let main = yo`
    <div class="main-content-wrapper">
      <div class="grid-sizer"></div>
    </div>
  `

  for (let i = 0; i < items.length; i++) {
    articleTemplate = articleGen(items[i])
    main.appendChild(articleTemplate)
  }

  let response = {
    main
  }

  cb(null, response)
}

module.exports = createTemplate
