'use strict'

const yo = require('yo-yo')
const _ = require('lodash')
const empty = require('empty-element')

// loader caffee
const caffeeLoader = require('./loader')

// ventana de contenidos
let contentContainer = document.createElement('div')
contentContainer.setAttribute('id', 'article-content')
document.body.appendChild(contentContainer)

// Open article
const articleOpen = require('./document/document')

var screen = false

let articlesList = []

function resizeEvents () {
  articlesList.map(articleMap)
}

function articleMap (article) {
  article.cbFont()
}

// set articles grid and create an open article view
class Article {
  constructor (data) {
    // basic info
    let endWord = data.endWord ? data.endWord : 'fin'

    this.title = data.title
    this.subtitle = data.subtitle
    this.type = data.type
    this.keywords = data.keywords
    this.content = data.content
    this.pictures = data.pictures
    this.important = data.important
    this.abstract = data.abstract
    this.endWord = endWord
    this.open = false
    this.front = data.front
    
    // Creation date

    this.date = yo`
      <div className="article-date-container">
        <div className="article-date">
          ${data.date.year}
        </div>
      </div>
    `

    this.date.style.color = data.date.color === 0 ? '#322934' : '#EAEAEA'

    // set colors theme
    this.colors = data.colors ? data.colors : [0xEAEAEA, 0x1E1E1E, 0xFF6F8C]

    // view content
    this.viewContent = _.truncate(this.content, {
      'length': 100,
      'separator': ' '
    })
    
    // pictures
    this.mainPicture = this.pictures.main
    this.othersPictures = this.pictures.others ? this.pictures.others : null

    this.templateViewGenerator()
  }

  // Set new font size according to parent width
  setFontSize (cb) {
    // reset
    this.titleContainer.style.width = null
    this.titleContainer.style.fontSize = null
    
    // let master size
    let masterSize = window.innerWidth
    if (masterSize > 700 && masterSize < 1050 && this.titleContainer.offsetWidth > masterSize / 2 + 30) {
      this.titleContainer.style.fontSize = '4.3rem'
    }

    
    // parents sizes
    let parentWidth = this.smallView.offsetWidth
    let parentHeight = this.smallView.offsetHeight

    // title size

    let titleHeight =  this.titleContainer.offsetHeight

    // font size
    let fontSize = parseInt(window.getComputedStyle(this.titleContainer).fontSize, 10)
    let idealHeight = parentHeight * 0.65

    this.keywordsContainer.classList.add('show-keywords')

    while (titleHeight > idealHeight) {
      titleHeight = this.titleContainer.offsetHeight
      // titleHeight = parseInt(window.getComputedStyle(this.titleContainer).height, 10)
      fontSize = fontSize - 2
      this.titleContainer.style.fontSize = `${fontSize}px`

      if (fontSize < 20) {
        break
      }
    }

    let keySpace = parentHeight - (titleHeight + 55)
    if (keySpace < 80) {
      this.keywordsContainer.classList.remove('show-keywords')
    }

    cb()
  }

  // cb da font 
  cbFont () {
    this.setFontSize (() => {
        this.articleLoader.classList.add('to-show')
    })
  }

  // articles grid container generator
  templateViewGenerator () {
    // loader 
    this.articleLoader = document.createElement('div')
    this.articleLoader.setAttribute('class', 'over-article-loader')
    this.articleLoader.appendChild(caffeeLoader())

    this.keywordsContainer = yo`
      <div class="over-article-keywords">
      </div>
      `

    for(let i = 0; i < this.keywords.length; i++) {
      let myKeyword = this.keywords[i]
      let template = yo`
        <div class="over-article-keyword">
          <span class="over-article-word" data-keyword="${myKeyword}">${myKeyword}</span>
        </div>
      `
      this.keywordsContainer.appendChild(template)
    }
    
    this.typeContainer = yo`
    <div class="over-article-type">
      <span>${this.type}</span>
    </div>
    `

    this.titleContainer = yo`
    <div class="over-article-titles">
      <span className="over-article-title">
        ${this.title}
      </span>
      <span className="over-article-subtitle">
        ${this.subtitle}
      </span>
    </div>
    `
      
      let over = yo`
      <div class="over-article-container">
        <div class="over-article-wrapper">
          <div class="over-article-top">
            ${this.titleContainer}
            ${this.typeContainer}
              <div class="over-article-bottom">
                ${this.keywordsContainer}
              </div>
            </div>
        </div>
      </div>
    `

    let important = this.important ? 'grid-item-widthx2': ''

    let template = yo`
      <article class="grid-item ${important}" title="${this.title}">
        <div class="article-content">
          ${over}
          <img class="images-to-load" data-src="${this.mainPicture.url}" src="${this.mainPicture.url}" alt="${this.mainPicture.comment}">
          ${this.articleLoader}
          ${this.date}
        </div>
      </article>
    `

    let _this = this

    template.addEventListener('click', (e) => {
      const drawArticle = require('../../').drawArticles
      let o = e.target
      if (o.classList.contains('over-article-word')){
        let data = o.getAttribute('data-keyword')
        return drawArticle(data)
      } else {
        if (o.classList.contains('over-article-title') || o.classList.contains('over-article-subtitle')){
          _this.screenActivate()
        } else {
          return
        }
      }
    })

    this.smallView = template
  }

  // Open modalwindow
  screenActivate () {
    if (!screen) {
      screenSplashOpen(this.createContent())
      // ventana abierta
      screen = true
    } else {
      screenSplashClose()
      // ventana cerrada
      screen = false
    }
  }

  // Create open-article template
  createContent() {
    // crea la plantilla del item abierto
    this.createdArticle = new articleOpen(this)
    
    this.createdArticle.close.addEventListener('click', (e) => {
      screenSplashClose()
    })
    
    return this.createdArticle.container
  }
}

let ev = new CustomEvent('articleScreen')

function screenSplashOpen(template) {
  empty(contentContainer).appendChild(template)
  contentContainer.classList.add('article-open')
  // evento que: hace scroll al contenido, elimina la el overflow: hidden.
  window.dispatchEvent(ev)
}

function screenSplashClose() {
  // let scrollTo = document.getElementById('main-content')
  // let pos = getPosition(scrollTo)
  empty(contentContainer)
  contentContainer.classList.remove('article-open')
  window.dispatchEvent(ev)
  // window.scrollTo(0, pos.top);
  screen = false
}

function createTemplate (items, cb) {
  let article
  articlesList = []

  let main = yo`
    <div class="main-content-wrapper">
      <div class="grid-sizer"></div>
    </div>
  `

  for (let i = 0; i < items.length; i++) {
    article = new Article(items[i])
    main.appendChild(article.smallView)
    articlesList.push(article)
  }

  let response = {
    main,
    resizeEvents
  }

  cb(null, response)
}

module.exports = {
  createTemplate, 
  resizeEvents
}
