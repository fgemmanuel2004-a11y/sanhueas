/**
 * SANHUEAS - Renderer
 * Renderizador principal del juego
 */

SANHUEAS.Renderer = {
  /**
   * Limpia la pantalla
   */
  clear() {
    if (!window.ctx) return;

    // Fondo gris oscuro
    window.ctx.fillStyle = '#202020';
    window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

    // Cielo (mitad superior)
    window.ctx.fillStyle = '#404040';
    window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height / 2);

    // Suelo (mitad inferior)
    window.ctx.fillStyle = '#101010';
    window.ctx.fillRect(0, window.canvas.height / 2, window.canvas.width, window.canvas.height / 2);
  },

  /**
   * Renderiza el frame actual
   */
  render() {
    // Castear rayos
    SANHUEAS.Raycaster.castAll();

    // Renderizar paredes
    SANHUEAS.ColumnRenderer.renderAllColumns(
      window.ctx,
      SANHUEAS.Raycaster.getRays()
    );

    // Debug: visualizar rayos (opcional)
    if (SANHUEAS.Config.DEBUG_MODE) {
      this.renderDebugRays();
    }

    // Renderizar HUD
    if (SANHUEAS.HUD) {
      SANHUEAS.HUD.render(window.ctx);
    }
  },

  /**
   * Renderiza los rayos para debugging (visualización de rayos en minimap)
   */
  renderDebugRays() {
    // Dibuja líneas desde el jugador hasta los impactos de los rayos
    window.ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    window.ctx.lineWidth = 1;

    const rays = SANHUEAS.Raycaster.getRays();
    // Solo dibujar cada 10mo rayo para no saturar la pantalla
    for (let i = 0; i < rays.length; i += 10) {
      const ray = rays[i];
      if (!ray) continue;

      // Convertir posiciones del mundo a pantalla (para visualizar en minimap)
      const minimapSize = 100;
      const tileSize = minimapSize / SANHUEAS.World.width;
      const x1 = 10 + SANHUEAS.Player.x * tileSize;
      const y1 = 10 + SANHUEAS.Player.y * tileSize;
      const x2 = 10 + ray.x * tileSize;
      const y2 = 10 + ray.y * tileSize;

      window.ctx.beginPath();
      window.ctx.moveTo(x1, y1);
      window.ctx.lineTo(x2, y2);
      window.ctx.stroke();
    }
  }
};
