/**
 * SANHUEAS - Main Game Initializer
 * Punto de entrada que inicializa todos los módulos
 */

(function() {
  'use strict';

  /**
   * Inicializa el juego completo
   */
  async function initGame() {
    console.log('%c=== SANHUEAS - FPS 3D (Three.js) ===', 'color: #FF0000; font-weight: bold; font-size: 14px;');

    // 1. Obtener canvas
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
      console.error('[Init] ✗ Canvas no encontrado');
      return;
    }

    // 2. Cargar nivel desde JSON
    try {
      await SANHUEAS.MapLoader.loadFromFile(SANHUEAS.Config.START_LEVEL_FILE);
    } catch (error) {
      console.warn('[Init] No se pudo cargar nivel JSON, se usará mapa embebido:', error.message);
    }

    // 3. Inicializar motor (que inicializa Three.js internamente)
    const engineOk = SANHUEAS.Engine.init(canvas);
    if (!engineOk) {
      console.error('[Init] ✗ No se pudo inicializar engine');
      return;
    }

    // 4. Inicializar input
    SANHUEAS.Input.init();
    console.log('[Init] ✓ Input system listo');

    // 5. Verificar mundo
    const dims = SANHUEAS.WorldGeometry.getWorldDimensions();
    console.log(`[Init] ✓ Mundo 3D: ${dims.width}x${dims.height}`);

    // 6. Verificar jugador 3D
    const playerPos = SANHUEAS.Player3D.getPosition();
    console.log(`[Init] ✓ Player 3D en (${playerPos.x.toFixed(1)}, ${playerPos.y.toFixed(1)}, ${playerPos.z.toFixed(1)})`);

    // 7. Verificar cámara 3D
    const camera = SANHUEAS.Camera3D.getCamera();
    console.log(`[Init] ✓ Cámara 3D inicializada`);

    // 8. Configurar opciones de debug
    SANHUEAS.Config.DEBUG_MODE = false;
    SANHUEAS.Config.SHOW_FPS = true;

    // 9. Iniciar motor
    SANHUEAS.Engine.start();

    console.log('[Init] ✓ ¡Juego iniciado!');
    console.log('[Init]   W/A/S/D = Movimiento');
    console.log('[Init]   RATÓN = Mirar (captura: clic en canvas)');
    console.log('[Init]   ESPACIO = Saltar');
    console.log('[Init]   SHIFT = Correr');
    console.log('[Init]   CTRL = Agacharse');
    console.log('[Init]   ESC = Liberar cursor');
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
})();
