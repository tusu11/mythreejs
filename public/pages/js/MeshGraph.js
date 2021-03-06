window.addEventListener("load", function(){
  threeStart()
})

function threeStart(){
  initThree()
  initCamera()
  initObject()
  render()
}

var renderer, scene, canvasFrame
function initThree(){
  canvasFrame = document.getElementById('canvas-frame')
  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true });
  if(!renderer) alert('three.jsの初期化に失敗')
  renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight)
  canvasFrame.appendChild(renderer.domElement)
  renderer.setClearColor(0x000000, 1.0)
  renderer.setPixelRatio( window.devicePixelRatio );
  scene = new THREE.Scene()
}

var camera, frustumSize = 1000;
var resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
var clock = new THREE.Clock();
function initCamera(){
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 1000 );
  //var camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000 );
  camera.position.set( 50, 10, 0 );
  controls = new THREE.OrbitControls( camera, canvasFrame)
  var w = canvasFrame.clientWidth;
	var h = canvasFrame.clientHeight;
	var aspect = w / h;

	camera.left   = - frustumSize * aspect / 2;
	camera.right  =   frustumSize * aspect / 2;
	camera.top    =   frustumSize / 2;
	camera.bottom = - frustumSize / 2;

	camera.updateProjectionMatrix();

	renderer.setSize( w, h );

	resolution.set( w, h );
}

var colors = [
	0xed6a5a,
	0xf4f1bb,
	0x9bc1bc,
	0x5ca4a9,
	0xe6ebe0,
	0xf0b67f,
	0xfe5f55,
	0xd6d1b1,
	0xc7efcf,
	0xeef5db,
	0x50514f,
	0xf25f5c,
	0xffe066,
	0x247ba0,
	0x70c1b3
];

var graph = new THREE.Object3D();
function makeLine( geo, c ) {

	var g = new MeshLine();
	g.setGeometry( geo );

	var material = new MeshLineMaterial( {
		useMap: false,
		color: new THREE.Color( colors[ c ] ),
		opacity: 1,
		resolution: resolution,
		sizeAttenuation: !false,
		lineWidth: 5,
		near: camera.near,
		far: camera.far
	});
	var mesh = new THREE.Mesh( g.geometry, material );
	graph.add( mesh );

}

function createLines() {
	var line = new Float32Array( 600 );
	for( var j = 0; j < 200 * 3; j += 3 ) {
		line[ j ] = -30 + .1 * j;
		line[ j + 1 ] = 5 * Math.sin( .01 *  j );
		line[ j + 2 ] = -20;
	}
	makeLine( line, 0 );

	var line = new Float32Array( 600 );
	for( var j = 0; j < 200 * 3; j += 3 ) {
		line[ j ] = -30 + .1 * j;
		line[ j + 1 ] = 5 * Math.cos( .02 *  j );
		line[ j + 2 ] = -10;
	}
	makeLine( line, 1 );

	var line = new Float32Array( 600 );
	for( var j = 0; j < 200 * 3; j += 3 ) {
		line[ j ] = -30 + .1 * j;
		line[ j + 1 ] = 5 * Math.sin( .01 *  j ) * Math.cos( .005 * j );
		line[ j + 2 ] = 0;
	}
	makeLine( line, 2 );

	var line = new Float32Array( 600 );
	for( var j = 0; j < 200 * 3; j += 3 ) {
		line[ j ] = -30 + .1 * j;
		line[ j + 1 ] = .02 * j + 5 * Math.sin( .01 *  j ) * Math.cos( .005 * j );
		line[ j + 2 ] = 10;
	}
	makeLine( line, 4 );

	var line = new Float32Array( 600 );
	for( var j = 0; j < 200 * 3; j += 3 ) {
		line[ j ] = -30 + .1 * j;
		line[ j + 1 ] = Math.exp( .005 * j );
		line[ j + 2 ] = 20;
	}
	makeLine( line, 5 );

	var line = new THREE.Geometry();
	line.vertices.push( new THREE.Vector3( -30, -30, -30 ) );
	line.vertices.push( new THREE.Vector3( 30, -30, -30 ) );
	makeLine( line, 3 );

	var line = new THREE.Geometry();
	line.vertices.push( new THREE.Vector3( -30, -30, -30 ) );
	line.vertices.push( new THREE.Vector3( -30, 30, -30 ) );
	makeLine( line, 3 );

	var line = new THREE.Geometry();
	line.vertices.push( new THREE.Vector3( -30, -30, -30 ) );
	line.vertices.push( new THREE.Vector3( -30, -30, 30 ) );
	makeLine( line, 3 );
}

function initObject() {
  createLines()
  scene.add( graph );
}

function render() {
	requestAnimationFrame( render );
	controls.update();
	graph.rotation.y += .25 * clock.getDelta();

	renderer.render( scene, camera );
}