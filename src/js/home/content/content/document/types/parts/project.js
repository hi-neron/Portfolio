const Type = require('./type')

class Text extends Type {
  constructor (data) {
    super(data)
  }
}

class Image extends Type {
  constructor (data) {
    super(data)
  }
}

class Interface extends Type {
  constructor (data) {
    super(data)
  }
}

module.exports = {
  Image,
  Text,
  Interface
}