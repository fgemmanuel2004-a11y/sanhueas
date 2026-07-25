/**
 * SANHUEAS - Camera
 * Gestiona la proyección de la cámara para raycasting
 */

SANHUEAS.Camera = {
  /**
   * Actualiza los vectores de dirección y plano de la cámara
   */
  update() {
    const player = SANHUEAS.Player;

    // Vector de dirección basado en el ángulo
    player.dirX = Math.cos(player.angle);
    player.dirY = Math.sin(player.angle);

    // Calcular plano de cámara perpendicular a la dirección
    const planeLength = Math.tan(player.fov / 2);

    player.planeX = -player.dirY * planeLength;
    player.planeY = player.dirX * planeLength;
  },

  /**
   * Obtiene el rayo para una columna de pantalla
   */
  getRayForColumn(screenX) {
    const player = SANHUEAS.Player;
    const normalizedX = (2 * screenX / SANHUEAS.Config.NUM_RAYS) - 1;

    return {
      // Posición inicial (cámara del jugador)
      startX: player.x,
      startY: player.y,

      // Dirección del rayo
      dirX: player.dirX + player.planeX * normalizedX,
      dirY: player.dirY + player.planeY * normalizedX
    };
  },

  /**
   * Obtiene todos los rayos para el frame actual
   */
  getAllRays() {
    const rays = [];
    for (let x = 0; x < SANHUEAS.Config.NUM_RAYS; x++) {
      rays.push(this.getRayForColumn(x));
    }
    return rays;
  }
};

// Compatibilidad
function updateCamera() {
  SANHUEAS.Camera.update();
}
