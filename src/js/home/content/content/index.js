'use strict'

const yo = require('yo-yo')
const _ = require('lodash')
const empty = require('empty-element')

// ventana de contenidos
let contentContainer = document.createElement('div')
contentContainer.setAttribute('id', 'article-content')
document.body.appendChild(contentContainer)
var screen = false

class Article {
  constructor (data) {
    // basic info
    this.title = data.title
    this.type = data.type
    this.keywords = data.keywords
    this.content = data.content
    this.pictures = data.pictures
    this.important = data.important
    this.open = false

    //view content
    this.viewContent = _.truncate(this.content, {
      'length': 100,
      'separator': ' '
    })
    
    // pictures
    this.mainPicture = this.pictures.main
    this.othersPictures = this.pictures.others ? this.pictures.others : null
    
    // content
    let paragraphs = _.split(this.content, /\n/gim)
    this.content = paragraphs

    this.templateViewGenerator()
  }

  templateViewGenerator () {
    let keywords = yo`
      <div class="over-article-keywords">
      </div>
      `

    for(let i = 0; i < this.keywords.length; i++) {
      let myKeyword = this.keywords[i]
      let template = yo`
        <span class="over-article-keyword">
          <span class="over-article-word" data-keyword="${myKeyword}">${myKeyword}</span>
        </span>
      `
      keywords.appendChild(template)
    }

    let over = yo`
      <div class="over-article-container">
        <div class="over-article-wrapper">
          <div class="over-article-top">
            ${keywords}
          </div>
          <div class="over-article-bottom">
            <div class="over-article-content">
            ${this.viewContent}
            </div>
          </div>
        </div>
      </div>
    `

    let template = yo`
      <article class="grid-item ${this.important? 'grid-item-widthx2': ''}" title="${this.title}">
        <div class="article-content">
          ${over}
          <img data-src="${this.mainPicture.url}" alt="${this.mainPicture.comment}">
        </div>
        <h1 class="article-label">${this.title}</h1>
      </article>
    `

    let _this = this

    template.addEventListener('click', (e) => {
      const drawArticle = require('../../')
      if (e.target.classList.contains('over-article-word')){
        let data = e.target.getAttribute('data-keyword')
        return drawArticle(data)
      } else {
        _this.screenActivate()
      }
    })

    this.smallView = template
  }

  templateContentGenerator () {}

  screenActivate () {
    if (!screen) {
      this.createContent((template) => {
        screenSplashOpen(template)
        screen = true
      })
      // ventana abierta
    } else {
      screenSplashClose()
      screen = false
    }
  }

  createContent(cb) {
    let articleContent = document.createElement('div')
    articleContent.setAttribute('class', 'article-content-readable')

    let close = yo`
    <div class="article-content-close">
      x
    </div>
    `

    let myItems = _.merge(this.content, this.othersPictures)
    console.log(myItems)

    for (let i = 0; i < this.content.length; i++) {
      let p = yo`<p>${this.content[i]}</p>`
      if (this.othersPictures[i]) {
        switch (this.othersPictures[i].type) {
          case 'image':
            break;
          case 'quote':
            break;

          default:
            break;
        }

        let image = yo`
          <figure class="article-content-picture">
            <img src="${this.othersPictures[i].url}" alt="${this.othersPictures[i].name}">
            <figcaption>${this.othersPictures[i].comment}</figcaption>
          </figure>
        `
        articleContent.appendChild(image)
      }
      
      articleContent.appendChild(p)
    }

    let template = yo`
      <div class="article-content-wrapper">
        ${close}
        <header>
          <figure>
            <img src="${this.mainPicture.urlXX}">
            <figcaption>${this.mainPicture.comment}</figcaption>
          </figure>
        </header>
        <div class="article-content-info">
          <h1 class="article-content-title">
            ${this.title}
          </h1>
          ${articleContent}
        </div>
        <footer class="article-content-footer">
          social
          gotoback
          close
        </footer>
      </div>
    `

    close.addEventListener('click', (e) => {
      screenSplashClose()
    })

    cb(template)
  }
}

function screenSplashOpen(template) {
  empty(contentContainer).appendChild(template)
  contentContainer.classList.add('article-open')
}

function screenSplashClose() {
  empty(contentContainer)
  contentContainer.classList.remove('article-open')
  screen = false
}

function createTemplate (items, cb) {
  let article

  let main = yo`
    <div class="main-content-wrapper">
      <div class="grid-sizer"></div>
    </div>
  `

  for (let i = 0; i < items.length; i++) {
    article = new Article(items[i])
    main.appendChild(article.smallView)
  }

  let response = {
    main
  }

  cb(null, response)
}

module.exports = createTemplate
