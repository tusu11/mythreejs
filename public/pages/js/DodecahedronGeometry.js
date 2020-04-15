
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
      var icosahedron
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        grid = new THREE.GridHelper(50, 10)
        grid.rotation.set(Math.PI/2, 0, 0)
        scene.add(grid)

        var geometry = new THREE.IcosahedronGeometry(50, 0)
        geometry.rotateY(2*Math.PI/5)
        geometry.rotateZ(2*Math.PI/5)
        geometry.computeVertexNormals
        var material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide, wireframe: false})
        icosahedron = new THREE.Mesh(geometry, material)
        //フラットシェーディング
        for(var i=0; i<geometry.faces.length; i++){
          geometry.faces[i].vertexNormals[0].copy(geometry.faces[i].normal)
          geometry.faces[i].vertexNormals[1].copy(geometry.faces[i].normal)
          geometry.faces[i].vertexNormals[2].copy(geometry.faces[i].normal)
        }

        scene.add(icosahedron)
      }

      function draw(){
        //requestAnimationFrame(draw)
        renderer.render(scene, camera)
      }
    