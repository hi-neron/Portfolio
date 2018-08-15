const Illustration = require('./parts/illustration')
const Project = require('./parts/project')

class Content {
  constructor (data) {
    this.type = data.type
    this.template = null
    this.super = data.super

    // set class
    this.style = `${this.super}-${this.type}`
    this.container = document.createElement('div')
    this.container.setAttribute('class', this.style)

    switch (this.style) {
      case 'project-image-single':
        console.log('i')
        break;
      case 'project-text-short':
        console.log('t')
        break;
      case 'project-text-link':
        console.log('in')
        break;
      case 'project-image-dual':
        console.log('in')
        break;
      case 'project-text-quote':
        console.log('in')
        break;
      default:
        console.log('type Not Found')
        break;
    }
  }
}



module.exports = Content
