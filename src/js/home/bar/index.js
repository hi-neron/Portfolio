const yo = require('yo-yo')

let template = yo`
  <aside id="main-bar">
    <div class="bar-wrapper">
    <div id="bar-trigger">bar</div>
    </div>
  </aside>
`

{/* <div class="menu">
<ul class="bar-list">
  <li class="bar-item">
    <a href="#">shelf</a>
  </li>
  <li class="bar-item">
    <a href="#">contact</a>
  </li>
</ul>
</div> */}

module.exports = function (ctx, next) {
  ctx.bar = template
  next()
}