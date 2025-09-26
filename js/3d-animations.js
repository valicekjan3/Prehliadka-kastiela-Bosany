// Importovanie Three.js knižnice
// Poznámka: Three.js musí byť načítaný pred týmto skriptom
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

// Globálne premenné
let scene, camera, renderer;
let castle3DModel;
let isAnimating = false;
let animationMixer;
let clock;

// Inicializácia 3D animácií
function init3DAnimations() {
  // Kontrola, či je Three.js načítaný
  if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded. Please include the Three.js library.');
    loadThreeJS();
    return;
  }
  
  // Vytvorenie kontajnera pre 3D model
  const modelContainer = document.createElement('div');
  modelContainer.className = 'model-3d-container';
  modelContainer.style.display = 'none';
  
  // Pridanie kontajnera do DOM
  document.body.appendChild(modelContainer);
  
  // Inicializácia Three.js
  initThreeJS(modelContainer);
  
  // Pridanie tlačidla pre zobrazenie 3D modelu
  addViewModelButton();
}

// Načítanie Three.js knižnice
function loadThreeJS() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      console.log('Three.js loaded successfully');
      resolve();
    };
    script.onerror = () => {
      console.error('Failed to load Three.js');
      reject();
    };
    document.head.appendChild(script);
    
    // Načítanie OrbitControls
    const orbitScript = document.createElement('script');
    orbitScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js';
    document.head.appendChild(orbitScript);
    
    // Načítanie GLTFLoader
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.min.js';
    document.head.appendChild(loaderScript);
  });
}

// Inicializácia Three.js
function initThreeJS(container) {
  // Vytvorenie scény
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);
  
  // Vytvorenie kamery
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Vytvorenie renderera
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
  
  // Pridanie ovládania kamery
  if (typeof THREE.OrbitControls !== 'undefined') {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  } else {
    console.warn('OrbitControls not loaded');
  }
  
  // Pridanie osvetlenia
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  // Vytvorenie hodín pre animácie
  clock = new THREE.Clock();
  
  // Načítanie 3D modelu
  loadCastleModel();
  
  // Responzívny dizajn
  window.addEventListener('resize', onWindowResize);
  
  // Spustenie animačnej slučky
  animate();
}

// Načítanie 3D modelu kaštieľa
function loadCastleModel() {
  // Kontrola, či je GLTFLoader načítaný
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.warn('GLTFLoader not loaded, using placeholder model');
    createPlaceholderModel();
    return;
  }
  
  const loader = new THREE.GLTFLoader();
  
  // Načítanie modelu
  // Poznámka: V reálnej aplikácii by ste mali mať vlastný 3D model kaštieľa
  loader.load(
    'https://threejs.org/examples/models/gltf/LittlestTokyo.glb', // Placeholder model
    function (gltf) {
      castle3DModel = gltf.scene;
      castle3DModel.scale.set(0.01, 0.01, 0.01);
      castle3DModel.position.y = -1;
      scene.add(castle3DModel);
      
      // Nastavenie animácií
      animationMixer = new THREE.AnimationMixer(castle3DModel);
      if (gltf.animations && gltf.animations.length) {
        const action = animationMixer.clipAction(gltf.animations[0]);
        action.play();
      }
      
      // Pridanie bodov za zobrazenie 3D modelu (gamifikácia)
      if (typeof addAchievement === 'function') {
        addAchievement('3d_explorer', '3D prieskumník', 'Prezreli ste si 3D model kaštieľa!', 10);
      }
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error('An error happened while loading the model', error);
      createPlaceholderModel();
    }
  );
}

// Vytvorenie placeholder modelu
function createPlaceholderModel() {
  // Vytvorenie jednoduchého modelu kaštieľa
  const geometry = new THREE.BoxGeometry(2, 1, 3);
  const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const castle = new THREE.Mesh(geometry, material);
  castle.castShadow = true;
  castle.receiveShadow = true;
  scene.add(castle);
  
  // Vytvorenie strechy
  const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 1;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  castle.add(roof);
  
  // Vytvorenie veže
  const towerGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 8);
  const towerMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const tower = new THREE.Mesh(towerGeometry, towerMaterial);
  tower.position.set(1.2, 0.5, 1.2);
  tower.castShadow = true;
  castle.add(tower);
  
  // Vytvorenie strechy veže
  const towerRoofGeometry = new THREE.ConeGeometry(0.4, 0.8, 8);
  const towerRoofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
  const towerRoof = new THREE.Mesh(towerRoofGeometry, towerRoofMaterial);
  towerRoof.position.y = 1.5;
  towerRoof.castShadow = true;
  tower.add(towerRoof);
  
  // Vytvorenie okien
  const windowGeometry = new THREE.PlaneGeometry(0.3, 0.5);
  const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb, side: THREE.DoubleSide });
  
  // Predné okná
  const frontWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
  frontWindow1.position.set(0, 0, 1.51);
  castle.add(frontWindow1);
  
  const frontWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
  frontWindow2.position.set(-0.5, 0, 1.51);
  castle.add(frontWindow2);
  
  const frontWindow3 = new THREE.Mesh(windowGeometry, windowMaterial);
  frontWindow3.position.set(0.5, 0, 1.51);
  castle.add(frontWindow3);
  
  // Zadné okná
  const backWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
  backWindow1.position.set(0, 0, -1.51);
  castle.add(backWindow1);
  
  const backWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
  backWindow2.position.set(-0.5, 0, -1.51);
  castle.add(backWindow2);
  
  const backWindow3 = new THREE.Mesh(windowGeometry, windowMaterial);
  backWindow3.position.set(0.5, 0, -1.51);
  castle.add(backWindow3);
  
  // Vytvorenie dverí
  const doorGeometry = new THREE.PlaneGeometry(0.5, 0.8);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x4d2600, side: THREE.DoubleSide });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, -0.1, 1.51);
  castle.add(door);
  
  // Vytvorenie základne
  const baseGeometry = new THREE.BoxGeometry(4, 0.2, 5);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -0.6;
  base.receiveShadow = true;
  scene.add(base);
  
  // Uloženie modelu
  castle3DModel = castle;
}

