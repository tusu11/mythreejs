
      window.addEventListener("load", function(){
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
        if(!renderer) alert('three.jsの初期化に失敗')
        renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight)
        canvasFrame.appendChild(renderer.domElement)
        renderer.setClearColor(0x000000, 1.0)
        scene = new THREE.Scene()
        
      }

      var camera
      function initCamera(){
        camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth/canvasFrame.clientHeight, 1, 1000)
        camera.position.set(10, 10, 20)
        camera.up.set(0, 0, 1)
        camera.lookAt(0, 0, 0)
      }

      var axis
      var grid
      var ring
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        grid = new THREE.GridHelper(50, 10)
        grid.rotation.set(Math.PI/2, 0, 0)
        scene.add(grid)

        var vertices = []
        vertices[0] = new THREE.Vector3(-50, -50, 0)
        vertices[1] = new THREE.Vector3(-50, 50, 0)
        vertices[2] = new THREE.Vector3(50, 50, 0)
        vertices[3] = new THREE.Vector3(50, -50, 0)
        vertices[4] = new THREE.Vector3(0, 0, 70)

        var geometry = new THREE.ConvexGeometry(vertices)
        var material = new THREE.MeshNormalMaterial({color: 0xffff00, side: THREE.DoubleSide, wireframe: false})
        ring = new THREE.Mesh(geometry, material)

        scene.add(ring)
      }

function draw(){
  //requestAnimationFrame(draw)
  renderer.render(scene, camera)
}
