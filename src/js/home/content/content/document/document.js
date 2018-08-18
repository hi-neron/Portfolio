const contentType = require('./types')
const yo = require('yo-yo')
const loader = require('../loader')
const empty = require('empty-element')
const imagesLoaded = require('imagesloaded')

// To web color
function toColor (color) {
  return color === 0? '#000000' : `#${color.toString(16)}`
}

// Hex color to rgb notation
function toColorRGB (color) {
  color = color.slice(1)
  let r = parseInt(color.slice(0, 2), 16)
  let g = parseInt(color.slice(2, 4), 16)
  let b = parseInt(color.slice(4, 6), 16)
  
  let colorRGB = [r, g, b]

  return colorRGB
}

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

    // save content objects
    this.contentToWait = []

    // set template
    this.type = data.type

    // first view
    this.front = data.front
    
    // utilities
    this.endWord = data.endWord

    // colors
    this.colors = data.colors.map((c) => {
      return toColor(c)
    })

    console.log(this.colors, data)
    
    this.build()
    // create template according to type
  }
  
  createStyle (name, def = 1, custom) {
    let backgroundColor = this.colors[0]
    let letterColor = this.colors[def]

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

    // Close trigger creator
    this.closeCreator()

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
    this.container.appendChild(this.close)

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

  closeCreator() {
    // Close window
    this.close = document.createElement('div')
    this.close.setAttribute('class', 'document-close')

    let closeContainer = yo`
      <div class="document-close-container">
        <div class="document-close-line line-one">
        </div>
        <div class="document-close-line line-two">
        </div>
      </div>
    `

    this.close.appendChild(closeContainer)
  }

  frontCreator() {
    // front window
    let front = document.createElement('div')
    front.setAttribute('class', 'document-project-front')

    let styleName = 'front'
    this.createStyle(styleName, 0)

    front.classList.add(`document-${styleName}-style`)

    let label = yo`
    <div className="document-project-front-top">
      <div className="document-project-front-top-left">
        <h1 className="document-project-front-title">
          ${this.title}
        </h1>
        <div className="document-project-front-type">
          ${this.type}
        </div>
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
      setTimeout(() => {
        loaderContainer.remove()
      }, 3000)
    })

    return front
  }

  abstractCreator() {
    // abstract window
    let abstract = document.createElement('div')
    abstract.setAttribute('class', 'document-project-abstract')

    let template = yo`
      <div className="document-project-abstract-container">
        <h3 className="document-project-abstract-content">
          ${this.abstract}
        </h3>
      </div>
    `

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

  //   // crea la plantilla del item abierto

  //   // Main container
  //   let articleContent = document.createElement('article')
  //   articleContent.setAttribute('class', 'article-content-readable')

  //   // keywords template generator
  //   let keywordsTemplate = document.createElement('div')
  //   keywordsTemplate.setAttribute('class', 'article-keywords')

  //   let keyword 
    
  //   let cStyle = new NewStyle(this.color)

  //   keywordsTemplate.classList.add(cStyle.smallBack)

  //   // each one keyword template generator
  //   for (let i = 0; i < this.keywords.length; i++) {
  //     let keyword = this.keywords[i]
  //     let oneKeyword = yo`
  //       <span class="article-one-keyword ${cStyle.overLetter}">
  //           ${keyword}
  //       </span>
  //     `

  //     keywordsTemplate.appendChild(oneKeyword)
  //   }

  //   // header
  //   let articleTitle = yo`
  //     <header class="article-header">
  //       <div class="article-header-top">
  //         <figure class="article-main-image">
  //           <img src="${this.mainPicture.urlXX}">
  //         </figure>
  //         <div className="article-content-title-container">
  //           <h1 class="article-content-title article-item ${cStyle.letter}">
  //             <span style="background-color:rgba(${cStyle.colorRGB}, 0.85)" >
  //               ${this.title}
  //             </span>
  //           </h1>
  //           <div class="article-content-type-container">
  //             <div class="article-content-type">
  //               ${this.type}
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div class="article-subtitle-container">
  //         <div class="article-subtitle ${cStyle.letter}">
  //           ${this.intro}
  //           <div className="article-keywords-container ">
  //             ${keywordsTemplate}
  //           </div>
  //         </div>
  //       </div>
  //     </header>
  //   `

  //   articleContent.appendChild(articleTitle)

  //   // Content constructor
  //   for (let i = 0; i < this.content.length; i++) {
  //     let form
  //     let p = yo`
  //     <div class="article-content-paragraph article-item ${cStyle.letter}">
  //       <p>
  //         ${this.content[i]}
  //       </p>
  //     </div>`

  //     if (this.othersPictures[i]) {
  //       switch (this.othersPictures[i].type) {
  //         case 'image':
  //           form = yo`
  //             <figure class="article-content-picture article-item">
  //               <div className="article-content-picture-container">
  //                 <img src="${this.othersPictures[i].url}" alt="${this.othersPictures[i].name}">
  //               </div>
  //               <figcaption class="${cStyle.letter}">${this.othersPictures[i].comment}</figcaption>
  //             </figure>
  //           `
  //           break;

  //         case 'image2':
  //           form = yo`
  //             <figure class="article-content-picture-xl article-item">
  //               <img src="${this.othersPictures[i].url}" alt="${this.othersPictures[i].name}">
  //               <figcaption class="${cStyle.letter}">${this.othersPictures[i].comment}</figcaption>
  //             </figure>
  //           `
  //           break;

  //         case 'quote':
  //           form = yo`
  //             <div class="article-content-quote article-item ${cStyle.letter}">
  //               <p>
  //                 <q>
  //                   ${this.othersPictures[i].text}
  //                 </q>
  //               </p>
  //             </div>
  //           `
  //           break;

  //         default:
  //           form = ''
  //           break;
  //       }

  //       articleContent.appendChild(form)
  //     }
      
  //     articleContent.appendChild(p)
  //   }

  //   // main template of open article
  //   let template = yo`
  //     <div class="article-content-wrapper ${cStyle.back}">
  //       ${close}
  //       <div class="article-content-info">
  //         ${articleContent}
  //       </div>
  //       <footer class="article-content-footer ${cStyle.letter}">
  //         ${this.endWord}
  //       </footer>
  //     </div>
  //   `

  //       // trigger to close

  //   cb(template)
  // }