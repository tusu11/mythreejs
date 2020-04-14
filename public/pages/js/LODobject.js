
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
      let lod
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        const geometry = [
        [new THREE.IcosahedronGeometry(30, 4), 60],
        [new THREE.IcosahedronGeometry(30, 3), 90],
        [new THREE.IcosahedronGeometry(30, 2), 120],
        [new THREE.IcosahedronGeometry(30, 1), 150],
        [new THREE.IcosahedronGeometry(30, 0), 180]
        ]
        const material = new THREE.MeshNormalMaterial({wireframe: true})
        lod = new THREE.LOD()
        for(let i=0; i<geometry.length; i++){
          let mesh = new THREE.Mesh(geometry[i][0], material)
          lod.addLevel(mesh, geometry[i][1])
        }
        scene.add(lod)
      }

      let step = 0
      function loop(){
        step++
        trackball.update()
        lod.update(camera)
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
      }

    