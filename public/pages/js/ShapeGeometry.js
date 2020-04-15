
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
        camera.position.set(100, 100, 200)
        camera.up.set(0, 0, 1)
        camera.lookAt(0, 0, 0)
      }

      var axis
      var grid
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        grid = new THREE.GridHelper(50, 10)
        grid.rotation.set(Math.PI/2, 0, 0)
        scene.add(grid)

        var n = 8
        var size = 50
        var parameters= {
          depth: 20,
          bevelEnabled: true,
          bevelSegments: 2,
          bevelThickness: 5,
          bevelSize: 3
        }
        var shape = new THREE.Shape()
        shape.moveTo(0, size)
        for(var i=1; i<n; i++){
          var theta = 2 * Math.PI / n * i
          shape.lineTo(size*Math.sin(theta), size*Math.cos(theta))
        }
        var holePath = new THREE.Path()
        holePath.absarc(20, 20, 15, 0, Math.PI*2, true)
        shape.holes.push(holePath)
        var geometry = new THREE.ExtrudeGeometry(shape, parameters)
        // geometry.rotateY(2*Math.PI/5)
        // geometry.rotateZ(2*Math.PI/5)
        var material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide, wireframe: false})
        shape = new THREE.Mesh(geometry, material)
        //フラットシェーディング
        for(var i=0; i<geometry.faces.length; i++){
          geometry.faces[i].vertexNormals[0].copy(geometry.faces[i].normal)
          geometry.faces[i].vertexNormals[1].copy(geometry.faces[i].normal)
          geometry.faces[i].vertexNormals[2].copy(geometry.faces[i].normal)
        }

        scene.add(shape)
      }

      function draw(){
        //requestAnimationFrame(draw)
        renderer.render(scene, camera)
      }
    