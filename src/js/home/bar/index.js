const yo = require('yo-yo')
const empty = require('empty-element')

let tag = yo`<span class="tag"></span>`
let message = yo`<span class="message"></span>`

let template = yo`
  <aside id="main-bar">
    <div class="bar-wrapper">
      <div id="bar-trigger">
        <div class="icon">△</div>
        <div class="tag-info">
          ${message}
          ${tag}
        </div>
      </div>
    </div>
  </aside>
`

/* <div class="menu">
<ul class="bar-list">
  <li class="bar-item">
    <a href="#">shelf</a>
  </li>
  <li class="bar-item">
    <a href="#">contact</a>
  </li>
</ul>
</div> */

window.addEventListener('tagChange', (e) => {
  let newTag = e.tag
  let newMessage = e.message

  empty(tag).innerHTML = newTag ? newTag: ''
  empty(message).innerHTML = newMessage
})

module.exports = function (ctx, next) {
  ctx.bar = template
  next()
}