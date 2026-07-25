/**
 * SANHUEAS 3D - Three.js Setup
 * Inicializa la escena 3D, cámara y renderer
 */

SANHUEAS.Three3D = (() => {
  'use strict';

  let scene, camera, renderer;
  let canvas;

  /**
   * Inicializa Three.js
   */
  function init() {
    canvas = document.getElementById('gameCanvas');
    if (!canvas) {
      console.error('Canvas no encontrado');
      return false;
    }

    // Crear escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a); // Gris muy oscuro
    scene.fog = new THREE.Fog(0x1a1a1a, 100, 500); // Niebla para crear profundidad

    // Crear cámara
    const width = SANHUEAS.Config.SCREEN_WIDTH;
    const height = SANHUEAS.Config.SCREEN_HEIGHT;
    const fovRadians = SANHUEAS.Config.PLAYER_FOV || Math.PI / 3;
    const fovDegrees = fovRadians * (180 / Math.PI);

    camera = new THREE.PerspectiveCamera(
      fovDegrees,
      width / height,
      0.1,
      1000
    );
    camera.position.set(4, 1.6, 4); // Altura típica de ojos: 1.6
    camera.lookAt(0, 1.6, 0);

    // Crear renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // Iluminación ambiental oscura
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Luz direccional (simulando luz del cielo)
    const directionalLight = new THREE.DirectionalLight(0x808080, 0.8);
    directionalLight.position.set(0, 50, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    scene.add(directionalLight);

    console.log('✅ Three.js inicializado correctamente');
    console.log(`   Resolución: ${width}x${height}`);
    console.log(`   Escena: ${scene.children.length} objetos`);

    return true;
  }

  /**
   * Obtiene la escena
   */
  function getScene() {
    return scene;
  }

  /**
   * Obtiene la cámara
   */
  function getCamera() {
    return camera;
  }

  /**
   * Obtiene el renderer
   */
  function getRenderer() {
    return renderer;
  }

  /**
   * Renderiza la escena
   */
  function render() {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  /**
   * Redimensiona el renderer
   */
  function onWindowResize() {
    if (!camera || !renderer) return; // Proteger si no está inicializado

    const width = SANHUEAS.Config.SCREEN_WIDTH;
    const height = SANHUEAS.Config.SCREEN_HEIGHT;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  /**
   * Limpia la escena
   */
  function clear() {
    renderer.clear();
  }

  /**
   * Agrega un objeto a la escena
   */
  function addToScene(object) {
    scene.add(object);
  }

  /**
   * Remueve un objeto de la escena
   */
  function removeFromScene(object) {
    scene.remove(object);
  }

  // Event listeners
  window.addEventListener('resize', onWindowResize);

  return {
    init,
    getScene,
    getCamera,
    getRenderer,
    render,
    clear,
    addToScene,
    removeFromScene,
    onWindowResize
  };
})();
