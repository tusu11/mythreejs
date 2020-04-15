
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
      }

      var axis
      var pot = []
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)

        var geometry = new THREE.TeapotBufferGeometry(10, 10, true, true, true, true, false)
        //var material = new THREE.MeshNormalMaterial({opacity: 0.5, transparent: true,side: THREE.DoubleSide, wireframe: false})
        //var material = new THREE.MeshBasicMaterial({color: 0xff0000})
        var color = new THREE.Color("purple")
        var material = new THREE.MeshBasicMaterial({color: color})
        pot[0] = new THREE.Mesh(geometry, material)
        scene.add(pot[0])
        geometry.rotateX(Math.PI/2)
        pot[0].position.set(0, -40, 0)
        pot[1] = new THREE.Mesh(geometry, material)
        scene.add(pot[1])
        geometry.rotateX(Math.PI/2)
        pot[1].position.set(0, 0, 0)
        pot[2] = new THREE.Mesh(geometry, material)
        scene.add(pot[2])
        geometry.rotateX(Math.PI/2)
        pot[2].position.set(0, 40, 0)
      }

      var step = 0
      function loop(){
        step++
        var cameraX = 150* Math.cos(step/20)
        var cameraY = 150* Math.sin(step/20)
        var cameraZ = 150* Math.cos(step/20)
        camera.position.set(cameraX, cameraY, cameraZ)
        camera.up.set(0, 0, 1)
        camera.lookAt(0, 0, 0)
        pot[0].rotation.set(step/100, 0, 0)
        pot[1].rotation.set(0, step/100, 0)
        pot[2].rotation.set(0, 0, step/100)
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
      }

    