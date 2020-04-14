
      window.addEventListener("load", function(){
        threeStart()
      })

      function threeStart(){
        initThree()
        initCamera()
        initObject()
        draw()
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
        camera.position.set(10, 10, 20)
        camera.up.set(0, 0, 1)
        camera.lookAt(0, 0, 0)
      }

      let axis
      let grid
      let text
      function initObject(){
        axis = new THREE.AxesHelper(50)
        scene.add(axis)
        axis.position.set(0, 0, 0)
        grid = new THREE.GridHelper(50, 10)
        grid.rotation.set(Math.PI/2, 0, 0)
        scene.add(grid)

        
        const fontPath = "./three.js-master/examples/fonts/gentilis_bold.typeface.json"
        const loader = new THREE.FontLoader()
        loader.load(fontPath, function(font){
          const parameters= {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
          }

          const geometry = new THREE.TextGeometry("tftfytfytythree.js", parameters)
          const material = new THREE.MeshNormalMaterial()
          text = new THREE.Mesh(geometry, material)
        
          scene.add(text)

          text.position.set(0, 0, 0)
        })
      }

      function draw(){
        //requestAnimationFrame(draw)
        renderer.render(scene, camera)
      }

    