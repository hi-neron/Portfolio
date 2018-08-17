const Type = require('./parts/type')


class Content {
  constructor (data) {
    this.type = data.type
    this.template = null
    this.super = data.super

    // set class
    this.style = `${this.super}-${this.type}`
    this.container = document.createElement('div')
    this.container.setAttribute('class', this.style)

    let classType = Type[data.type]

    if (classType) {
      this.object = new classType (data)
      this.container = this.object.container
    }
  }

  ready (cb) {
    if (this.type === 'Image') {
      this.object.imagesReady((e, m) => {
        if (e) return cb(e)
        return cb(null, m)
      })
    } else {
      cb(null, m)
    }
  }
}

module.exports = Content
