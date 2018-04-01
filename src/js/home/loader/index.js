const yo = require('yo-yo')

class Loader {
  constructor (ctx){
    this.container = yo`
      <div id="main-loader" class="loader-visible">
        <div class="loader-wrapper">
          <div class="loader-icon">
          </div>
        </div>
      </div>
    `

    this.ctx = ctx
    document.body.appendChild(this.container)
  }
  destroy () {
    this.ctx.app.classList.remove('no-overflow')
    this.container.classList.remove('loader-visible')
  }
}


module.exports = function (ctx, next) {
  let loader = new Loader(ctx)
  ctx.mainLoader = loader
  next()
}