// Responzívny dizajn
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animačná slučka
function animate() {
  requestAnimationFrame(animate);
  
  // Aktualizácia animácií
  if (animationMixer) {
    animationMixer.update(clock.getDelta());
  }
  
  // Rotácia modelu
  if (castle3DModel && isAnimating) {
    castle3DModel.rotation.y += 0.005;
  }
  
  // Renderovanie scény
  renderer.render(scene, camera);
}

// Pridanie tlačidla pre zobrazenie 3D modelu
function addViewModelButton() {
  // Vytvorenie tlačidla
  const button = document.createElement('button');
  button.className = 'view-3d-model-btn';
  button.innerHTML = `
    <i class="fas fa-cube"></i>
    <span data-i18n="tour.viewModel">Zobraziť 3D model</span>
  `;
  
  // Pridanie tlačidla do virtuálnej prehliadky
  const tourView = document.querySelector('.tour-view');
  if (tourView) {
    tourView.appendChild(button);
  }
  
  // Pridanie štýlov pre tlačidlo
  const style = document.createElement('style');
  style.textContent = `
    .view-3d-model-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
      padding: 10px 15px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition);
      z-index: 10;
    }
    
    .view-3d-model-btn:hover {
      background-color: var(--secondary-color);
      transform: translateY(-2px);
    }
    
    .model-3d-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      background-color: rgba(0, 0, 0, 0.9);
    }
    
    .model-3d-close {
      position: absolute;
      top: 20px;
      right: 30px;
      color: var(--light-text-color);
      font-size: 2rem;
      cursor: pointer;
      z-index: 2001;
      transition: var(--transition);
    }
    
    .model-3d-close:hover {
      color: var(--secondary-color);
    }
    
    .model-3d-controls {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 20px;
      z-index: 2001;
    }
    
    .model-3d-control-btn {
      padding: 10px 15px;
      background-color: var(--primary-color);
      color: var(--light-text-color);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
    }
    
    .model-3d-control-btn:hover {
      background-color: var(--secondary-color);
    }
    
    .model-3d-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--light-text-color);
      font-size: 1.5rem;
      z-index: 2001;
    }
  `;
  
  document.head.appendChild(style);
  
  // Pridanie event listenera pre tlačidlo
  button.addEventListener('click', showModel);
}

// Zobrazenie 3D modelu
function showModel() {
  // Získanie kontajnera
  const container = document.querySelector('.model-3d-container');
  if (!container) return;
  
  // Zobrazenie kontajnera
  container.style.display = 'block';
  
  // Vytvorenie tlačidla pre zatvorenie
  const closeButton = document.createElement('div');
  closeButton.className = 'model-3d-close';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', hideModel);
  container.appendChild(closeButton);
  
  // Vytvorenie ovládacích prvkov
  const controls = document.createElement('div');
  controls.className = 'model-3d-controls';
  
  // Tlačidlo pre rotáciu
  const rotateButton = document.createElement('button');
  rotateButton.className = 'model-3d-control-btn';
  rotateButton.innerHTML = `
    <i class="fas fa-sync-alt"></i>
    <span data-i18n="tour.model.rotate">Rotovať</span>
  `;
  rotateButton.addEventListener('click', () => {
    isAnimating = !isAnimating;
    rotateButton.innerHTML = isAnimating ? 
      `<i class="fas fa-pause"></i> <span data-i18n="tour.model.stop">Zastaviť</span>` : 
      `<i class="fas fa-sync-alt"></i> <span data-i18n="tour.model.rotate">Rotovať</span>`;
  });
  controls.appendChild(rotateButton);
  
  // Tlačidlo pre reset
  const resetButton = document.createElement('button');
  resetButton.className = 'model-3d-control-btn';
  resetButton.innerHTML = `
    <i class="fas fa-home"></i>
    <span data-i18n="tour.model.reset">Reset</span>
  `;
  resetButton.addEventListener('click', () => {
    if (camera) {
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
    }
  });
  controls.appendChild(resetButton);
  
  container.appendChild(controls);
  
  // Responzívny dizajn
  onWindowResize();
  
  // Aplikovanie prekladu
  if (typeof applyTranslations === 'function') {
    applyTranslations();
  }
  
  // Pridanie bodov za zobrazenie 3D modelu (gamifikácia)
  if (typeof addAchievement === 'function') {
    addAchievement('3d_viewer', '3D prehliadač', 'Zobrazili ste 3D model kaštieľa!', 10);
  }
}

// Skrytie 3D modelu
function hideModel() {
  // Získanie kontajnera
  const container = document.querySelector('.model-3d-container');
  if (!container) return;
  
  // Skrytie kontajnera
  container.style.display = 'none';
  
  // Odstránenie tlačidla pre zatvorenie a ovládacích prvkov
  const closeButton = container.querySelector('.model-3d-close');
  if (closeButton) {
    closeButton.remove();
  }
  
  const controls = container.querySelector('.model-3d-controls');
  if (controls) {
    controls.remove();
  }
}

// Inicializácia po načítaní DOM
document.addEventListener('DOMContentLoaded', () => {
  // Počkáme na načítanie hlavného skriptu
  const checkInterval = setInterval(() => {
    if (document.querySelector('.tour-view')) {
      clearInterval(checkInterval);
      init3DAnimations();
    }
  }, 500);
});