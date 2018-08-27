const yo = require('yo-yo')
const umbrella = require('./umbrella')

class Loader {
  constructor (ctx){
    let umbrellaIcon = umbrella('hi! wait')

    this.loaderIcon = yo`
    <div class="loader-icon">
      ${umbrellaIcon}
    </div>
    `

    this.screen = yo`
      <div class="screen-black"></div>
    `

    this.container = yo`
      <div id="main-loader" class="loader-visible">
        ${this.screen}
        <div class="loader-wrapper">
          ${this.loaderIcon}
        </div>
      </div>
    `

    this.ctx = ctx
    document.body.appendChild(this.container)
  }

  destroy () {
    this.ctx.app.classList.remove('no-overflow')
    document.body.removeChild(this.container)
  }

  vanish () {
    console.log('vanish')
    // animate dispair

    //this.container.classList.add('')

    this.destroy()
  }
}


module.exports = function (ctx, next) {
  let loader = new Loader(ctx)

  // el loader lo maneja el contexto
  ctx.mainLoader = loader
  next()
}