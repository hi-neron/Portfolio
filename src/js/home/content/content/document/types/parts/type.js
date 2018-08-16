const imagesLoader = require('imagesloaded')

class Types {
  constructor (data) {
    this.type = data.type
    this.template = null
  }

  loaderGenerator () {
    let loaderContainer = yo`
      <div className="front-loader">
        ${loader()}
      </div>
    `
    let _this_ = this
    templateConstructor((err, template) => {
      _this_.object = template
      imagesLoader(template, () => {
        empty(loaderContainer)
      })
    })
  }
}

module.exports = Types