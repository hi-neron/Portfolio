const imagesLoader = require('imagesloaded')
const loader = require('../../../loader')
const yo = require('yo-yo')

class Type {
  constructor (data) {
    this.type = data.type
    this.style = data.style
    this.container = data.container
    this.size = data.size
    this.caption = data.caption
    this.superCaption = data.superCaption
    this.colors = data.colors

    this.loaderContainer = document.createElement('div')
    this.loaderContainer.setAttribute('class', 'content-loader')

    this.loaderContainer.appendChild(loader())

    this.loaderContainer.style.backgroundColor = this.colors[0]

    // set container
    this.container = document.createElement('div')
    this.container.setAttribute('class', this.style)
  }

}

class Image extends Type {
  constructor (data) {
    let preSubtype = data.subtype
    let broken = preSubtype.split(':')
    console.log(broken)
    let subtype = broken[0]

    // item grid size
    let q = broken[1]? `-${broken[1]}` : ''

    let style = `${data.type}-${subtype}${q}`.toLowerCase()

    data.style = style
    data.size = q

    super(data)
    this.subtype = data.subtype
    this.url = data.url
    this.captionPos = data.captionPos // 'left:top'
    this.backgroundLabel = data.background

    // build template
    this.templateConstructor()
  }

  imagesReady (cb) {
    let _this_ = this
    imagesLoader(this.container, (m) => {
      if (m.hasAnyBroken) return cb (m)
      setTimeout(() => {
        _this_.loaderContainer.remove()
        console.log('loader removed')
        cb (null, 'content loaded')
      }, 400);
    })
  }

  templateConstructor () {
    let wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'project-image-wrapper')

    let superCaption = ''

    if (this.superCaption) {
      superCaption = yo`
        <div className="project-image-supercaption">
          ${this.superCaption}
        </div>
      `
    }

    let caption = ''

    if (this.caption) {
      caption = yo`
        <div className="project-image-caption">
          ${this.caption}
        </div>
      `
    }

    let captions = yo`
      <figcaption className="project-image-captions">
        ${superCaption}
        ${caption}
      </figcaption>
    `

    // set styles
    // this.captionPos
    // this.backgroundLabel

    if (this.backgroundLabel) {
      captions.style.backgroundColor = `${this.colors[0]} !important`
      captions.style.color = `${this.colors[1]} !important`
    }

    console.log(this.captionPos)
    switch (this.captionPos) {
      case 'top':
        captions.style.top = '16px'
        break;
      case 'bottom':
        captions.style.bottom = '16px'
        break;
      default:
        captions.style.top = '16px'
        break;
    }

    let template = yo`
      <figure className="project-image">
        <img src="${this.url}" alt="" className="project-image-img"/>
        ${captions}
      </figure>
    `

    wrapper.appendChild(template)
    this.container.appendChild(this.loaderContainer)
    this.container.appendChild(wrapper)
  }
}

class Text extends Type {
  constructor (data) {
    super(data)
  }

  templateConstructor() {
    let container = document.createElement('div')
    container.setAttribute('class', this.type)
  }
}

class Interface extends Type {
  constructor (data) {
    super(data)
  }
}

class illustration extends Type {}
class legend extends Type {}


module.exports = {
  Image,
  Text,
  Interface,
  illustration,
  legend
}
