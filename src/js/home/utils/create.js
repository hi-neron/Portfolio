

function create(ctx, next) {
  let app = document.createElement('div')
  app.setAttribute('id', 'app')
  ctx.app = app

  let phrase = document.createElement('section')
  phrase.setAttribute('class', 'first-phrase')
  ctx.phrase = phrase

  let mainContent = document.createElement('section')
  mainContent.setAttribute('id', 'main-content')
  ctx.mainContent = mainContent
  
  let footer = document.createElement('footer')
  footer.setAttribute('id', 'footer')
  ctx.footer = footer

  let introContainer = document.createElement('intro')
  introContainer.setAttribute('id', 'intro')
  ctx.introContainer = introContainer

  app.appendChild(introContainer)
  app.appendChild(phrase)
  app.appendChild(mainContent)
  app.appendChild(footer)
  next()
}

module.exports = create