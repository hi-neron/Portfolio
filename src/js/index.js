'use strict'

const page = require('page')
document.computer = true

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  document.computer = false
}

page.base('/#!')
require('./home')

page()
