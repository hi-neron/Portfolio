const yo = require('yo-yo')
import {TweenLite, } from "gsap"

let umbrella = yo`
  <g id="umbrella">
    <path id="shadow" class="cls-6" d="M57,22c-5.23-1.94-21.14.17-35.53,4.7S-.34,36.46,4.89,38.39c4.89,1.8,19.11.08,32.71-3.85l4.15,2.26.18-.47-3.66-2c.72-.21,1.44-.43,2.15-.66C54.81,29.16,62.24,23.92,57,22Z"/>
    <g id="body">
      <path class="cls-2" d="M24.88,25.74C16,35.21,6.05,39.36,2,36.29.3,35.05-.14,31.7,0,27.63.69,12.85,12.27.62,27.06,0c3-.12,5.44.25,6.64,1.45C37.8,5.57,33.79,16.26,24.88,25.74Z"/>
      <path class="cls-1" d="M25,25.84C33.59,16.68,37.59,6.41,34.17,2,29.94-.89,20,3.81,11.41,12.94,3.05,21.83-1,31.75,1.66,36a2.87,2.87,0,0,0,.39.39C6.15,39.46,16.07,35.31,25,25.84Z"/>
      <g>
        <line class="cls-7" x1="30.67" y1="27.51" x2="41.84" y2="36.57"/>
        <line class="cls-8" x1="12.01" y1="12.43" x2="30.77" y2="27.61"/>
        <line class="cls-9" x1="19.99" y1="19.06" x2="20.09" y2="7.29"/>
        <line class="cls-10" x1="19.99" y1="19.06" x2="25.02" y2="10.91"/>
        <line class="cls-11" x1="19.91" y1="18.82" x2="6.9" y2="23.05"/>
        <line class="cls-12" x1="20.04" y1="19.06" x2="11.09" y2="26.41"/>
      </g>
      <path class="cls-6" d="M1.6,28.38a17.63,17.63,0,0,1-.71-6.59A29.59,29.59,0,0,0,0,27.63c-.17,3.81.22,7,1.62,8.37C.55,34.26.6,31.56,1.6,28.38Z"/>
      <line class="cls-13" x1="6.17" y1="8.09" x2="7.63" y2="9.22"/>
      <path class="cls-14" d="M3.32,24.21c-2.15-8.7,4.31-15,4.31-15a19.17,19.17,0,0,1,16.25-6"/>
      <line class="cls-13" x1="34.17" y1="2.03" x2="35.39" y2="2.29"/>
      <line class="cls-13" x1="33.99" y1="12.37" x2="35.31" y2="12.66"/>
      <line class="cls-13" x1="1.15" y1="34.31" x2="1.09" y2="36"/>
      <line class="cls-13" x1="27.34" y1="23.16" x2="28.38" y2="23.91"/>
      <line class="cls-13" x1="17.65" y1="32.32" x2="18.11" y2="33.12"/>
      <line class="cls-15" x1="23.88" y1="3.24" x2="24.8" y2="3.27"/>
      <line class="cls-15" x1="3.32" y1="24.21" x2="3.59" y2="25.11"/>
      <line class="cls-14" x1="7.63" y1="9.22" x2="12.01" y2="12.43"/>
      <line class="cls-15" x1="12.01" y1="12.43" x2="12.73" y2="12.97"/>
    </g>
  </g>
` 

