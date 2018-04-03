const yo = require('yo-yo')
const mojs = require('mo-js')

var nuage = yo`
  <rect class="cls-6-sun" x="0" y="60" width="90" height="3"/>
`
var nuage2 = yo`
  <rect class="cls-6-sun" x="80" y="75" width="90" height="3"/>
`
var circleSun = yo`
  <path class="cls-5-sun" d="M127.6,95.32a46.68,46.68,0,1,0-89.85,0Z"/>
`

const sun = yo`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 165.36 95.32">
  <defs>
    <style>
      .cls-1-sun, .cls-2-sun, .cls-3-sun, .cls-4-sun {
        fill: #ff8725;
      }

      .cls-1-sun {
        opacity: 0.01;
      }

      .cls-2-sun {
        opacity: 0.03;
      }

      .cls-3-sun {
        opacity: 0.06;
      }

      .cls-4-sun {
        opacity: 0.4;
      }

      .cls-5-sun {
        fill: url(#radial-gradient);
      }

      .cls-6-sun {
        fill: #161720;
      }
    </style>
    <radialGradient id="radial-gradient" cx="50" cy="113.33" r="136.54" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ff4f4f"/>
      <stop offset="0.13" stop-color="#ff5351"/>
      <stop offset="0.25" stop-color="#ff5d56"/>
      <stop offset="0.36" stop-color="#ff7060"/>
      <stop offset="0.47" stop-color="#ff896d"/>
      <stop offset="0.54" stop-color="#ff9d77"/>
    </radialGradient>
    <radialGradient id="radial-gradient-2" cx="85" cy="100" r="196.54" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff674"/>
      <stop offset="0.54" stop-color="#ff4f4f"/>
    </radialGradient>
  </defs>
  <title>sunset</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <g>
        <g>
          <path class="cls-1-sun" d="M164.37,95.32A82.68,82.68,0,1,0,1,95.32Z"/>
          <path class="cls-2-sun" d="M152.11,95.32a65.67,65.67,0,0,0,1.25-12.64A70.68,70.68,0,0,0,12,82.68a65.66,65.66,0,0,0,1.24,12.64Z"/>
          <path class="cls-3-sun" d="M139.86,95.32a54.59,54.59,0,0,0,1.5-12.64A58.68,58.68,0,0,0,24,82.68a54.59,54.59,0,0,0,1.5,12.64Z"/>
          <path class="cls-4-sun" d="M127.6,95.32a46.68,46.68,0,1,0-89.85,0Z"/>
        </g>
        ${circleSun}
        ${nuage}
        ${nuage2}
      </g>
    </g>
  </g>
</svg>

`

