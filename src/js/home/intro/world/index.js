'use strict'
const Stats = require('stats.js')
const dat = require('dat.gui').default
const THREE = require('three')
let scene, renderer, camera, stats, control,
    deb, gui, teaBody, teaCap, material, directionalLight,
    ambientLight, teaPotWrapper

let teaColorS = 0xd2b900
let teaEmissiveS = 0x3b4811
let ambientLightS = 0xbe9021
let directionalLightS = 0xf6ff66

function world (debbug, models) {
  renderer = new THREE.WebGLRenderer()
  deb = debbug
  conf (() => {
    // controls
    control = new function () {
      this.color = teaColorS
      this.emissive = teaEmissiveS
      this.ambientLight = ambientLightS
      this.directionalLight = directionalLightS
      this.capY = -0.4
    }

    let shader = THREE.FresnelShader


    console.log(models)

    material = new THREE.MeshLambertMaterial({
      color: 0xff9500,
      emissive: 0x8c5d1a
    })
    
    teaCap = new THREE.Mesh(models.cap, material)
    teaBody = new THREE.Mesh(models.body, material)

    teaCap.position.y = -0.4
    teaCap.receiveShadow = true
    teaCap.castShadow = true
    teaBody.castShadow = true
    teaBody.receiveShadow = true

    let teaPotWrapper = new THREE.Group()

    teaPotWrapper.add(teaCap)
    teaPotWrapper.add(teaBody)
    teaPotWrapper.add(directionalLight)

    // scene.add(teaCap)
    // scene.add(teaBody)
    teaPotWrapper.position.y = 10
    scene.add(teaPotWrapper)

    camera.lookAt(teaCap.position)

    if (debbug) {
      stats = createStats()
      addControls(control)
    }

    render ()
  })
}


function conf (cb) {
  scene = new THREE.Scene()
  renderer.setClearColor(0xeaeaea, 1.0)

  let width = window.innerWidth
  let height = window.innerHeight
  let x = 30
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFBasicShadowMap
  camera = new THREE.OrthographicCamera(width / - x, width / x, height / x, height / - x, 1, 1000);
  camera.position.x = 15
  camera.position.y = 0
  camera.position.z = 13
  camera.lookAt(scene.position)

  // lights
  ambientLight = new THREE.AmbientLight( 0xf1f1f1, 1 ) // soft white light scene.add( light );
  directionalLight = new THREE.DirectionalLight( 0xffffff, 1.3) // soft white light scene.add( light );
  // directionalLight.position.x = -1
  // directionalLight.position.z = 1
  // directionalLight.position.y = 4
  
  directionalLight.position.x = -3
  directionalLight.position.z = 3
  directionalLight.position.y = 6

  directionalLight.castShadow = true

  scene.add(ambientLight)
  scene.add(directionalLight)

  document.body.appendChild(renderer.domElement)
  cb()
}

function render () {
  renderer.render(scene, camera)
  if (deb) {
    stats.update()
  }
  teaBody.rotation.y += 0.01
  teaCap.rotation.y += 0.01
  // let myColor = control.color
  let myColor = new THREE.Color(control.color)
  let myEmissive = new THREE.Color(control.emissive)
  let myAmbient = new THREE.Color(control.ambientLight)
  let myDirectional = new THREE.Color(control.directionalLight)

  teaBody.material.emissive = myEmissive
  teaBody.material.color = myColor

  ambientLight.color = myAmbient
  directionalLight.color = myDirectional

  // Lights
  teaCap.position.y = control.capY
  requestAnimationFrame(render)
}

function addControls (controlObject) {
  gui = new dat.GUI();
  gui.add(controlObject, 'capY', -0.4, 0)
  gui.addColor(controlObject, 'color', 0xff9500)
  gui.addColor(controlObject, 'emissive', 0xf1bc1c)
  gui.addColor(controlObject, 'ambientLight', 0xf1bc1c)
  gui.addColor(controlObject, 'directionalLight', 0xf1bc1c)
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