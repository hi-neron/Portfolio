const contentType = require('./types')
const yo = require('yo-yo')
const loader = require('../loader')
const imagesLoaded = require('imagesloaded')

// Set stile for document contents
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

class Document {
  constructor (data) {
    /* This utility create a template, according article type */
    // main
    this.content = data.content
    this.title = data.title
    this.subtitle = data.subtitle
    this.mainPicture = data.mainPicture
    this.keywords = data.keywords
    this.abstract = data.abstract
    this.colors = data.colors

    // save content objects
    this.contentToWait = []

    // set template
    this.type = data.type

    // first view
    this.front = data.front
    
    // utilities
    this.endWord = data.endWord

    this.build()
    // create template according to type
  }
  
  createStyle (name, letter = 1, background = 0, custom) {
    let backgroundColor = this.colors[background]
    let letterColor = this.colors[letter]

    letterColor = !letterColor ? this.colors[0]: letterColor

    let style = document.createElement('style')
    let className = `document-${name}-style`

    style.type = 'text/css'
    if (custom) {
      style.innerHTML = custom
    } else {
      style.innerHTML = `.${className} {
        color: ${letterColor} !important;
        background-color: ${backgroundColor} !important;
      }`
    }

    document.getElementsByTagName('head')[0].appendChild(style)
    return style
  }

  // Build container
  build() {
    // Build container
    this.container = document.createElement('div')
    this.container.setAttribute('class', 'document')

    // create a main style
    this.mainStyle = this.createStyle('main')

    switch (this.type) {
      case 'illustration':
        this.container.classList.add('document-illustration')
        this.constructIllustration()
        break;
      case 'project':
        this.container.classList.add('document-project', 'document-main-style')
        this.constructProject()
        break;
        default:
        this.container.classList.add('document-project', 'document-main-style')
        this.constructProject()
        break;
    }
  }

  constructProject() { 
    // Front-page
    let front = this.frontCreator()

    // Abstract
    let abstract = this.abstractCreator()

    // add Items
    this.container.appendChild(front)
    this.container.appendChild(abstract)

    // Contents
    let content = this.content

    for (let i = 0; i < content.length; i++) {
      let actual = content[i]
      actual.super = this.type
      actual.colors = this.colors
      let newContent = new contentType(actual)
      if (actual.type === 'Image') {
        this.contentToWait.push(newContent)
      }
      try {
        this.container.appendChild(newContent.container)
      } catch (e) {
        console.log(e, `element: ${actual} cant build`)
      }
    }

    for (let x = 0; x < this.contentToWait.length; x++) {
      this.contentToWait[x].ready((e, m) => {
        if (e) return console.log(e)
        console.log(m)
      })
    }

  }

  frontCreator() {
    // front window
    let front = document.createElement('div')
    front.setAttribute('class', 'document-project-front')

    let styleName = 'front'
    this.createStyle(styleName, this.front.color, this.front.background)

    front.classList.add(`document-${styleName}-style`)

    let typeContainer = yo`
      <div className="document-project-front-type">
        ${this.type}
      </div>
    `

    typeContainer.style.color = this.colors[1]
    typeContainer.style.backgroundColor = this.colors[2]

    let label = yo`
    <div className="document-project-front-top">
      <div className="document-project-front-top-left">
        <h1 className="document-project-front-title">
          ${this.title}
        </h1>
        ${typeContainer}
      </div>
      <div className="document-project-front-top-right">
        <h2 className="document-project-front-subtitle">
          ${this.subtitle}
        </h2>
      </div>
    </div>
    `

    if (this.front.captionPos === 'top') {
      label.classList.add('document-label-top')
    }
    
    let template = yo`
      <div className="document-project-front-container">
        ${label}
        <figure className="document-project-front-imageContainer">
          <img src="${this.front.url}" alt="" className="document-project-front-image"/>
        </figure>
      </div>
    `

    let loaderContainer = yo`
      <div className="front-loader">
        ${loader()}
      </div>
    `

    loaderContainer.style.backgroundColor = this.colors[0]

    front.appendChild(template)
    template.appendChild(loaderContainer)

    imagesLoaded(template, () => {
      loaderContainer.remove()
    })

    return front
  }

  abstractCreator() {
    // abstract window
    let abstract = document.createElement('div')
    abstract.setAttribute('class', 'document-project-abstract')

    let arrow = yo`
    <span className="document-project-abstract-arrow">
      ⟶
    </span>`

    let template = yo`
      <div className="document-project-abstract-container">
        <h3 className="document-project-abstract-content">
          ${this.abstract.content}
          ${arrow}
        </h3>
      </div>
    `

    let letterColor = this.abstract.color
    let backColor = this.abstract.background

    arrow.style.color = `${this.colors[2]}`
    template.style.color = `${this.colors[letterColor]}`
    template.style.backgroundColor = `${this.colors[backColor]}`

    abstract.appendChild(template)

    return abstract
  }

  loaderScreenCreator() {
    let loaderContents = document.createElement('div')
    loaderContents.setAttribute('class', 'document-project-loaderContents')
    loaderContents.appendChild(loader())

    return loaderContents
  }

  constructIllustration() {
    this.container.classList.add('document-illustration')
    // l
  }

}

module.exports = Document