let balloon = yo`
<g id="balloon">
  <ellipse id="shadow-2" data-name="shadow" class="cls-6" cx="82.42" cy="38.32" rx="8.21" ry="2.44"/>
  <g id="body-2" data-name="body">
    <circle class="cls-16" cx="78.42" cy="32.29" r="7.84"/>
    <path class="cls-16" d="M86.24,31.49a8,8,0,0,1,0,1.6,4.55,4.55,0,0,1-.1.66,4.09,4.09,0,0,1-.17.69,5.25,5.25,0,0,1-.22.67c-.08.22-.18.43-.28.64s-.17.34-.27.5a1.35,1.35,0,0,1-.14.22c-.09.15-.2.3-.3.45l0,0a6.12,6.12,0,0,1-.4.49l0,0a17.15,17.15,0,0,1,0-10.37c.15.17.3.35.44.54s.25.35.37.54l0,.07c.11.18.21.38.31.57s.2.42.28.64a5.25,5.25,0,0,1,.22.67,4.09,4.09,0,0,1,.17.69A4.55,4.55,0,0,1,86.24,31.49Z"/>
    <path class="cls-17" d="M82.79,25.77a6.71,6.71,0,0,1,1.52,1.34,17.15,17.15,0,0,0,0,10.37,7.55,7.55,0,0,1-1.53,1.34A19,19,0,0,1,82.79,25.77Z"/>
    <path class="cls-16" d="M82.79,25.76h0a19,19,0,0,0,0,13.05l-.08,0a7.47,7.47,0,0,1-1.18.64l-.69.26-.71.19a22,22,0,0,1,0-15.34l.71.19A8.46,8.46,0,0,1,82.79,25.76Z"/>
    <path class="cls-17" d="M78.41,24.43a8,8,0,0,1,1.71.19,22,22,0,0,0,0,15.34,8,8,0,0,1-1.71.19h-.24a23.81,23.81,0,0,1,0-15.7Z"/>
    <path class="cls-16" d="M77.18,24.54a8.06,8.06,0,0,1,1-.1,23.81,23.81,0,0,0,0,15.7,7.9,7.9,0,0,1-1-.1,4.06,4.06,0,0,1-.71-.15,6,6,0,0,1-.82-.25c-.25-.1-.51-.21-.76-.34a26.71,26.71,0,0,1,0-14l.37-.18.3-.12a6.29,6.29,0,0,1,.9-.28A4.06,4.06,0,0,1,77.18,24.54Z"/>
    <path class="cls-17" d="M74.89,39.3c.25.13.51.24.76.34a7.58,7.58,0,0,1-3.11-2.15,28.46,28.46,0,0,1,0-10.41,7.47,7.47,0,0,1,2.35-1.81A26.71,26.71,0,0,0,74.89,39.3Z"/>
    <path class="cls-16" d="M72.12,27.6c.14-.18.28-.35.43-.52a28.46,28.46,0,0,0,0,10.41c-.15-.17-.3-.35-.44-.54s-.27-.38-.39-.57-.23-.41-.34-.62-.2-.42-.28-.64-.16-.45-.23-.67a4.82,4.82,0,0,1-.15-.68,3.71,3.71,0,0,1-.11-.68,8,8,0,0,1,0-1.6,3.71,3.71,0,0,1,.11-.68,4.82,4.82,0,0,1,.15-.68,4.76,4.76,0,0,1,.21-.6.42.42,0,0,1,0-.12c.07-.19.16-.39.25-.58l0,0c.1-.21.22-.41.33-.6s.25-.38.37-.56Z"/>
    <path class="cls-18" d="M82.67,25.69A7.85,7.85,0,0,1,71.81,36.54,7.86,7.86,0,1,0,82.67,25.69Z"/>
  </g>
</g>
`

