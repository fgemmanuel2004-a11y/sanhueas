/**
 * SANHUEAS 3D - Materiales Retro DOOM 64
 * Define los materiales visuales estilo DOOM 64
 */

SANHUEAS.Materials = (() => {
  'use strict';

  const materials = {};

  /**
   * Crea materiales de mapa de pruebas
   */
  function createMaterials() {
    // Paredes por lado: rojo, azul, verde, amarillo
    materials.wallRed = new THREE.MeshLambertMaterial({ color: 0xff3b30 });
    materials.wallBlue = new THREE.MeshLambertMaterial({ color: 0x3b82f6 });
    materials.wallGreen = new THREE.MeshLambertMaterial({ color: 0x22c55e });
    materials.wallYellow = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
    materials.wallDoor = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });

    // Alias de compatibilidad
    materials.wall1 = materials.wallRed;
    materials.wall2 = materials.wallBlue;
    materials.wall3 = materials.wallGreen;
    materials.wall4 = materials.wallYellow;

    // Suelo gris y techo gris oscuro
    materials.floorGray = new THREE.MeshLambertMaterial({ color: 0x666666 });
    materials.ceilingDark = new THREE.MeshLambertMaterial({ color: 0x222222 });

    // Alias de compatibilidad
    materials.floor = materials.floorGray;
    materials.ceiling = materials.ceilingDark;

    // Material reservado
    materials.door = new THREE.MeshLambertMaterial({ color: 0x444444 });

    // Skybox - Cielo muy oscuro
    materials.skybox = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      side: THREE.BackSide
    });

    console.log('✅ Materiales de prueba creados');

    return materials;
  }

  /**
   * Obtiene un material por nombre
   */
  function getMaterial(name) {
    if (!materials[name]) {
      console.warn(`Material no encontrado: ${name}`);
      return materials.wall2; // Default
    }
    return materials[name];
  }

  function getFloorMaterial(levelEnvironment = {}) {
    const key = levelEnvironment.floorMaterial || 'floorGray';
    return getMaterial(key);
  }

  function getCeilingMaterial(levelEnvironment = {}) {
    const key = levelEnvironment.ceilingMaterial || 'ceilingDark';
    return getMaterial(key);
  }

  /**
   * Obtiene el material para un ID de tile
   */
  function getMaterialForTile(tileId) {
    const materialMap = {
      0: 'wall1',
      1: 'wall1',
      2: 'wall2',
      3: 'wall3',
      4: 'wall4'
    };

    const materialName = materialMap[tileId] || 'wall2';
    return getMaterial(materialName);
  }

  /**
   * Aplica efecto de distancia (fog) a un material
   */
  function applyFogEffect(material, distance, maxDistance = 100) {
    if (!material) return;

    // El fog está aplicado a nivel de escena
    // Aquí simplemente podríamos ajustar propiedades si es necesario
  }

  // Inicializar al cargar
  createMaterials();

  return {
    createMaterials,
    getMaterial,
    getFloorMaterial,
    getCeilingMaterial,
    getMaterialForTile,
    applyFogEffect,
    materials
  };
})();
