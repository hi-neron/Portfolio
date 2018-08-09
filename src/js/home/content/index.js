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
      if(_.indexOf(items[i].keywords, tag) != -1) {
        result.push(items[i])
      }
    }
  }

  ev.tag = tag

  if (result.length > 0) {
    items = result
    ev.message = 'Keyword: '
  } else {

    if (tag) {
      ev.message = 'Keyword '
      ev.alert = 'not found:'

    } else {
      ev.message = "Everything here,"
    }

    ev.tag = ev.message === 'Everything here,' ? " that's me." : tag
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