'use strict'

const page = require('page')
document.computer = true

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  document.computer = false
}

document.addEventListener('touchstart', {}, {passive: true});
document.addEventListener('mousewheel', {}, {passive: true});
document.addEventListener('touchmove', {}, {passive: true});

page.base('/#!')
require('./home')

page()
