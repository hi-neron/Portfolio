'use strict'
const Stats = require('stats.js')
const dat = require('dat.gui').default
const THREE = require('three')
let scene, renderer, camera, stats, deb, gui

function world (debbug, models) {
  renderer = new THREE.WebGLRenderer()
  deb = debbug

  // controls
  let control = new function () {
    this.none = false
  }

  if (debbug) {
    stats = createStats()
    addControls(control)
  }

  conf ()
  render ()
}

function render () {
  renderer.render(scene, camera)
  if (deb) {
    stats.update()
  }
  requestAnimationFrame(render)
}

function conf () {
  scene = new THREE.Scene()
  renderer.setClearColor(0xfafafa, 1.0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFBasicShadowMap

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 15
  camera.position.y = 16
  camera.position.z = 13
  camera.lookAt(scene.position)

  document.body.appendChild(renderer.domElement)
}

function addControls (controlObject) {
  gui = new dat.GUI();
  gui.add(controlObject, 'none', -0.1, 40)
}

function createStats () {
  let stats = new Stats()
  stats.setMode(0)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0'
  stats.domElement.style.top = '93%'
  document.body.appendChild(stats.domElement)
  return stats
}

module.exports = world