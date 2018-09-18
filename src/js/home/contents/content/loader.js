const yo = require('yo-yo')

module.exports = function () {
  let smoke = yo`
  <div class="caffe-loader-smoke-svg">
    <svg width="30px" height="40px" viewBox="0 0 30 40">
      <defs>
      <linearGradient id="Gradient1" x1="0" y1="0" x2="0" y2="100%">
        <stop id="g-stop1" offset="0%" stop-color="#e6fcff02" />
        <stop id="g-stop2" offset="60%" stop-color="#e6fcff23" />
        <stop id="g-stop3" offset="100%" stop-color="#e6fcff02" />
      </linearGradient>
      </defs>
      <path id="loader-smoke-l" fill="none" stroke-linecap="round" stroke="url(#Gradient1)" stroke-width="3" d="M15,5 Q20,10 15,15 Q10,20 15,25 Q20,30 15,35">
    </svg>
  </div>
  `

  let articleLoader = yo`
  <div className="caffe-loader">
    <div className="caffe-loader-display">
      <div className="caffe-loader-smoke">
        ${smoke}
      </div>
      <div className="caffe-loader-cup">
        <div className="caffe-loader-cup-handle">
        </div>
        <div className="caffe-loader-cup-body">
          <div className="caffe-loader-cup-top">
          </div>
          <div className="caffe-loader-cup-anchor">
            <div className="anchor-top"></div>
            <div className="anchor-body">
              <div className="anchor-top-line"></div>
              <div className="anchor-middle-line"></div>
            </div>
            <div className="anchor-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `

  return articleLoader
}