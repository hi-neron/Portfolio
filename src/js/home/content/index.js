let section = require('./main')
let footer = require('./footer')
let yo = require('yo-yo')

async function contentGenerator () {
  let body = yo`
    <div class="main">
      ${await section}
      ${await footer}
    </div>
  `
  return body
}

module.exports = contentGenerator