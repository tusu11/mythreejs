window.addEventListener('load', function(){
  threeStart()
})

function threeStart(){
  initThree()
  initCamera()
  initObject()
  draw()
}

var renderer, scene, canvasFrame
function initThree(){
  canvasFrame = document.getElementById('canvas-frame')
  renderer = new THREE.WebGLRenderer()
  if (!renderer) alert('three.jsの初期化に失敗')
  renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight)
  canvasFrame.appendChild(renderer.domElement)
  renderer.setClearColor(0xe6e6ff, 1.0)
  scene = new THREE.Scene()
}

var camera
function initCamera(){
  camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth/canvasFrame.clientHeight, 1, 10000)
  camera.position.set(120, 100, 280)
  camera.lookAt(scene.position)
  trackball = new THREE.TrackballControls(camera, canvasFrame)
  trackball.noRotate = false
  trackball.zoomSpeed = 4
  trackball.noPan = false
  trackball.panSpeed = 1.0
  trackball.target = new THREE.Vector3(0, 0, 10)
  trackball.staticMoving = false
  trackball.dynamicDampingFactor = 0.2
  trackball.maxDistance = 400
  trackball.minDistance = 40
}

var snowman
function initObject(){
  const buttonGeometry = new THREE.BoxGeometry(5, 5, 5)
  const hatMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 })
  const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const buttonMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 })
  const eyeMaterial = new THREE.MeshToonMaterial({ color: 0x000000 })

  const hat = new THREE.Mesh(
    new THREE.CylinderGeometry(25, 25, 40, 30),
    hatMaterial
  )
  hat.position.set(0, 50, 0)

  const hat_line = new THREE.Mesh(
    new THREE.CylinderGeometry(26, 25, 20, 30),
    hatMaterial
  )
  hat_line.position.set(0, 35, 0)

  const hat_collar = new THREE.Mesh(
    new THREE.CylinderGeometry(40, 40, 5, 30),
    hatMaterial
  )
  hat_collar.position.set(0, 32, 0)

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(40, 40, 20),
    headMaterial
  )
  head.position.set(0, 0, 0)

  const right_eye = new THREE.Mesh(
      new THREE.SphereGeometry(5, 25, 40),
      eyeMaterial
  )
  right_eye.position.set(15, 18, 30)

  const left_eye = new THREE.Mesh(
      new THREE.SphereGeometry(5, 10, 40),
      eyeMaterial
  )
  left_eye.position.set(-16, 18, 33)

  const nose = new THREE.Mesh(
    new THREE.SphereGeometry(5, 30, 20),
    new THREE.MeshLambertMaterial({ color: 0xed9121 })
  )
  nose.position.set(3, 10, 35)

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(50, 50, 50),
    headMaterial
  )
  body.position.set(0, -60, 0)

  const button_first = new THREE.Mesh(
    buttonGeometry,
    buttonMaterial
  )
  button_first.position.set(0, -30, 37)

  const button_second = new THREE.Mesh(
    buttonGeometry,
    buttonMaterial
  )
  button_second.position.set(0, -40, 43)

  snowman = new THREE.Group()
  snowman.add(hat, hat_line, hat_collar, head, right_eye, left_eye, nose, body, button_first, button_second)
  scene.add(snowman)

  const light = new THREE.DirectionalLight(0xffffff, 0.9)
  light.position.set(0, 50, 30)
  scene.add(light)

  const ambient = new THREE.AmbientLight(0xf8f8ff, 0.9)
  scene.add(ambient)
}

function draw(){
  trackball.update()
  requestAnimationFrame(draw)
  renderer.render(scene, camera)
  snowman.rotateY(Math.PI/24)
}