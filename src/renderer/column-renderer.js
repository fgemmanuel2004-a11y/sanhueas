/**
 * SANHUEAS - Column Renderer
 * Renderiza columnas de paredes (el núcleo del raycaster visual)
 */

SANHUEAS.ColumnRenderer = {
  debugCounter: 0,

  /**
   * Renderiza una columna de pared
   */
  renderColumn(ctx, screenX, ray) {
    // Validar que ray tenga datos
    if (!ray || ray.distance === undefined) {
      return;
    }

    // Validar distancia
    if (ray.distance < 0.01) {
      return; // Rayo sin impacto válido
    }

    // Corregir distorsión de lente (perpendicular distance)
    const player = SANHUEAS.Player;
    
    // Calcular ángulo entre rayo y dirección frontal
    const rayAngle = Math.atan2(ray.dirY, ray.dirX);
    const playerAngle = player.angle;
    let angleDiff = rayAngle - playerAngle;
    
    // Normalizar diferencia angular
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    
    // Distancia perpendicular (elimina efecto barrel)
    const correctedDistance = ray.distance * Math.cos(angleDiff);

    // Evitar divisiones por cero o valores muy pequeños
    if (correctedDistance <= 0.05) return;

    // Calcular altura de la columna
    const fovFactor = 1 / Math.tan(player.fov / 2);
    const wallHeight = (SANHUEAS.Config.SCREEN_HEIGHT * fovFactor) / correctedDistance;
    
    // Calcular posiciones de dibujo
    const drawStart = Math.max(0, (SANHUEAS.Config.SCREEN_HEIGHT - wallHeight) / 2);
    const drawEnd = Math.min(
      SANHUEAS.Config.SCREEN_HEIGHT,
      drawStart + wallHeight
    );
    const drawHeight = drawEnd - drawStart;

    // Validar que hay algo que dibujar
    if (drawHeight <= 0) return;

    // Obtener color de la pared
    const tileId = SANHUEAS.World.getTile(ray.tileX, ray.tileY);
    const color = SANHUEAS.Texture.getWallColor(tileId, correctedDistance);

    // Dibujar columna
    ctx.fillStyle = color;
    ctx.fillRect(screenX, drawStart, 1, drawHeight);

    // Debug: cada 64 píxeles mostrar info
    if (SANHUEAS.Config.DEBUG_MODE && screenX % 64 === 0) {
      ctx.fillStyle = '#00FF00';
      ctx.font = '10px monospace';
      ctx.fillText(
        `R${screenX}:${correctedDistance.toFixed(1)}`,
        screenX,
        drawStart + 10
      );
    }
  },

  /**
   * Renderiza todas las columnas
   */
  renderAllColumns(ctx, rays) {
    if (!rays || rays.length === 0) {
      return;
    }

    for (let x = 0; x < rays.length; x++) {
      if (rays[x]) {
        this.renderColumn(ctx, x, rays[x]);
      }
    }
  }
};
