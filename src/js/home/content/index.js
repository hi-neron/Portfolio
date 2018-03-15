let drawMainTemplate = require('./mainTemplate')
let footer = require('./footer')
let yo = require('yo-yo')
let items = require('./items')

function getFooter () {
  let body = yo`
    <footer class="footer">
      ${footer}
    </footer>
  `
  return body
}

function getMainContent (tag, cb) {
  if (tag) {
    console.log('tag')
  }
  drawMainTemplate(items, (e, r) => {
    if (e) return new Error({message: 'Error creating template of main contents'})
    cb(null, r)
  })
}

module.exports = {
  getFooter,
  getMainContent
}