class Loader {
  constructor (ctx){
    this.loaderIcon = yo`
    <div class="loader-icon">
      ${sun}
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

    this.animate()

    this.ctx = ctx
    document.body.appendChild(this.container)
  }

  animate () {
    let waves = '#ff795f'
    
    this.line1 = new mojs.Shape({
      parent: this.loaderIcon,
      shape: 'line',
      stroke: waves,
      strokeWidth: 3,
      strokeDasharray: 5,
      strokeDashoffset: 3,
      strokeLinecap: 'round',
      y: 9,
      width: 40,
      origin: '50%, 50%',
      x: {'3%': '-3%'},
      isYoyo: true,
      repeat: 999,
      duration: 1000,
    })
    
    this.line2 = new mojs.Shape({
      strokeDasharray: 4,
      parent: this.loaderIcon,
      shape: 'line',
      stroke: waves,
      strokeWidth: 3,
      strokeLinecap: 'round',
      y: 12,
      delay: 50,
      width: 34,
      origin: '50%, 50%',
      x: {'4%': '-4%'},
      isYoyo: true,
      repeat: 999,
      duration: 1000,
    })
    
    this.line3 = new mojs.Shape({
      strokeDasharray: 4,
      parent: this.loaderIcon,
      shape: 'line',
      stroke: waves,
      strokeWidth: 3,
      strokeLinecap: 'round',
      y: 15,
      delay: 100,
      width: 26,
      origin: '50%, 50%',
      x: {'7%': '-7%'},
      isYoyo: true,
      repeat: 999,
      duration: 1000,
    })
    
    this.line4 = new mojs.Shape({
      strokeDasharray: 4,
      parent: this.loaderIcon,
      shape: 'line',
      stroke: waves,
      strokeWidth: 3,
      strokeLinecap: 'round',
      y: 18,
      delay: 200,
      width: 18,
      origin: '50%, 50%',
      x: {'10%': '-10%'},
      isYoyo: true,
      repeat: 999,
      duration: 1000,
    })

    this.line5 = new mojs.Shape({
      parent: this.loaderIcon,
      shape: 'line',
      stroke: waves,
      strokeWidth: 3,
      strokeLinecap: 'round',
      y: 20,
      delay: 300,
      width: 4,
      origin: '50%, 50%',
      x: {'25%': '-25%'},
      isYoyo: true,
      repeat: 999,
      duration: 1000,
    })
 
    const timeline = new mojs.Timeline 
    timeline.add(this.line1, this.line2, this.line3, this.line4, this.line5).play()
  }

  destroy () {
    this.ctx.app.classList.remove('no-overflow')
    this.container.classList.remove('loader-visible')
  }

  vanish () {
    console.log('vanish')

    const container = new mojs.Html({
      el: this.screen,
      duration: 600,
      scaleX: {
        1:0.020, 
        delay: 1000,
        easing: 'elastic.out',
        duration: 300
      },
      scaleY: {
        1:0.020, 
        delay: 1000,
        duration: 300,
        easing: 'elastic.out'
      },
      backgroundColor: {'#161720': '#2f304b'},
      borderRadius: {0: '50%'},
      angleX: {
        0: 90, 
        delay: 2000, 
        duration: 500,
        easing: 'elastic.out'
      }
    })
    
    const loaderIcon = new mojs.Html({
      el: this.loaderIcon,
      duration: 300,
      delay: 200,
      easing: 'ease.out',
    })
    
    const nuageMo = new mojs.Html({
      el: nuage,
      fill: {'#161720': '#fff6c4'},
      duration: 300,
      easing: 'ease.out',
    })
    
    const nuage2Mo = new mojs.Html({
      el: nuage2,
      fill: {'#161720': '#fff6c4'},
      duration: 300,
      easing: 'ease.out',
    })

    const circleSunMo = new mojs.Html({
      el: circleSun,
      fill: 'url(#radial-gradient-2)',
      duration: 300,
      easing: 'ease.out',
    })

    const burst = new mojs.Burst({
      parent: this.container,
      count: 10,
      radius: {50: 120},
      children: {
        delay: 1050,
        shape: 'line',
        stroke: '#2f304b',
        duration: 1400,
        easing: 'ease.out'
      }
    })

    this.line1.tune({
      stroke: '#fff6c4'
    })
    this.line2.tune({
      stroke: '#fff6c4'
    })
    this.line3.tune({
      stroke: '#fff6c4'
    })
    this.line4.tune({
      stroke: '#fff6c4'
    })
    this.line5.tune({
      stroke: '#fff6c4'
    })

    
    const vanline = new mojs.Timeline
    vanline.add(loaderIcon, container, burst, nuageMo, nuage2Mo, circleSunMo).play()
    
    setTimeout(() => {
      const rotate = new mojs.Html({
        el: this.container,
        scale: {
          1: 0, 
          delay: 2000,
          duration: 100,
          easing: 'ease.in',
        },
        opacity: {
          1: 0,
          duration: 100,
          delay: 1600,
          easing: 'ease.out',
        }
      }).play()
    }, 1000);
  }
}


module.exports = function (ctx, next) {
  let loader = new Loader(ctx)
  ctx.mainLoader = loader
  next()
}