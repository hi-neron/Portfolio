'use strict'

const THREE = require('three')
const loader = new THREE.JSONLoader()
const fontLoader = new THREE.FontLoader()
const async = require('async')


module.exports = function (cb){

  async.waterfall([
    function(cb) {
      loader.load('/models/body.json', (geometry) => {
        if (geometry) {
          let geometries = {
            body: geometry
          }
          cb(null, geometries)
        } else {
          cb(new Error('not found body'))
        }
      })
    },
    function(geometries, cb){
      loader.load('/models/cap.json', (geometry) => {
        if (geometry) {
          geometries.cap = geometry
          cb(null, geometries)
        } else {
          cb(new Error('not found cap'))
        }
      })
    },
    function(geometries, cb){
      loader.load('/models/letters.json', (geometry) => {
        if (geometry) {
          geometries.letters = geometry
          cb(null, geometries)
        } else {
          cb(new Error('not found letters'))
        }
      })
    },
    function(geometries, cb){
      loader.load('/models/me.json', (geometry, materials) => {
        if (geometry) {
          geometries.me = geometry
          geometries.me.materials = materials
          cb(null, geometries)
        } else {
          cb(new Error('not found geometry'))
        }
      })
    },

    function(geometries, cb){
      fontLoader.load('/fonts/square.json', (font) => {
        if (font) {
          let fonts = {
            square: font
          }
          cb(null, geometries, fonts)
        } else {
          cb(new Error('not found geometry'))
        }
      })
    }
  ], function(e, geometries, fonts) {
    let assets = {
      geometries,
      fonts
    }
    cb(e, assets)
  })

  //   loader.load('/models/cap.json', (cap) => {
  //     cb({body, cap})
  //   })
}