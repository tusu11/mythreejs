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
        camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth/canvasFrame.clientHeight, 1, 10000)
        camera.position.set(50, 50, 100)
        camera.up.set(0, 0, 1)
        camera.lookAt(0, 0, 0)
      }

      var axis
      var arrow
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)

        arrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 1).normalize(),
          new THREE.Vector3(0, 0, 0),
          50, 0xFF00FF, 10, 5)
        scene.add(arrow)
      }

      function draw(){
        renderer.render(scene, camera)
      }
    