'use strict'

const yo = require('yo-yo')
const _ = require('lodash')
const empty = require('empty-element')

// resize event for intro
const introR = require('../../intro/world').onWindowResize
const setNewWindowSize = require('../../').setNewWindowSize

// ventana de contenidos
let contentContainer = document.createElement('div')
contentContainer.setAttribute('id', 'article-content')
document.body.appendChild(contentContainer)

var screen = false

let articlesList = []

function resizeEvents () {
  articlesList.map(articleMap)
}

function articleMap (article) {
  article.cbFont()
}

// Different class for each one article
function toColor (color) {
  return color === 0? '#000000' : `#${color.toString(16)}`
}

function toColorRGB (color) {
  color = color.slice(1)
  let r = parseInt(color.slice(0, 2), 16)
  let g = parseInt(color.slice(2, 4), 16)
  let b = parseInt(color.slice(4, 6), 16)
  
  let colorRGB = [r, g, b]

  return colorRGB
}

class NewStyle {
  constructor (color) {
    this.className = `article-${color[0]}`

    // colors
    this.color = toColor(color[0])
    this.contrastColor = toColor(color[1])

    this.colorRGB = toColorRGB(this.color)

    this.letter = this.letterColor()
    this.back = this.backColor()
    this.smallBack = this.smallBackColor()
    this.overLetter = this.overLetterColor()

  }

  letterColor () {
    let style = document.createElement('style')
    let className = `${this.className}-letter-color`
    style.type = 'text/css'
    style.innerHTML = `.${className} { color: ${this.contrastColor} !important;}`
    document.getElementsByTagName('head')[0].appendChild(style)

    return className
  }

  backColor () {
    let style = document.createElement('style')
    let className = `${this.className}-back-color`
    style.type = 'text/css'
    style.innerHTML = `.${className} { background-color: ${this.color} !important;}`
    document.getElementsByTagName('head')[0].appendChild(style)
    return className
  }

  smallBackColor () {
    let style = document.createElement('style')
    let className = `${this.className}-small-back-color`
    style.type = 'text/css'
    style.innerHTML = `.${className} { background-color: ${this.contrastColor} !important;}`
    document.getElementsByTagName('head')[0].appendChild(style)

    return className
  }
  overLetterColor () {
    let style = document.createElement('style')
    let className = `${this.className}-small-letter-color`
    style.type = 'text/css'
    style.innerHTML = `.${className} { color: ${this.color} !important;}`
    document.getElementsByTagName('head')[0].appendChild(style)

    return className
  }

}

