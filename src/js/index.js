'use strict'

const page = require('page')
global.computer = true

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  computer = false
}

page.base('/#!')
require('./home')

page()