let scene = yo`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100.56 46.4">
  <defs>
    <style>
      .cls-1, .cls-18, .cls-6 {
        fill: #2e2e2e;
      }

      .cls-2 {
        fill: #ff4d4d;
      }

      .cls-3 {
        fill: #f3f3f6;
      }

      .cls-4 {
        opacity: 0.15;
        fill: url(#linear-gradient);
      }

      .cls-5 {
        fill: #ff8484;
      }

      .cls-6 {
        opacity: 0.45;
      }

      .cls-10, .cls-11, .cls-12, .cls-13, .cls-14, .cls-15, .cls-7, .cls-8, .cls-9 {
        fill: none;
        stroke-miterlimit: 10;
      }

      .cls-7 {
        stroke: #fff;
        stroke-linecap: round;
      }

      .cls-7, .cls-8 {
        stroke-width: 0.5px;
      }

      .cls-8 {
        stroke: url(#linear-gradient-2);
      }

      .cls-10, .cls-11, .cls-12, .cls-13, .cls-14, .cls-15, .cls-9 {
        stroke-width: 0.25px;
      }

      .cls-9 {
        stroke: url(#linear-gradient-3);
      }

      .cls-10 {
        stroke: url(#linear-gradient-4);
      }

      .cls-11 {
        stroke: url(#linear-gradient-5);
      }

      .cls-12 {
        stroke: url(#linear-gradient-6);
      }

      .cls-13 {
        stroke: #2e2e2e;
      }

      .cls-14 {
        stroke: #ff6969;
      }

      .cls-15 {
        stroke: #f6f6f8;
      }

      .cls-16 {
        fill: #83ffda;
      }

      .cls-17 {
        fill: #fff;
      }

      .cls-18 {
        opacity: 0.25;
      }
    </style>
    <linearGradient id="linear-gradient" x1="28.23" y1="43.27" x2="34.54" y2="43.27" gradientUnits="userSpaceOnUse">
      <stop offset="0.01"/>
      <stop offset="1" stop-color="#ff4d4d" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="linear-gradient-2" x1="12.24" y1="20.25" x2="31.12" y2="20.25" gradientTransform="matrix(1.01, 0, 0, 1, -0.53, -0.42)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#626262"/>
      <stop offset="0.44" stop-color="#696969"/>
      <stop offset="1" stop-color="#797979"/>
    </linearGradient>
    <linearGradient id="linear-gradient-3" x1="20.04" y1="19.06" x2="20.04" y2="7.28" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#626262"/>
      <stop offset="0.17" stop-color="#676767" stop-opacity="0.93"/>
      <stop offset="0.4" stop-color="#757575" stop-opacity="0.75"/>
      <stop offset="0.68" stop-color="#8d8d8d" stop-opacity="0.45"/>
      <stop offset="0.98" stop-color="#adadad" stop-opacity="0.04"/>
      <stop offset="1" stop-color="#b0b0b0" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="linear-gradient-4" x1="19.88" y1="14.98" x2="25.13" y2="14.98" xlink:href="#linear-gradient-3">
    </linearGradient>
    <linearGradient id="linear-gradient-5" x1="6.86" y1="20.94" x2="19.95" y2="20.94" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#b0b0b0" stop-opacity="0"/>
      <stop offset="0.02" stop-color="#adadad" stop-opacity="0.04"/>
      <stop offset="0.32" stop-color="#8d8d8d" stop-opacity="0.45"/>
      <stop offset="0.6" stop-color="#757575" stop-opacity="0.75"/>
      <stop offset="0.83" stop-color="#676767" stop-opacity="0.93"/>
      <stop offset="1" stop-color="#626262"/>
    </linearGradient>
    <linearGradient id="linear-gradient-6" x1="11.01" y1="22.74" x2="20.12" y2="22.74" xlink:href="#linear-gradient-5">
    </linearGradient>
  </defs>
  <title>main</title>
  <g id="scene">
    <g id="towel">
      <g>
        <path class="cls-1" d="M53,46.4H30.74a1.16,1.16,0,0,1-.48-.11h0a2.39,2.39,0,0,0-1.53-.21l-1.58.32H17.53l-1-1.31,33.31-27.2L87.7,16.27Z"/>
        <path class="cls-2" d="M52.61,46.18H32.22A3.13,3.13,0,0,1,31.13,46L29,45.26a2.08,2.08,0,0,0-2.25.6h0a.9.9,0,0,1-.69.32H17.61l-1.18-1.36L49.61,16.05h4.76a10.28,10.28,0,0,0,3.18.11l.92-.11H63.7l2.67-.1,1.53.1,2,.2,2-.25a9.38,9.38,0,0,1,1.41-.07l1.55,0,1.82.09H87.33Z"/>
        <polygon class="cls-3" points="18.4 43.13 56.12 43.13 60.65 39.2 22.93 39.2 18.4 43.13"/>
        <polygon class="cls-3" points="24.38 37.95 62.09 37.95 62.51 37.59 24.8 37.59 24.38 37.95"/>
        <path class="cls-4" d="M28.23,45.15h.05a6.59,6.59,0,0,1,2.15.48c.57.24,1.17.48,1.26.49l2,0,.84-5.82Z"/>
      </g>
      <polygon id="corner" class="cls-5" points="17.61 46.18 16.84 43.79 16.43 44.83 17.61 46.18"/>
    </g>
    ${umbrella}
    ${balloon}
  </g>
</svg>

`

class Loader {
  constructor (ctx){
    let hi = yo`
      <div className="loader-hi">
        hi! wait
      </div>
    `
    this.loaderIcon = yo`
    <div class="loader-icon">
      ${hi}
      ${scene}
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

    let init 

    // this.animate()

    this.ctx = ctx
    document.body.appendChild(this.container)
  }

  destroy () {
    this.ctx.app.classList.remove('no-overflow')
  }

  vanish () {
    console.log('vanish')
  }
}


module.exports = function (ctx, next) {
  let loader = new Loader(ctx)

  // el loader lo maneja el contexto
  ctx.mainLoader = loader
  next()
}