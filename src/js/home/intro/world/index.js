'use strict'

const THREE = require('three')

const Stats = require('stats.js')
const dat = require('dat.gui').default
const yo = require('yo-yo')
require('postprocessing')

let SCREEN_WIDTH, SCREEN_HEIGHT, HALF_SCREEN_W, HALF_SCREEN_H

let scene, renderer, camera, stats, control,
    deb, gui, teaBody, teaCap, directionalLight,
    ambientLight, teaPotWrapper, sky, name, mixer,
    prevTime, clock, helloMove, delta, pose, direction, 
    a, sum, me, lettersDD, animation


let fontSizeName = 2.8
let messageH1 = 'Jose Sánchez'
let messageH2 = 'dev et designer'

const mainContainer = document.createElement('div')

mainContainer.setAttribute('class', 'intro-wrapper')
mainContainer.classList.add('container')

document.mainContainer = mainContainer

// main name
let htmlName = yo`
  <div className="my-name-container">
    <div className="my-name">
      <div className="first-line">
        <span>J</span>
        <span>O</span>
        <span>S</span>
        <span>E</span>
      </div>
      <div className="second-line">
        <span>S</span>
        <span>Á</span>
        <span class="space">­</span>
        <span>N</span>
        <span class="next-line">⌁</span>
      </div>
      <div className="third-line">
        <span>C</span>
        <span>H</span>
        <span>E</span>
        <span>Z</span>
      </div>
    </div>
  </div>`

// // background-color
// let initBackColor = 0xf3f3f6
let initBackColor = 0x62c0c8

// // tea COLOR
// let teaColorS = 0x161616
// let teaEmissiveS = 0xff4b4b
// let ambientLightS = 0x505050
// let directionalLightS = 0xd2d2d2

// // me & name color
// let meColor = 0x2e2e2e

// // sky Color
// let upperColor = 0xa8a8a8

// // paneau
// let devDeColor = 0x5af2d9
// let devDeColorEmi = 0x44e6ca

// tea COLOR with blue
let teaColorS = 0x372c84
let teaEmissiveS = 0xff1f39
let ambientLightS = 0xd4162c
let directionalLightS = 0xa1e8ff

// me & name color
let meColor = 0Xd5fff7

// sky Color
let upperColor = 0x649ea2

// paneau
let devDeColor = 0x5af2d9
let devDeColorEmi = 0x44e6ca

let size = 3
let magnitude = 3

let sinProf

// size intro: pc || mobile
let x = document.computer ? 44 : 28

let mousePosition = {
  x: 0,
  y: 0
}

window.onmousemove = mousePos


function onWindowResize () {
  SCREEN_WIDTH = window.innerWidth
  SCREEN_HEIGHT = mainContainer.offsetHeight
  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
  
  let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  let f = 38
  camera.left =  aspect * f / - 2
  camera.right = aspect * f / 2
  camera.bottom =   f / - 2
  camera.top = f / 2

  camera.updateProjectionMatrix();
}


