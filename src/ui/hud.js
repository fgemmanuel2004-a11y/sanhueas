/**
 * SANHUEAS - HUD (Heads-Up Display)
 * Interfaz del jugador durante el juego
 */

SANHUEAS.HUD = {
  /**
   * Renderiza el HUD
   */
  render(ctx) {
    // Mostrar overlay si cursor no está capturado
    if (!SANHUEAS.Input.isPointerLocked()) {
      this.renderPointerLockOverlay(ctx);
      return;
    }

    this.renderCrosshair(ctx);
    this.renderDevInfo(ctx);
  },

  /**
   * Renderiza overlay de solicitud de Pointer Lock
   */
  renderPointerLockOverlay(ctx) {
    // Fondo semi-transparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, SANHUEAS.Config.SCREEN_WIDTH, SANHUEAS.Config.SCREEN_HEIGHT);

    // Texto principal
    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SANHUEAS', SANHUEAS.Config.HALF_WIDTH, SANHUEAS.Config.HALF_HEIGHT - 60);

    // Mensaje
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Arial';
    ctx.fillText('Haz clic para comenzar', SANHUEAS.Config.HALF_WIDTH, SANHUEAS.Config.HALF_HEIGHT);

    // Instrucciones
    ctx.fillStyle = '#00FF00';
    ctx.font = '14px monospace';
    ctx.fillText('Presiona ESC para liberar el cursor', SANHUEAS.Config.HALF_WIDTH, SANHUEAS.Config.HALF_HEIGHT + 50);
  },

  /**
   * Dibuja una cruz pequeña en el centro de la pantalla
   */
  renderCrosshair(ctx) {
    const cx = SANHUEAS.Config.HALF_WIDTH;
    const cy = SANHUEAS.Config.HALF_HEIGHT;
    const size = 5;

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - size, cy);
    ctx.lineTo(cx + size, cy);
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx, cy + size);
    ctx.stroke();
  },

  /**
   * Muestra coordenadas XYZ y FPS en una esquina
   */
  renderDevInfo(ctx) {
    const playerPos = SANHUEAS.Player3D && SANHUEAS.Player3D.getPosition
      ? SANHUEAS.Player3D.getPosition()
      : null;

    if (!playerPos) return;

    const fps = SANHUEAS.Utils.FPSCounter.update(performance.now());

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`X: ${playerPos.x.toFixed(2)}`, 10, 20);
    ctx.fillText(`Y: ${playerPos.y.toFixed(2)}`, 10, 36);
    ctx.fillText(`Z: ${playerPos.z.toFixed(2)}`, 10, 52);
    ctx.fillText(`FPS: ${fps}`, 10, 68);
  }
};
