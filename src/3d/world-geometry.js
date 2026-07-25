/**
 * SANHUEAS 3D - World Geometry
 * Convierte el mapa de tiles en geometría 3D
 */

SANHUEAS.WorldGeometry = (() => {
  'use strict';

  let worldGroup;

  /**
   * Crea la geometría del mundo desde el mapa
   */
  function createWorld() {
    if (!SANHUEAS.World || !SANHUEAS.World.tiles) {
      console.error('Mapa no disponible');
      return false;
    }

    if (worldGroup) {
      SANHUEAS.Three3D.removeFromScene(worldGroup);
    }

    // Grupo que contendrá todo el mundo
    worldGroup = new THREE.Group();
    worldGroup.name = 'World';

    const tiles = SANHUEAS.World.tiles;
    const levelEnv = SANHUEAS.World.getEnvironment();
    const tileSize = 1; // Cada tile es 1x1 unidad

    // Iterar sobre el mapa
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        const tileId = tiles[y][x];

        createFloor(x, y, tileSize, levelEnv);
        if (levelEnv.hasCeiling) {
          createCeiling(x, y, tileSize, levelEnv);
        }

        if (SANHUEAS.BlockRegistry.isSolid(tileId)) {
          createWall(x, y, tileSize, tileId);
        }
      }
    }

    // Agregar el mundo a la escena
    SANHUEAS.Three3D.addToScene(worldGroup);

    console.log('✅ Mundo 3D creado');
    console.log(`   Objetos: ${worldGroup.children.length}`);

    return true;
  }

  /**
   * Crea una pared 3D
   */
  function createWall(x, y, size, tileId) {
    const geometry = new THREE.BoxGeometry(size, 3, size); // 3 unidades de alto
    const materialKey = SANHUEAS.BlockRegistry.getWallMaterialKey(tileId);
    const material = SANHUEAS.Materials.getMaterial(materialKey) || SANHUEAS.Materials.getMaterialForTile(tileId);
    const block = SANHUEAS.BlockRegistry.getBlock(tileId);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Posición centrada en el tile
    mesh.position.set(x + 0.5, 1.5, y + 0.5);

    // Metadatos para colisiones
    mesh.userData = {
      type: 'wall',
      tileId: tileId,
      blockName: block.name,
      category: block.category,
      interactive: !!block.interactive,
      gridX: x,
      gridY: y
    };

    worldGroup.add(mesh);
  }

  /**
   * Crea el suelo de un tile
   */
  function createFloor(x, y, size, levelEnv = {}) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = SANHUEAS.Materials.getFloorMaterial(levelEnv);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2; // Rotar para que sea horizontal
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.set(x + 0.5, 0, y + 0.5);

    mesh.userData = {
      type: 'floor',
      gridX: x,
      gridY: y
    };

    worldGroup.add(mesh);
  }

  /**
   * Crea el techo de un tile
   */
  function createCeiling(x, y, size, levelEnv = {}) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = SANHUEAS.Materials.getCeilingMaterial(levelEnv);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2; // Rotar para que sea horizontal
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.set(x + 0.5, 3, y + 0.5); // Altura del techo: 3

    mesh.userData = {
      type: 'ceiling',
      gridX: x,
      gridY: y
    };

    worldGroup.add(mesh);
  }

  /**
   * Obtiene el grupo del mundo
   */
  function getWorldGroup() {
    return worldGroup;
  }

  /**
   * Obtiene todos los muros (para colisiones)
   */
  function getWalls() {
    if (!worldGroup) return [];

    const walls = [];
    worldGroup.traverse((child) => {
      if (child.userData && child.userData.type === 'wall') {
        walls.push(child);
      }
    });

    return walls;
  }

  /**
   * Obtiene las dimensiones del mundo
   */
  function getWorldDimensions() {
    if (!SANHUEAS.World || !SANHUEAS.World.tiles) {
      return { width: 0, height: 0 };
    }

    const height = SANHUEAS.World.tiles.length;
    const width = SANHUEAS.World.tiles[0]?.length || 0;

    return { width, height };
  }

  /**
   * Verifica si una posición está dentro del mundo
   */
  function isInWorld(x, y) {
    const dims = getWorldDimensions();
    return x >= 0 && x < dims.width && y >= 0 && y < dims.height;
  }

  /**
   * Obtiene el tipo de tile en una posición
   */
  function getTileAt(x, y) {
    if (!isInWorld(x, y)) return 1; // Out of bounds = wall

    const gridX = Math.floor(x);
    const gridY = Math.floor(y);

    return SANHUEAS.World.tiles[gridY]?.[gridX] ?? 1;
  }

  function isSolidAtPosition(x, y) {
    const tileId = getTileAt(x, y);
    return SANHUEAS.BlockRegistry.isSolid(tileId);
  }

  return {
    createWorld,
    createWall,
    createFloor,
    createCeiling,
    getWorldGroup,
    getWalls,
    getWorldDimensions,
    isInWorld,
    getTileAt,
    isSolidAtPosition
  };
})();
