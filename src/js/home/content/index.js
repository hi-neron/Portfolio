const drawMainTemplate = require('./content').createTemplate
const footer = require('./footer')
const _ = require('lodash')
const yo = require('yo-yo')

function getFooter (cb) {
  footer((e, r) => {
    if (e) return new Error({message: 'an error has ocurred'})
    cb(null, r)
  })
}

function getMainContent (tag, cb) {
  // obtiene los items
  getItems(tag, (e, items) => {
    // los dibuja en un remplate
    drawMainTemplate(items, (e, r) => {
      if (e) return new Error({message: 'Error creating template of main contents'})
      // entrega el template, y una funcion para inicializar los tamaños
      cb(null, r)
    })
  })
}

function getItems(tag, cb) {
  let items = require('./articles')
  let result = []
  let ev = new CustomEvent('tagChange')

  
  if (tag) {
    for (let i = 0; i < items.length; i++) {
      
      let keywords = items[i].keywords.toLowerCase()
      keywords = keywords.split(', ')
      let articleTags = keywords
      
      if(_.indexOf(articleTags, tag) != -1) {
        result.push(items[i])
      }
    }
  }

  ev.tag = tag

  if (result.length > 0) {
    items = result
    ev.message = 'Palabra clave: '
  } else {

    if (tag) {
      ev.message = 'palabra clave '
      ev.alert = 'no encontrada:'

    } else {
      ev.message = "Todo aquí,"
    }

    ev.tag = ev.message === 'todo aquí,' ? " es proyecto" : tag
    items = items
  }

  window.dispatchEvent(ev)

  items = result.length > 0 ? result: items
  cb(null, items)
}

module.exports = {
  getFooter,
  getMainContent
}