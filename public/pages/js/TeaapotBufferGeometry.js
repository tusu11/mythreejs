
      window.addEventListener("load", function(){
        var color = new THREE.Color("purple")
        threeStart(new THREE.MeshBasicMaterial({color: color}))
        threeStart(new THREE.MeshDepthMaterial({wireframe: true}))
      })

      function threeStart(mtr){
        initThree()
        initCamera()
        initObject(mtr)
        draw()
      }

      var renderer, scene, canvasFrame
      function initThree(){
        canvasFrame = document.getElementById('canvas-frame')
        //renderer = new THREE.WebGLRenderer()
        renderer = new THREE.WebGLRenderer()
        if(!renderer) alert('three.jsの初期化に失敗')
        renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight)
        canvasFrame.appendChild(renderer.domElement)
        renderer.setClearColor(0x000000, 1.0)
        scene = new THREE.Scene()
        
      }

      var camera
      function initCamera(){
        camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth/canvasFrame.clientHeight, 1, 1000)
        camera.position.set( 50, 50, 100)
        camera.up.set(0, 0, 1)
        camera.lookAt(0, 0, 0)
      }

      var axis
      var grid
      var ring
      function initObject(mtr){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        grid = new THREE.GridHelper(50, 10)
        grid.rotation.set(Math.PI/2, 0, 0)
        scene.add(grid)

        var geometry = new THREE.TeapotBufferGeometry(50, 10, true, true, true, true, false)
        //var material = new THREE.MeshNormalMaterial({opacity: 0.5, transparent: true,side: THREE.DoubleSide, wireframe: false})
        //var material = new THREE.MeshBasicMaterial({color: 0xff0000})
        var material = mtr
        ring = new THREE.Mesh(geometry, material)
        geometry.rotateX(Math.PI/2)
        scene.add(ring)
      }

function draw(){
  //requestAnimationFrame(draw)
  renderer.render(scene, camera)
}
