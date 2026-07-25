/**
 * SANHUEAS - Raycaster
 * Implementa el algoritmo de raycasting para proyección 3D
 * Versión mejorada con DDA grid-based
 */

SANHUEAS.Raycaster = {
  rays: [],

  /**
   * Castea todos los rayos para la pantalla actual
   */
  castAll() {
    this.rays = [];

    for (let screenX = 0; screenX < SANHUEAS.Config.NUM_RAYS; screenX++) {
      const ray = this.castRay(screenX);
      this.rays.push(ray);
    }
  },

  /**
   * Castea un rayo individual usando DDA mejorado
   */
  castRay(screenX) {
    const camera = SANHUEAS.Camera.getRayForColumn(screenX);
    
    // Normalizar la dirección del rayo
    const dirMag = Math.sqrt(camera.dirX * camera.dirX + camera.dirY * camera.dirY);
    if (dirMag === 0) {
      // Rayo inválido
      return {
        screenX,
        distance: SANHUEAS.Config.MAX_DEPTH,
        x: camera.startX,
        y: camera.startY,
        tileX: Math.floor(camera.startX),
        tileY: Math.floor(camera.startY),
        dirX: 1,
        dirY: 0,
        side: 0
      };
    }

    const dirXNorm = camera.dirX / dirMag;
    const dirYNorm = camera.dirY / dirMag;

    const ray = {
      screenX,
      distance: 0,
      x: 0,
      y: 0,
      tileX: 0,
      tileY: 0,
      dirX: dirXNorm,
      dirY: dirYNorm,
      side: 0
    };

    // Posición inicial - pequeño offset para salir de la posición inicial
    let x = camera.startX;
    let y = camera.startY;
    let distance = 0;
    const maxDistance = SANHUEAS.Config.MAX_DEPTH;
    const step = 0.001; // Paso muy pequeño para máxima precisión

    // Primero avanzar un pequeño step para salir del punto de inicio
    x += dirXNorm * step;
    y += dirYNorm * step;
    distance += step;

    // DDA loop - iterar hasta encontrar pared o llegar al máximo
    let hitWall = false;
    let iterations = 0;
    const maxIterations = Math.floor(maxDistance / step) + 100;

    while (distance < maxDistance && iterations < maxIterations) {
      iterations++;

      // Verificar colisión en posición actual
      if (SANHUEAS.World.isWall(x, y)) {
        ray.distance = distance;
        ray.x = x;
        ray.y = y;
        ray.tileX = Math.floor(x);
        ray.tileY = Math.floor(y);
        hitWall = true;
        break;
      }

      // Avanzar el rayo
      x += dirXNorm * step;
      y += dirYNorm * step;
      distance += step;
    }

    // Si no encontró pared, retornar distancia máxima
    if (!hitWall) {
      ray.distance = maxDistance;
      ray.x = x;
      ray.y = y;
      ray.tileX = Math.floor(x);
      ray.tileY = Math.floor(y);
    }

    return ray;
  },

  /**
   * Obtiene todos los rayos
   */
  getRays() {
    return this.rays;
  },

  /**
   * Obtiene un rayo específico
   */
  getRay(screenX) {
    return this.rays[screenX] || null;
  }
};

// Compatibilidad
const Raycaster = SANHUEAS.Raycaster;
