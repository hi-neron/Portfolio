'use strict'
const Stats = require('stats.js')
const dat = require('dat.gui').default
const THREE = require('three')
const yo = require('yo-yo')
require('postprocessing')

let scene, renderer, camera, stats, control,
    deb, gui, teaBody, teaCap, directionalLight,
    ambientLight, teaPotWrapper, sky, name, mixer,
    prevTime, clock, helloMove, delta, pose

let messageH1 = 'Jose Sánchez'
let messageH2 = 'dev et designer'

document.dialog = 'Hola!'

const titleH1 = yo`
<div id="main_title">
  <svg viewBox="0 0 500 500">
    <path id="curve" d="m117,217.5c0,-1 150,-54 333,-1" />
      <text x="25">
        <textPath xlink:href="#curve">
          ${messageH2}
        </textPath>
      </text>
  </svg>
</div>
`

// background-color
let initBackColor = 0xf3f3f6

// tea COLOR
let teaColorS = 0xff2525
let teaEmissiveS = 0x1b0075
let ambientLightS = 0xbe9021
let directionalLightS = 0xf6ff66

// sky
let upperColor = 0x37be
let size = 5
let magnitude = 3

let sinProf

let x = 32

function world (debbug, assets) {
  renderer = new THREE.WebGLRenderer()
  deb = debbug
  clock = new THREE.Clock()

  // getting assets
  let models = assets.geometries
  let fonts = assets.fonts

  conf ((renderer) => {

    // controls
    control = new function () {
      this.color = teaColorS
      this.upperColor = upperColor
      this.emissive = teaEmissiveS
      this.ambientLight = ambientLightS
      this.directionalLight = directionalLightS
      this.capY = -0.53
      this.posX = 0
      this.posY = -0.4
      this.posZ = 0
      this.rotY = 0.23
      this.rotX = -0.22
      this.rotZ = 0.32
      this.translateX = -2.8
      this.translateY = 1.2
      this.translateZ = 9
      this.rotateY = 0.25
      this.rotateX = 0.04
      this.rotateZ = 0.00
    }


    // assets

    // NAME
    // Material
    let nameMaterial = new THREE.MeshBasicMaterial({
      color: initBackColor
    })

    // font
    let square = fonts.square

    // geometry
    let nameGeometry = new THREE.TextGeometry(`Jose                    Sánchez`, {
      font: square,
      size: 2.3,
      height: 0,
      curveSegments: 2
    })

    // mesh
    name = new THREE.Mesh(nameGeometry, nameMaterial)

    name.material.shading = THREE.SmoothShading
    name.geometry.computeVertexNormals(true)

    // ME
    let meMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      skinning: true
    })

    let meGeometry = models.me

    let me = new THREE.SkinnedMesh(meGeometry, meMaterial)

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
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      flatShading: true
    })

    teaCap = new THREE.Mesh(models.cap, materialCap)
    teaBody = new THREE.Mesh(models.body, materialBody)


    teaCap.position.y = -0.65
    teaCap.receiveShadow = true
    teaCap.castShadow = true
    teaBody.castShadow = true
    teaBody.receiveShadow = true

    teaPotWrapper = new THREE.Group()
    teaPotWrapper.rotation.y = -0.4 * Math.PI

    
    me.position.y = 8.4
    me.position.x = 2.3
    me.scale.y = 0.85
    me.rotation.y = 0.7 * Math.PI
    
    scene.add(name)
    teaPotWrapper.add(me)
    teaPotWrapper.add(teaCap)
    teaPotWrapper.add(teaBody)

    // teaPotWrapper.rotation.x = 0.04 * Math.PI
    teaPotWrapper.position.y = -5

    sky = createSky(upperColor)

    // adds
    scene.add(teaPotWrapper)
    scene.add(sky)
    document.body.appendChild(titleH1)

    camera.lookAt(teaCap.position)

    if (debbug) {
      stats = createStats()
      addControls(control)
    }

    window.addEventListener( 'resize', onWindowResize, false )

    // add h2
    setPosTitleH1()

    render ()
    helloMove.play()

  })
}

