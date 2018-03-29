'use strict'
const world = require('./world')
let scene, renderer, stats, camera, control

let getAssets = require('./loader')

let init = function (container, ctx) {
  getAssets((e, assets) => {
    world(false, assets, container, ctx)
  })
}

module.exports = {
  init
}