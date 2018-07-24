'use strict'
const yo = require('yo-yo')
const socialButtons = require('../../social')

module.exports = function (cb){
  let template = yo`
    <footer class="footer">
      <div class="footer-wrapper">
        <p class="footer-content-mail">
        <a href="mailto:hola@josesan.ch" className="footer-mailto">hola@josesan.ch</a>
        </p>
        <p class="footer-content-socialButtons">
        ${socialButtons()}
        </p>
        <p class="footer-content-rights">
          2018 / All rights reserved
        </p>
      </div>
    </footer>
  `
  cb(null, template)
}