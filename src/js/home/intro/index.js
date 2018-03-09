'use strict'
const world = require('./world')
let scene, renderer, stats, camera, control

let getAssets = require('./loader')

function init() {
  getAssets((e, assets) => {
    world(true, assets)
  })
}

module.exports = init()