function world (debbug, assets, appContainer, ctx) {
  renderer = new THREE.WebGLRenderer({alpha: true, antialias:true})
  renderer.setPixelRatio( window.devicePixelRatio)
  deb = debbug
  clock = new THREE.Clock(true)

  // getting assets
  let models = assets.geometries
  // let fonts = assets.fonts
  ctx.animation = animation

  conf (appContainer, (renderer) => {

    // controls
    control = new function () {
      this.color = teaColorS
      this.upperColor = upperColor
      this.emissive = teaEmissiveS
      this.ambientLight = ambientLightS
      this.directionalLight = directionalLightS
      this.devDeColor = devDeColor
      this.devDeColorEmission = devDeColorEmi
      this.teaMakerRotation = 0.7
      this.capY = -0.53
      this.posX = 4
      this.posY = -5.8
      this.posZ = -2.5
      this.rotY = 0.84
      this.rotX = 0.58
      this.rotZ = 0.21
      this.translateX = -4.9
      this.translateY = -4
      this.translateZ = 9.8
      this.rotateY = 0.25
      this.rotateX = 0.04
      this.rotateZ = 0.00
      this.meColor = meColor
    }

    // DEV Y DESIGNER
    let lettersMaterial = new THREE.MeshPhongMaterial({
      color: upperColor,
      emissive: 0xaa5858,
      emissiveIntensity: 1,
      flatShading: true
    })

    lettersDD = new THREE.Mesh(models.letters, lettersMaterial)
    lettersDD.castShadow = true
    lettersDD.receiveShadow = true
   
    // assets

    // ME
    let meMaterial = new THREE.MeshBasicMaterial({
      color: meColor,
      skinning: true,
      blending: THREE.NoBlending

    })

    let meGeometry = models.me

    me = new THREE.SkinnedMesh(meGeometry, meMaterial)

    mixer = new THREE.AnimationMixer(me)
    helloMove = mixer.clipAction('hello')

    helloMove.clampWhenFinished = true
    helloMove.setEffectiveWeight(1)

    // TEAPOT
    // materials
    let materialBody = new THREE.MeshLambertMaterial({
      color: 0xff9500,
      emissive: 0x8c5d1a,
      flatShading: true
    })

    let materialCap = new THREE.MeshLambertMaterial({
      color: initBackColor,
      emissive: initBackColor,
      emissiveIntensity: 0.9,
      flatShading: true
    })

    teaCap = new THREE.Mesh(models.cap, materialCap)
    teaBody = new THREE.Mesh(models.body, materialBody)


    sky = createSky(upperColor, 77)
    
    teaCap.receiveShadow = true
    teaCap.castShadow = true
    teaBody.castShadow = true
    teaBody.receiveShadow = true

    me.castShadow = true
    me.receiveShadow = true

    teaPotWrapper = new THREE.Group()
    teaBody.position.x = -0.25
    teaBody.position.z = -0.3
    teaBody.position.y = -5

    teaCap.position.x = -0.25
    teaCap.position.y = -5
    teaCap.position.z = -0.3

    lettersDD.position.x = -0.25
    lettersDD.position.y = -5
    lettersDD.position.z = -0.3
    // teaPotWrapper.rotation.y = -0.4 * Math.PI
    
    me.position.y = 4
    me.position.x = 1.9
    me.scale.y = 0.78
    me.scale.x = 0.78
    me.rotation.y = 0.7 * Math.PI

    
    // scene.add(name)
    teaPotWrapper.add(me)
    teaPotWrapper.add(teaCap)
    teaPotWrapper.add(teaBody)
    teaPotWrapper.add(lettersDD)

    teaPotWrapper.position.y = -5

    // adds
    scene.add(sky)
    scene.add(teaPotWrapper)

    camera.lookAt(teaCap.position)

    if (debbug) {
      stats = createStats()
      addControls(control)
    }

    render ()
    helloMove.play()

  })
}

function conf (appContainer, cb) {
  scene = new THREE.Scene()
  renderer.setClearColor(initBackColor, 0)
  SCREEN_WIDTH = window.innerWidth
  SCREEN_HEIGHT = window.innerHeight

  HALF_SCREEN_W = SCREEN_WIDTH / 2
  HALF_SCREEN_H = SCREEN_HEIGHT / 2

  let width = SCREEN_WIDTH  > 320 ? SCREEN_WIDTH : 320
  let height = SCREEN_HEIGHT

  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFBasicShadowMap
  renderer.shadowMap.renderReverseSided = false;

  camera = new THREE.OrthographicCamera(width / - x, width / x, height / x, height / - x, 1, 1000);
  camera.position.x = 15
  camera.position.y = -3
  camera.position.z = 13

  // lights
  ambientLight = new THREE.AmbientLight( 0xf1f1f1, 1 ) // soft white light scene.add( light );
  directionalLight = new THREE.DirectionalLight( 0xffffff, 1.3) // soft white light scene.add( light );

  directionalLight.position.x = -3
  directionalLight.position.z = 3
  directionalLight.position.y = 6

  directionalLight.castShadow = true


  scene.add(ambientLight)
  scene.add(directionalLight)
  scene.fog = new THREE.Fog(meColor, 0.0015, 60);

  mainContainer.appendChild(htmlName)
  mainContainer.appendChild(renderer.domElement)
  appContainer.appendChild(mainContainer)

  onWindowResize()

  cb(renderer)
}

function createSky (color, y) {
  let skyGeometry = new THREE.PlaneGeometry(85, 11, 85, 11)
  let opacity = 0.5


  let skyMaterial = new THREE.MeshBasicMaterial({
    color,
    opacity,
    transparent: true,
    fog: false,
    blending: THREE.NoBlending
  })

  let skyMesh = new THREE.Mesh(skyGeometry, skyMaterial)
  skyMesh.rotation.y = -0.2 * Math.PI;
  skyMesh.position.x = 0
  skyMesh.position.y = y
  skyMesh.position.z = -27

  skyMesh.render


  return skyMesh
}