function setPosTitleH1() {
  let pos = toScreenXY(teaPotWrapper.position, camera, renderer.domElement)
  titleH1.style.top = `${pos.y}px`
  titleH1.style.left = `${pos.x}px`
  console.log(pos, titleH1)
}

function toScreenXY(position, camera, domElement){
  let pos = position.clone();
  let projScreenMat = new THREE.Matrix4();
  projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );

  pos.applyMatrix4(projScreenMat)

  let offset = findOffset(domElement)
  return { x: ( pos.x + 1 ) * domElement.width / 2 + offset.left,
    y: ( - pos.y + 1) * domElement.height / 2 + offset.top };
}

function findOffset(element) {
  var pos = new Object();
  pos.left = pos.top = 0;
  if (element.offsetParent)
  {
    do
    {
      pos.left += element.offsetLeft;
      pos.top += element.offsetTop;
    } while (element = element.offsetParent);
  }
  return pos;
}

function conf (cb) {
  scene = new THREE.Scene()
  renderer.setClearColor(initBackColor, 1.0)

  let width = window.innerWidth
  let height = window.innerHeight

  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFBasicShadowMap
  camera = new THREE.OrthographicCamera(width / - x, width / x, height / x, height / - x, 1, 1000);
  camera.position.x = 15
  camera.position.y = -3
  camera.position.z = 13
  // camera.lookAt(scene.position)

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
  cb(renderer)
}

function createSky (color) {
  let skyGeometry = new THREE.PlaneGeometry(400, 20, 200, 20)

  let skyMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.9
  })

  let skyMesh = new THREE.Mesh(skyGeometry, skyMaterial)
  skyMesh.rotation.y = -0.2 * Math.PI;

  skyMesh.position.x = 0
  skyMesh.position.y = 77
  skyMesh.position.z = -27

  return skyMesh
}

// label
function addNameLabel () {}

// Controls
function addControls (controlObject) {
  gui = new dat.GUI();
  gui.addColor(controlObject, 'color', 0xff9500)
  gui.addColor(controlObject, 'emissive', 0xf1bc1c)
  gui.addColor(controlObject, 'ambientLight', 0xf1bc1c)
  gui.addColor(controlObject, 'directionalLight', 0xf1bc1c)
  gui.addColor(controlObject, 'upperColor', upperColor)
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

function onWindowResize () {
  let SCREEN_WIDTH = window.innerWidth;
  let  SCREEN_HEIGHT = window.innerHeight;
  let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  let f = 58
  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

  camera.left =  aspect * f / - 2
  camera.right = aspect * f / 2
  camera.bottom =   f / - 2
  camera.top = f / 2
  camera.updateProjectionMatrix();

  setPosTitleH1()
}

// animation
function render (ts) {
  if (deb) {
    stats.update()
  }

  teaPotWrapper.rotation.y += 0.01
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
  name.position.x = control.translateX
  name.position.y = control.translateY
  name.position.z = control.translateZ
  name.rotation.x = control.rotateX * Math.PI
  name.rotation.y = control.rotateY * Math.PI
  name.rotation.z = control.rotateZ * Math.PI

  let skyLength = sky.geometry.vertices.length

  let center = new THREE.Vector2(0, 0)

  for (var i = 0; i < skyLength; i++) {
    var v = sky.geometry.vertices[i];
    var dist = new THREE.Vector2(v.x, v.y).sub(center);
    v.z = Math.sin(dist.length()/-size + (ts/900)) * magnitude;
  }

  sky.geometry.verticesNeedUpdate = true;

  let delta = clock.getDelta()
  requestAnimationFrame(render)
  mixer.update(delta)
  renderer.render(scene, camera)
}

module.exports = world