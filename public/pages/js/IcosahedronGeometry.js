
      window.addEventListener("load", function(){
        threeStart()
        addNode()
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
      var p, q
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        grid = new THREE.GridHelper(50, 10)
        grid.rotation.set(Math.PI/2, 0, 0)
        scene.add(grid)

        var geometry = new THREE.TorusKnotGeometry(40, 5, 50, 50, p, q)
        // geometry.rotateY(2*Math.PI/5)
        // geometry.rotateZ(2*Math.PI/5)
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

      var form
      var inputP
      var inputQ
      function addNode(){
        var main = document.getElementById('main')
        form = main.appendChild(document.createElement('form'))
        inputP = form.appendChild(document.createElement('input'))
        inputP.setAttribute('type', 'number')
        inputP.setAttribute('name', 'p')
        inputP.setAttribute('value', '1')
        inputP.setAttribute('type', 'number')
        inputQ = form.appendChild(document.createElement('input'))
        inputQ.setAttribute('type', 'number')
        inputQ.setAttribute('name', 'q')
        inputQ.setAttribute('value', '1')
        inputQ.setAttribute('type', 'number')
        button = form.appendChild(document.createElement('input'))
        button.setAttribute('type', 'button')
        button.setAttribute('value', 'セット')
        button.setAttribute('onclick', 'setPQ()')
      }

      function setPQ(){
        [p, q] = [inputP.value, inputQ.value]
        var canvas = document.getElementsByTagName('canvas')
        canvasFrame.removeChild(canvas[0])
        threeStart()
      }

    