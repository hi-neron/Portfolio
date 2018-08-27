const imagesLoader = require('imagesloaded')
const loader = require('../../../loader')
const yo = require('yo-yo')

class Type {
  constructor (data) {
    this.type = data.type.toLowerCase()
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
    let subtype = broken[0]

    // item grid size
    let q = broken[1]? `-${broken[1]}` : ''

    let style = `${data.type}-${subtype}${q}`.toLowerCase()

    data.style = style
    data.size = q

    super(data)
    this.subtype = data.subtype
    this.url = data.url
    this.images = data.images
    this.captionPos = data.captionPos // 'left:top'
    this.backgroundLabel = data.background

    // build template
    this.subtype === 'Dual' ? this.dualTemplateConstructor() : this.singleTemplateConstructor()
  }

  imagesReady (cb) {
    let _this_ = this
    imagesLoader(this.container, (m) => {
      if (m.hasAnyBroken) return cb (m)
      _this_.loaderContainer.remove()
      cb (null, 'content loaded')
    })
  }

  getCaption(data) {
    let caption = ''

    if (data) {
      caption = yo`
        <div className="project-image-caption">
          ${data}
        </div>
      `
    }

    return caption
  }

  getSuperCaption (data) {
    let superCaption = ''

    if (data) {
      superCaption = yo`
        <div className="project-image-supercaption">
          ${data}
        </div>
      `
    }
    
    return superCaption
  }

  getSingleCaptions() {
    let superCaption = this.getSuperCaption(this.superCaption)
    let caption = this.getCaption(this.caption)

    let template = yo`
      <figcaption className="project-image-captions">
        ${superCaption}
        ${caption}
      </figcaption>
    `
    return template
  }

  dualTemplateConstructor () {
    let wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'project-image-dual-wrapper')

    let _this_ = this

    this.images.map((e) => {
      let caption = _this_.getCaption(e.caption)

      switch (e.captionPos) {
        case 'top':
          caption.style.top = '16px'
          break;
        case 'bottom':
          caption.style.bottom = '16px'
          break;
        default:
          caption.style.top = '16px'
          break;
      }

      if (e.background) {
        caption.style.backgroundColor = `${_this_.colors[0]}`
        caption.style.color = `${_this_.colors[1]}`
      }

      let template = yo`
        <figure className="project-dual-image">
          <img src="${e.url}" alt="" className="project-image-img"/>
          ${caption}
        </figure>
      `
      wrapper.appendChild(template)
    })

    this.container.appendChild(this.loaderContainer)
    this.container.appendChild(wrapper)
  }

  singleTemplateConstructor () {
    let wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'project-image-wrapper')


    let captions = this.getSingleCaptions()

    // set styles
    // this.captionPos
    // this.backgroundLabel

    if (this.backgroundLabel) {
      captions.style.backgroundColor = `${this.colors[0]} !important`
      captions.style.color = `${this.colors[1]} !important`
    }

    switch (this.captionPos) {
      case 'top':
        captions.style.top = '16px'
        break;
      case 'bottom':
        captions.style.bottom = '0px'
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
    let preSubtype = data.subtype
    let broken = preSubtype.split(':')
    let subtype = broken[0].toLowerCase()

    // item grid size
    let q = broken[1]? `-${broken[1]}` : ''

    let style = `${data.type}-${subtype}${q}`.toLowerCase()

    data.style = style
    data.size = q

    console.log(data)
    super(data)
    this.subtype = data.subtype
    this.url = data.url
    this.text = data.text
    this.data = data.data
    this.subdata = data.subdata
    this.backgroundLabel = data.background
    this.caption = data.caption || null

    // link
    if (subtype === 'link') {
      this.linkType = broken[1] ? broken[1] : 'link'
    }

    switch (subtype) {
      case 'link':
        this.linkTemplateConstructor()
        break;
      case 'quote':
        this.quoteTemplateConstructor()
        break;
      default:
        this.textTemplateConstructor()
        break;
    }
  }
  // toogle colors
  setColor (template) {
    if (this.backgroundLabel) {
      template.style.backgroundColor = `${this.colors[1]}`
      template.style.color = `${this.colors[0]}`
    }

    return template
  }

  textTemplateConstructor() {
    let wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'project-text-wrapper')

    let template = yo`
      <div className="project-${this.type}">
        ${this.text}
      </div>
    `

    this.setColor(wrapper)

    wrapper.appendChild(template)
    this.container.appendChild(wrapper)
  }

  linkTemplateConstructor() {
    let wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'project-text-wrapper')

    let link = yo`
      <a href="${this.url}" target="_blank">
        ${this.text}
      </a>
    `

    let file = ''

    if (this.linkType === 'download') {
      let broken = this.url.split('/')
      file = broken[broken.length - 1]
    }

    let linkContainer = yo`
      <div className="link-container">
        ${link}
        <p>
          <i class="icon-${this.linkType}"></i>
          ${file}
          ${this.caption ? this.caption : ''}
        </p>
      </div>
    `
    let template = yo`
      <div className="project-link">
        ${linkContainer}
      </div>
    `

    link.style.color = `${this.colors[2]}`
    linkContainer.style.color = `${this.colors[2]}`

    this.setColor(wrapper)

    wrapper.appendChild(template)
    this.container.appendChild(wrapper)
  }

  quoteTemplateConstructor() {
    let wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'project-text-wrapper')
    // if exists a subdata
    let subdataTemplate = yo`
      <span className="quote-subdata">
        ${this.subdata}
      </span>
    `
    let subdata = this.subdata ? subdataTemplate : null

    let quoteContainer = yo`
      <div className="quote-container">
        <p class="quote-body">
          <div className="quote-text">${this.text}</div>
          <div className="quote-label">
            <span className="quote-data">${this.data}</span>
            ${subdataTemplate}
          </div>
        </p>
      </div>
    `

    let template = yo`
      <div className="project-quote">
        ${quoteContainer}
      </div>
    `

    this.setColor(wrapper)

    wrapper.appendChild(template)
    this.container.appendChild(wrapper)
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