// Controls
function addControls (controlObject) {
  gui = new dat.GUI();
  gui.addColor(controlObject, 'color', 0xff9500)
  gui.addColor(controlObject, 'emissive', 0xf1bc1c)
  gui.addColor(controlObject, 'ambientLight', 0xf1bc1c)
  gui.addColor(controlObject, 'directionalLight', 0xf1bc1c)
  gui.addColor(controlObject, 'upperColor', upperColor)
  gui.add(controlObject, 'teaMakerRotation', -1.5, 1.5)
  //devde
  gui.addColor(controlObject, 'devDeColor', 0x000000)
  gui.addColor(controlObject, 'devDeColorEmission', 0x000000)
  // Me color
  gui.addColor(controlObject, 'meColor', meColor)
  // sky
  gui.add(controlObject, 'capY', -0.5, 0)
  gui.add(controlObject, 'posX', -50, 50)
  gui.add(controlObject, 'posY', -50, 50)
  gui.add(controlObject, 'posZ', -50, 50)
  gui.add(controlObject, 'rotY', -1.0, 1.0)
  gui.add(controlObject, 'rotX', -1.0, 1.0)
  gui.add(controlObject, 'rotZ', -1.0, 1.0)
  // text
  gui.add(controlObject, 'translateX', -20, 20)
  gui.add(controlObject, 'translateY', -20, 20)
  gui.add(controlObject, 'translateZ', -20, 20)
  gui.add(controlObject, 'rotateY', -1.0, 1.0)
  gui.add(controlObject, 'rotateX', -1.0, 1.0)
  gui.add(controlObject, 'rotateZ', -1.0, 1.0)
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

function mousePos (e) {
  e = e || window.event
  mousePosition.x = e.clientX
  mousePosition.y = e.clientY
}

// animation
function render (ts) {
  if (deb) {
    stats.update()
  }

  // add h2

  // let myColor = control.color
  let myColor = new THREE.Color(control.color)
  let myEmissive = new THREE.Color(control.emissive)
  let myAmbient = new THREE.Color(control.ambientLight)
  let myDirectional = new THREE.Color(control.directionalLight)
  let personColor = new THREE.Color(control.meColor)

  let myDevDeColor = new THREE.Color(control.devDeColor)
  let myDevDeColorEmission = new THREE.Color(control.devDeColorEmission)

  teaBody.material.emissive = myEmissive
  teaBody.material.color = myColor

  // me.material.color = personColor
  // name.material.color = personColor
  
  directionalLight.color = myDirectional

  ambientLight.color = myAmbient
  directionalLight.color = myDirectional

  lettersDD.material.color = myDevDeColor
  lettersDD.material.emissive = myDevDeColorEmission

  let skyColor = new THREE.Color(control.upperColor)

  sky.material.color = skyColor

  // skyPos
  sky.position.y = control.posY
  sky.position.x = control.posX
  sky.position.z = control.posZ
  sky.rotation.x = control.rotX * Math.PI
  sky.rotation.y = control.rotY * Math.PI
  sky.rotation.z = control.rotZ * Math.PI


  // textPos
  // name.position.x = control.translateX
  // name.position.y = control.translateY
  // name.position.z = control.translateZ
  // name.rotation.x = control.rotateX * Math.PI
  // name.rotation.y = control.rotateY * Math.PI
  // name.rotation.z = control.rotateZ * Math.PI

  let skyLength = sky.geometry.vertices.length

  let center = new THREE.Vector2(0, 0)

  for (var i = 0; i < skyLength; i++) {
    var vs = sky.geometry.vertices[i]
    var dist2 = new THREE.Vector2(vs.x, vs.y).sub(center)
    vs.z = Math.sin(dist2.length()/-size + (ts/900)) * magnitude
  }

  sky.geometry.verticesNeedUpdate = true

  // rotate the teapot
  let middleX = (SCREEN_WIDTH - HALF_SCREEN_W) - mousePosition.x
  let middleY = (SCREEN_HEIGHT - HALF_SCREEN_H) - mousePosition.y
  let cameraY = (middleY * 3) / HALF_SCREEN_H

  let delta = clock.getDelta()
  
  
  
  if (document.computer) {
    let rad = (middleX * (Math.PI)) / HALF_SCREEN_W
    rad = (rad - 2.31)
    teaPotWrapper.rotation.y = rad * -1
    camera.position.y = cameraY * -1
  } else {
    teaPotWrapper.rotation.y += 0.01
    camera.position.y = -3
  }

  camera.lookAt(teaPotWrapper.position)
  mixer.update(delta)
  renderer.render(scene, camera)
  animation = requestAnimationFrame(render)
}

module.exports = {
  world,
  onWindowResize
}