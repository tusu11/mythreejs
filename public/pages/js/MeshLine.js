window.addEventListener("load", function(){
  threeStart()
})

function threeStart(){
  initThree()
  initCamera()
  initObject()
  loop()
}

var renderer, scene, canvasFrame
function initThree(){
  canvasFrame = document.getElementById('canvas-frame')
  renderer = new THREE.WebGLRenderer()
  if(!renderer) alert('three.jsの初期化に失敗')
  renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight)
  canvasFrame.appendChild(renderer.domElement)
  renderer.setClearColor(0x000000, 1.0)
  scene = new THREE.Scene()
}

var camera
function initCamera(){
  camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth/canvasFrame.clientHeight, 1, 10000)
  camera.position.set(10, 10, 20)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)
  trackball = new THREE.TrackballControls(camera, canvasFrame)
  trackball.noRotate = false
  trackball.zoomSpeed = 4
  trackball.noPan = false
  trackball.panSpeed = 1.0
  trackball.target = new THREE.Vector3(0, 0, 10)
  trackball.staticMoving = false
  trackball.dynamicDampingFactor = 0.2
  trackball.maxDistance = 400
  trackball.minDistance = 1
}

function initObject(){
  var geometry = new THREE.Geometry();
  for( var j = 0; j < Math.PI; j += 2 * Math.PI / 100 ) {
    var v = new THREE.Vector3( Math.cos( j ), Math.sin( j ), 0 );
    geometry.vertices.push( v );
  }

  var line = new MeshLine();
  line.setGeometry( geometry );

  line.setGeometry( geometry, function( p ) { return 2; } ); // makes width 2 * lineWidth
  line.setGeometry( geometry, function( p ) { return 1 - p; } ); // makes width taper
  line.setGeometry( geometry, function( p ) { return 2 + Math.sin( 50 * p ); } ); // makes width sinusoidal

  var material = new MeshLineMaterial();

  var mesh = new THREE.Mesh( line.geometry, material ); // this syntax could definitely be improved!
  scene.add( mesh );

}
var step = 0
function loop(){
  step++
  trackball.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}
