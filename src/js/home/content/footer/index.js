'use strict'
const yo = require('yo-yo')

module.exports = function (cb){
  let template = yo`
    <footer class="footer">
      .dat
    </footer>
  `
  cb(null, template)
}