class Article {
  constructor (data) {
    // basic info
    let endWord = data.endWord ? data.endWord : 'fin'

    this.title = data.title
    this.type = data.type
    this.keywords = data.keywords
    this.content = data.content
    this.pictures = data.pictures
    this.important = data.important
    this.intro = data.intro
    this.endWord = endWord
    this.open = false

    // set colors theme
    this.color = data.colors ? data.colors : [0xEAEAEA, 0x1E1E1E]

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

  // Set new font size according to parent width
  setFontSize (cb) {
    // reset
    this.titleContainer.style.width = null
    this.titleContainer.style.fontSize = null
    
    // let master size
    let masterSize = window.innerWidth
    if (masterSize > 582 && masterSize < 1090 && this.titleContainer.offsetWidth > masterSize / 2 + 30) {
      this.titleContainer.style.fontSize = '4.3rem'
    }

    
    // parents sizes
    let parentWidth = this.smallView.offsetWidth
    let parentHeight = this.smallView.offsetHeight

    // title size
    let titleWidth =  this.titleContainer.offsetWidth
    let titleHeight =  this.titleContainer.offsetHeight

    // font size
    let fontSize = parseInt(window.getComputedStyle(this.titleContainer).fontSize, 10)
    let idealHeight = parentHeight * 0.55

    this.keywordsContainer.classList.add('show-keywords')
    
    // el numero ideal es maximo 70% de la altura
    while (titleHeight > idealHeight) {
      // si se pasa aumentar el ancho
      // si el ancho no alcanza reducir el tamaño de la fuente
      // evaular si paso
      // console.log(idealHeight, titleHeight)
      titleHeight =  this.titleContainer.offsetHeight

      if (titleWidth < parentWidth - 60) {
        titleWidth = titleWidth + 2
        this.titleContainer.style.width = `${titleWidth}px`
      } else if ( fontSize >= 22 ) {
        fontSize = fontSize - 1
        this.titleContainer.style.fontSize = `${fontSize}px`
      } else {
        idealHeight = idealHeight + 2
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
    this.articleLoader = yo`
      <div className="over-article-loader">
      </div>
    `
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
    <div class="over-article-title">
      ${this.title}
    </div>
    `
      
      let over = yo`
      <div class="over-article-container">
        <div class="over-article-wrapper">
          <div class="over-article-top">
            ${this.titleContainer}
            ${this.typeContainer}
          </div>
          <div class="over-article-bottom">
            ${this.keywordsContainer}
          </div>
        </div>
        ${this.articleLoader}
      </div>
    `

    let important = this.important ? 'grid-item-widthx2': ''

    let template = yo`
      <article class="grid-item ${important}" title="${this.title}">
        <div class="article-content">
          ${over}
          <img class="images-to-load" data-src="${this.mainPicture.url}" src="${this.mainPicture.url}" alt="${this.mainPicture.comment}">
        </div>
      </article>
    `

    let _this = this

    template.addEventListener('click', (e) => {
      const drawArticle = require('../../').drawArticles
      if (e.target.classList.contains('over-article-word')){
        let data = e.target.getAttribute('data-keyword')
        return drawArticle(data)
      } else {
        _this.screenActivate()
      }
    })

    this.smallView = template
  }

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

  // Article view
  createContent(cb) {
    // crea la plantilla del item abierto

    // Main container
    let articleContent = document.createElement('article')
    articleContent.setAttribute('class', 'article-content-readable')

    // keywords template generator
    let keywordsTemplate = document.createElement('div')
    keywordsTemplate.setAttribute('class', 'article-keywords')

    let keyword 
    
    let cStyle = new NewStyle(this.color)

    keywordsTemplate.classList.add(cStyle.smallBack)

    // each one keyword template generator
    for (let i = 0; i < this.keywords.length; i++) {
      let keyword = this.keywords[i]
      let oneKeyword = yo`
        <span class="article-one-keyword ${cStyle.overLetter}">
            ${keyword}
        </span>
      `

      keywordsTemplate.appendChild(oneKeyword)
    }

    // header
    let articleTitle = yo`
      <header class="article-header">
        <div class="article-header-top">
          <figure class="article-main-image">
            <img src="${this.mainPicture.urlXX}">
          </figure>
          <div className="article-content-title-container">
            <h1 class="article-content-title article-item ${cStyle.letter}">
              <span style="background-color:rgba(${cStyle.colorRGB}, 0.85)" >
                ${this.title}
              </span>
            </h1>
            <div class="article-content-type-container">
              <div class="article-content-type">
                ${this.type}
              </div>
            </div>
          </div>
        </div>

        <div class="article-subtitle-container">
          <div class="article-subtitle ${cStyle.letter}">
            ${this.intro}
            <div className="article-keywords-container ">
              ${keywordsTemplate}
            </div>
          </div>
        </div>
      </header>
    `

    // trigger to close
    let close = yo`
      <div class="article-closer-container">
        <div class="article-close-line line-one">
        </div>
        <div class="article-close-line line-two">
        </div>
      </div>
    `

    articleContent.appendChild(articleTitle)

    // Content constructor
    for (let i = 0; i < this.content.length; i++) {
      let form
      let p = yo`
      <div class="article-content-paragraph article-item ${cStyle.letter}">
        <p>
          ${this.content[i]}
        </p>
      </div>`

      if (this.othersPictures[i]) {
        switch (this.othersPictures[i].type) {
          case 'image':
            form = yo`
              <figure class="article-content-picture article-item">
                <div className="article-content-picture-container">
                  <img src="${this.othersPictures[i].url}" alt="${this.othersPictures[i].name}">
                </div>
                <figcaption class="${cStyle.letter}">${this.othersPictures[i].comment}</figcaption>
              </figure>
            `
            break;

          case 'image2':
            form = yo`
              <figure class="article-content-picture-xl article-item">
                <img src="${this.othersPictures[i].url}" alt="${this.othersPictures[i].name}">
                <figcaption class="${cStyle.letter}">${this.othersPictures[i].comment}</figcaption>
              </figure>
            `
            break;

          case 'quote':
            form = yo`
              <div class="article-content-quote article-item ${cStyle.letter}">
                <p>
                  <q>
                    ${this.othersPictures[i].text}
                  </q>
                </p>
              </div>
            `
            break;

          default:
            form = ''
            break;
        }

        articleContent.appendChild(form)
      }
      
      articleContent.appendChild(p)
    }

    // main template of open article
    let template = yo`
      <div class="article-content-wrapper ${cStyle.back}">
        ${close}
        <div class="article-content-info">
          ${articleContent}
        </div>
        <footer class="article-content-footer ${cStyle.letter}">
          ${this.endWord}
        </footer>
      </div>
    `

    close.addEventListener('click', (e) => {
      screenSplashClose()
    })

    cb(template)
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
