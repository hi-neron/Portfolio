'use strict'
const yo = require('yo-yo')

module.exports = function (cb){
  let template = yo`
    <footer class="footer">
      <div class="footer-wrapper">
        <div class="footer-logo">
        </div>
        <div class="footer-contact">
        </div>
        <div class="footer-social">
        </div>
      </div>
    </footer>
  `
  cb(null, template)
}