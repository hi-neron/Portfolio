
const Stats = require('stats.js')
const dat = require('dat.gui').default
const _ = require('lodash')
const THREE = require('three')
let scene, renderer, stats, camera

function init() {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  stats = createStats()

  let control

  document.body.appendChild(stats.domElement)

  renderer.setClearColor(0xfafafa, 1.0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFBasicShadowMap

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 15
  camera.position.y = 16
  camera.position.z = 13
  camera.lookAt(scene.position)

  // controls
  control = new function () {
    this.none = false
  }

  document.body.appendChild(renderer.domElement)

  addControls(control)
  render()
}

function addControls (controlObject) {
  let gui = new dat.GUI();
  gui.add(controlObject, 'none', -0.1, 40)
}

function render () {
  renderer.render(scene, camera)
  stats.update()
  requestAnimationFrame(render)
}

function createStats () {
  let stats = new Stats()

  stats.setMode(0)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0'
  stats.domElement.style.top = '93%'

  return stats
}

module.exports = init()