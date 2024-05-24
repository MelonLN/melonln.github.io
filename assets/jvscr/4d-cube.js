let scene, camera, renderer, animationId;

function clearScene() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (renderer) {
    document.body.removeChild(renderer.domElement);
    renderer = null;
  }
  if (camera) {
    camera = null;
  }
  if (scene) {
    while(scene.children.length > 0){ 
      scene.remove(scene.children[0]); 
    }
    scene = null;
  }
}

function displayScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

   function createTesseract(size) {
    const vertices = [];
    const edges = [];

    for (let i = 0; i < 16; i++) {
      const x = (i & 1) ? size : -size;
      const y = (i & 2) ? size : -size;
      const z = (i & 4) ? size : -size;
      const w = (i & 8) ? size : -size;
      vertices.push(new THREE.Vector4(x, y, z, w));
    }

    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 4; j++) {
        const neighbor = i ^ (1 << j);
        if (i < neighbor) {
          edges.push([i, neighbor]);
        }
      }
    }

    return { vertices, edges };
  }

  function project4Dto3D(v) {
    const w = 1 / (2 - v.w); 
    return new THREE.Vector3(v.x * w, v.y * w, v.z * w);
  }

  function rotate4D(point, angleXY, angleZW) {
    const cosXY = Math.cos(angleXY);
    const sinXY = Math.sin(angleXY);
    const cosZW = Math.cos(angleZW);
    const sinZW = Math.sin(angleZW);

    const x = point.x * cosXY - point.y * sinXY;
    const y = point.x * sinXY + point.y * cosXY;
    const z = point.z * cosZW - point.w * sinZW;
    const w = point.z * sinZW + point.w * cosZW;

    return new THREE.Vector4(x, y, z, w);
  }

  const size = 1;
  const { vertices, edges } = createTesseract(size);

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(edges.length * 6); 
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color: 0xff00ff });
  const lines = new THREE.LineSegments(geometry, material);
  scene.add(lines);

  let angleXY = 0;
  let angleZW = 0;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  camera.position.z = 5;
  camera.position.y = 2;
  camera.lookAt(0, 0, 0);

  function animate() {
    animationId = requestAnimationFrame(animate);

    angleXY += 0.01;
    angleZW += 0.01;

    let i = 0;
    for (const [start, end] of edges) {
      const rotatedStart = rotate4D(vertices[start], angleXY, angleZW);
      const rotatedEnd = rotate4D(vertices[end], angleXY, angleZW);
      const start3D = project4Dto3D(rotatedStart);
      const end3D = project4Dto3D(rotatedEnd);

      positions[i++] = start3D.x;
      positions[i++] = start3D.y;
      positions[i++] = start3D.z;
      positions[i++] = end3D.x;
      positions[i++] = end3D.y;
      positions[i++] = end3D.z;
    }

    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

function displayScene2() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function createGrid(size, divisions) {
    const gridGroup = new THREE.Group();

    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const step = size / divisions;
    const halfSize = size / 2;

    for (let i = -halfSize; i <= halfSize; i += step) {
      const geometryH = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-halfSize, 0, i),
        new THREE.Vector3(halfSize, 0, i)
      ]);
      const lineH = new THREE.Line(geometryH, material);
      gridGroup.add(lineH);

      const geometryV = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, 0, -halfSize),
        new THREE.Vector3(i, 0, halfSize)
      ]);
      const lineV = new THREE.Line(geometryV, material);
      gridGroup.add(lineV);
    }

    return gridGroup;
  }

  const grid = createGrid(100, 50);
  grid.rotation.x = -Math.PI / 2;
  scene.add(grid);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const cube = new THREE.Mesh(geometry, material);

  const wireframe = new THREE.WireframeGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff00ff });
  const line = new THREE.LineSegments(wireframe, lineMaterial);

  cube.add(line);
  cube.position.y = 0.5;
  scene.add(cube);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  camera.position.z = 5;
  camera.position.y = 2; 
  camera.lookAt(0, 0, 0); 

  const moveSpeed = 0.2; 

  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 87: 
        camera.position.z -= moveSpeed;
        break;
      case 65: 
        camera.position.x -= moveSpeed;
        break;
      case 83:
        camera.position.z += moveSpeed;
        break;
      case 68:
        camera.position.x += moveSpeed;
        break;
    }
    camera.lookAt(cube.position);
  }

  document.addEventListener('keydown', handleKeyDown);

  function animate() {
    animationId = requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

let button = document.getElementById('slider-button');
let clickCount = 0;

button.addEventListener("click", function() {
  clickCount++;

  clearScene();

  if (clickCount === 2) {
    displayScene();
  }
  if (clickCount === 1) {
    displayScene2();
  }
  if (clickCount === 3) {
    clickCount = 0;
  }
});
