
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

      var axis
      var points
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)

        var geometry = new THREE.Geometry()
        //var material = new THREE.MeshNormalMaterial({opacity: 0.5, transparent: true,side: THREE.DoubleSide, wireframe: false})
        //var material = new THREE.MeshBasicMaterial({color: 0xff0000})
        geometry.vertices[0] = new THREE.Vector3(50, 0, 0)
        geometry.vertices[1] = new THREE.Vector3(0, 50, 0)
        geometry.vertices[2] = new THREE.Vector3(0, 0, 50)
        var color = new THREE.Color("purple")
        var material = new THREE.PointsMaterial({color: color, size: 10.0})
        points = new THREE.Points(geometry, material)
        scene.add(points)
      }

      var step = 0
      function loop(){
        step++
        points.geometry.vertices.forEach(vertex => {
          vertex.set(Math.random(step)*50,Math.random(step)*50,Math.random(step)*50)
        })
        points.geometry.verticesNeedUpdate = true
        trackball.update()
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
      }

    