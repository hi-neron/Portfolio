'use strict'

const yo = require('yo-yo')

class Article {
  constructor (data) {
    this.title = data.title
    this.type = data.type
    this.keywords = data.keywords
    this.content = data.content
    this.pictures = data.pictures
    this.important = data.important
    
    //pictures
    this.mainPicture = this.pictures.main
    this.othersPictures = this.pictures.others ? this.pictures.others : null

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
          [<span class="over-article-word" data-keyword="${myKeyword}">${myKeyword}</span>]
        </span>
      `
      keywords.appendChild(template)
    }

    // look for tag
    // keywords.addEventListener('click', (e) => {
    //   console.log(e.target)
    // })

    let over = yo`
      <div class="over-article-container">
        <div class="over-article-wrapper">
          <div class="over-article-top">
            ${keywords}
          </div>
          <div class="over-article-bottom">
            <div class="over-article-content">
            ${this.content}
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
        console.log(_this.title)
      }
    })

    this.smallView = template
  }

  templateContentGenerator () {}
}

function articleGen(data) {
  let article = new Article (data)
  return article
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
