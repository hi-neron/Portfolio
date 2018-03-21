'use strict'
const world = require('./world')
let scene, renderer, stats, camera, control

let getAssets = require('./loader')

let init = function (container) {
  getAssets((e, assets) => {
    world(true, assets, container)
  })
}

module.exports = {
  init
}