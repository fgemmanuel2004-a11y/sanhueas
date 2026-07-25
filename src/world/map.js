/**
 * SANHUEAS - Mapa del Mundo
 * Gestiona datos del mapa y estructura de tiles
 */

SANHUEAS.World = {
  // Mapa 2D con IDs de tiles
  // 0 = espacio vacío
  // 1 = pared roja (norte)
  // 2 = pared azul (este)
  // 3 = pared verde (sur)
  // 4 = pared amarilla (oeste)
  tiles: [
    [4, 1, 1, 1, 1, 1, 1, 2],
    [4, 0, 0, 0, 0, 0, 0, 2],
    [4, 0, 0, 0, 0, 0, 0, 2],
    [4, 0, 0, 0, 0, 0, 0, 2],
    [4, 0, 0, 0, 0, 0, 0, 2],
    [4, 0, 0, 0, 0, 0, 0, 2],
    [4, 0, 0, 0, 0, 0, 0, 2],
    [4, 3, 3, 3, 3, 3, 3, 2]
  ],

  width: 8,
  height: 8,
  levelName: 'default',
  spawn: {
    x: 4,
    y: 1.6,
    z: 4,
    yaw: 0,
    pitch: 0
  },
  environment: {
    floorMaterial: 'floorGray',
    ceilingMaterial: 'ceilingDark',
    hasCeiling: true
  },
  interactives: [],
  objects: [],

  /**
   * Obtiene el tile en una posición
   */
  getTile(x, y) {
    const tx = Math.floor(x);
    const ty = Math.floor(y);

    if (tx < 0 || tx >= this.width || ty < 0 || ty >= this.height) {
      return 1; // Muro fuera del mapa
    }

    return this.tiles[ty][tx];
  },

  /**
   * Verifica si una posición es walkable
   */
  isWalkable(x, y) {
    const tile = this.getTile(x, y);
    return !SANHUEAS.BlockRegistry.isSolid(tile);
  },

  /**
   * Verifica si una posición es una pared
   */
  isWall(x, y) {
    const tile = this.getTile(x, y);
    return SANHUEAS.BlockRegistry.isSolid(tile);
  },

  /**
   * Obtiene los tiles adyacentes
   */
  getAdjacentTiles(x, y) {
    return {
      north: this.getTile(x, y - 1),
      south: this.getTile(x, y + 1),
      east: this.getTile(x + 1, y),
      west: this.getTile(x - 1, y)
    };
  },

  /**
   * Carga un mapa nuevo
   */
  loadMap(mapData) {
    this.tiles = mapData;
    this.height = mapData.length;
    this.width = mapData[0].length;
    console.log(`[World] Mapa cargado: ${this.width}x${this.height}`);
  },

  /**
   * Carga un nivel completo desde JSON
   */
  loadLevelData(levelData) {
    this.levelName = levelData.name || 'unnamed';
    this.tiles = levelData.tiles;
    this.height = levelData.tiles.length;
    this.width = levelData.tiles[0].length;

    const centerSpawn = {
      x: this.width / 2,
      y: 1.6,
      z: this.height / 2,
      yaw: 0,
      pitch: 0
    };

    this.spawn = {
      ...centerSpawn,
      ...(levelData.spawn || {})
    };

    this.environment = {
      floorMaterial: 'floorGray',
      ceilingMaterial: 'ceilingDark',
      hasCeiling: true,
      ...(levelData.environment || {})
    };

    this.interactives = Array.isArray(levelData.interactives)
      ? levelData.interactives
      : [];
    this.objects = Array.isArray(levelData.objects)
      ? levelData.objects
      : [];

    console.log(`[World] Nivel cargado: ${this.levelName} (${this.width}x${this.height})`);
  },

  getSpawnPoint() {
    return { ...this.spawn };
  },

  getEnvironment() {
    return { ...this.environment };
  },

  getInteractives() {
    return [...this.interactives];
  },

  /**
   * Obtiene un punto de spawn aleatorio
   */
  getRandomSpawnPoint() {
    let x, y;
    do {
      x = Math.random() * this.width;
      y = Math.random() * this.height;
    } while (!this.isWalkable(x, y));
    return { x, y };
  }
};
