
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
        camera.position.set(50, 50, 100)
        camera.up.set(0, 0, 1)
        camera.lookAt(0, 0, 0)
      }

      var axis
      var grid
      var circle1
      var circle2
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        grid = new THREE.GridHelper(50, 10)
        grid.rotation.set(Math.PI/2, 0, 0)
        scene.add(grid)

        var geometry1 = new THREE.CircleGeometry(60, 50, 0, Math.PI*4/3, Math.PI/3)
        var material = new THREE.MeshBasicMaterial({color: Math.random()*0xFFFFFF, wireframe: false})
        circle1 = new THREE.Mesh(geometry1, material)
        scene.add(circle1)
        var geometry2 = new THREE.CircleGeometry(60, 50, 0, Math.PI)
        material = new THREE.MeshBasicMaterial({color: Math.random(10)*0xFFFFFF, wireframe: false})
        circle1.position.set(0,0,-1)
        circle2 = new THREE.Mesh(geometry2, material)
        scene.add(circle2)
      }

      function draw(){
        requestAnimationFrame(draw)
        renderer.render(scene, camera)
        circle1.geometry.parameters.radius += 1
        circle2.rotation.z += 0.09
      }
    