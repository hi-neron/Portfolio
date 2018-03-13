const yo = require('yo-yo')


module.exports = new Promise(function (resolve, reject) {
  let template = yo`
    <section class="content">
    </section>
  `
  resolve(template)
})