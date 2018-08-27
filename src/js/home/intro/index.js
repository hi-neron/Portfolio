'use strict'
const intro = require('./world').world
let scene, renderer, stats, camera, control

let getAssets = require('./loader')

let init = function (container, ctx, cb) {
  getAssets((e, assets) => {
    intro(false, assets, container, ctx)
    cb(true)
  })
}

module.exports = {
  init
}