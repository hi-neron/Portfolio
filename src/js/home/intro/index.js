'use strict'
const intro = require('./world').world
let scene, renderer, stats, camera, control

let getAssets = require('./loader')

let init = function (container, ctx) {
  getAssets((e, assets) => {
    intro(false, assets, container, ctx)
  })
}

module.exports = {
  init
}