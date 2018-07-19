function create(ctx, next) {
  let app = document.createElement('div')
  app.setAttribute('id', 'app')
  ctx.app = app

  let phrase = document.createElement('section')
  phrase.setAttribute('class', 'first-phrase')
  ctx.phrase = phrase

  let bar = document.createElement('nav')
  bar.setAttribute('id', 'main-bar')
  ctx.bar = bar

  let mainContent = document.createElement('section')
  mainContent.setAttribute('id', 'main-content')
  ctx.mainContent = mainContent
  
  let cv = document.createElement('section')
  cv.setAttribute('id', 'cv')
  ctx.cv = cv
  
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
  app.appendChild(cv)
  app.classList.add('no-overflow')
  document.body.appendChild(bar)
  document.body.appendChild(app)
  next()
}

module.exports = create