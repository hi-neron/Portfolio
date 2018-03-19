const drawMainTemplate = require('./content')
const footer = require('./footer')
const _ = require('lodash')

const yo = require('yo-yo')

function getFooter () {
  let body = yo`
    <footer class="footer">
      ${footer}
    </footer>
  `
  return body
}

function getMainContent (tag, cb) {
  getItems(tag, (e, items) => {
    drawMainTemplate(items, (e, r) => {
      if (e) return new Error({message: 'Error creating template of main contents'})
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
    ev.message = tag ? `Keyword not found: ` : 'All'
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