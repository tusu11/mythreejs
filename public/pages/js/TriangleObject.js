
      window.addEventListener("load", function(){
        threeStart()
      })

      function threeStart(){
        initThree()
        initCamera()
        initObject()
        loop()
      }

      let renderer, scene, canvasFrame
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

      let camera
      function initCamera(){
        camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth/canvasFrame.clientHeight, 1, 1000)
        camera.position.set( 50, 50, 100)
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
        trackball.minDistance = 40
      }

      let axis
      let triangle
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)

        const geometry = new THREE.Geometry()
        //const material = new THREE.MeshNormalMaterial({opacity: 0.5, transparent: true,side: THREE.DoubleSide, wireframe: false})
        //const material = new THREE.MeshBasicMaterial({color: 0xff0000})
        geometry.vertices[0] = new THREE.Vector3(50, 0, 0)
        geometry.vertices[1] = new THREE.Vector3(0, 50, 0)
        geometry.vertices[2] = new THREE.Vector3(0, 15, 50)
        geometry.vertices[3] = new THREE.Vector3(15, 0, 50)
        geometry.faces[0] =  new THREE.Face3(0, 1, 2)
        geometry.faces[1] = new THREE.Face3(0, 2, 3)
        geometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000)
        geometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00)
        geometry.faces[0].vertexColors[2] = new THREE.Color(0x0000FF)
        geometry.faces[1].vertexColors[0] = new THREE.Color(0xFF0000)
        geometry.faces[1].vertexColors[1] = new THREE.Color(0x0000FF)
        geometry.faces[1].vertexColors[2] = new THREE.Color(0x0000FF)
        const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide, vertexColors: THREE.VertexColors})
      triangle = new THREE.Mesh(geometry, material)
        // lines = new THREE.LineSegments(geometry, material)
        scene.add(triangle)
      }

      let step = 0
      function loop(){
        step++
        trackball.update()
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
      }

    