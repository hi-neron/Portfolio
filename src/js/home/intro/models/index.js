'use strict'
const THREE = require('three')
const loader = new THREE.ObjectLoader()
let body, cap

module.exports = function (cb){
  loader.load('/models/teapot.json', (ob) => {
    cb(ob)
  })
}