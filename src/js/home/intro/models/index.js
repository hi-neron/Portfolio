'use strict'
const THREE = require('three')
const loader = new THREE.JSONLoader()
let body, cap

module.exports = function (cb){
  loader.load('/models/body.json', (body) => {
    loader.load('/models/cap.json', (cap) => {
      cb({body, cap})
    })
  })
}