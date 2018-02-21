'use strict'
const world = require('./world')
let scene, renderer, stats, camera, control

let getModels = require('./models')

function init() {
  getModels((models) => {
    let myWorld = world(true, models)
  })
}

module.exports = init()