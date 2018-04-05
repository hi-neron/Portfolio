const yo = require('yo-yo')
const mojs = require('mo-js')

const nuage = yo`
  <rect class="cls-6-sun" x="0" y="60" width="90" height="3"/>
`
const nuage2 = yo`
  <rect class="cls-6-sun" x="80" y="75" width="90" height="3"/>
`
const circleSun = yo`
  <path class="cls-5-sun" d="M127.6,95.32a46.68,46.68,0,1,0-89.85,0Z"/>
`

const bottomSea = yo`
  <path class="cls-1-bottom" d="M0,0A69.39,69.39,0,0,0,68.47,58.18,69.39,69.39,0,0,0,136.94,0Z""/>
`

const bottom = yo`
  <div class="loader-bottom">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.66 83.56">
      <defs>
        <style>
          .cls-1-bottom {
            fill: #666666;
          }
        </style>
      </defs>
      <title>bottom</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          ${bottomSea}
        </g>
      </g>
    </svg>
  </div>
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
        fill: #666666;
      }
    </style>
    <radialGradient id="radial-gradient" cx="50" cy="113.33" r="156.54" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ff5652"/>
      <stop offset="0.54" stop-color="#ff5652"/>
    </radialGradient>
    <radialGradient id="radial-gradient-2" cx="85" cy="100" r="196.54" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ff5652"/>
      <stop offset="0.54" stop-color="#ff5652"/>
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
      ${bottom}
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
    let waves = '#ffe6d2'
    
    this.line1 = new mojs.Shape({
      parent: this.loaderIcon,
      shape: 'line',
      stroke: waves,
      strokeWidth: 2.5,
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
      strokeWidth: 2.5,
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
      strokeWidth: 2.5,
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
      strokeWidth: 2.5,
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
      strokeWidth: 2.5,
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
  }

  vanish () {
    console.log('vanish')

    this.destroy()
    let initialColor = '#2d2d2d'
    let finalColor = '#cdf6f1'

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
      backgroundColor: {initialColor: finalColor},
      borderRadius: {0: '50%'},
      angleX: {
        0: 90, 
        delay: 2000, 
        duration: 400,
        easing: 'elastic.out'
      },
      y: {
        1:4,
        delay: 2000, 
        duration: 100,
        easing: 'ease.out'
      }
    })
    
    const loaderIcon = new mojs.Html({
      el: this.loaderIcon,
      duration: 300,
      delay: 200,
      easing: 'ease.out',
    })

    const bottomSeaMo = new mojs.Html({
      el: bottomSea,
      fill: { initialColor: finalColor},
      duration: 600,
      easing: 'ease.out',
    })
    
    const nuageMo = new mojs.Html({
      el: nuage,
      fill: {'#2d2d2d': '#ffffff'},
      duration: 300,
      easing: 'ease.out',
    })
    
    const nuage2Mo = new mojs.Html({
      el: nuage2,
      fill: {'#2d2d2d': '#ffffff'},
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
        counter: 6,
        stroke: finalColor,
        duration: 1400,
        easing: 'ease.out'
      }
    })

    const burst2 = new mojs.Burst({
      parent: this.container,
      count: 4,
      degree: 180,
      angle: -90,
      y: 4,
      radius: {20: 80},
      children: {
        delay: 2000,
        shape: 'line',
        stroke: '#ff5652',
        duration: 1400,
        easing: 'ease.out'
      }
    })

    let lineColor = '#ffffff'
    this.line1.tune({
      stroke: lineColor
    })
    this.line2.tune({
      stroke: lineColor
    })
    this.line3.tune({
      stroke: lineColor
    })
    this.line4.tune({
      stroke: lineColor
    })
    this.line5.tune({
      stroke: lineColor
    })

    
    const vanline = new mojs.Timeline
    vanline.add(loaderIcon, container, burst, burst2, nuageMo, nuage2Mo, bottomSeaMo, circleSunMo).play()
    
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