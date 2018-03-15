'use strict'
const yo = require('yo-yo')

module.exports = new Promise(function (resolve, reject){
  let template = yo`
    <footer class="footer">
    </footer>
  `
  return resolve(template)
})