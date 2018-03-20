'use strict'
const yo = require('yo-yo')

module.exports = function (cb){
  let template = yo`
    <footer class="footer">
      footer
    </footer>
  `
  cb(null, template)
}