/**
 * SANHUEAS - Game Engine / Game Loop
 * Motor del juego. Orquesta Three.js, física y actualización del jugador
 */

SANHUEAS.Engine = {
  running: false,
  lastFrameTime: 0,
  deltaTime: 0,
  accumulator: 0,
  FIXED_TIME_STEP: 1 / 60,
  use3D: true, // Usar motor 3D (Three.js)

  /**
   * Inicializa el motor
   */
  init(canvasElement) {
    this.canvas = canvasElement;

    if (!this.canvas) {
      console.error('[Engine] Canvas no encontrado');
      return false;
    }

    // Establecer tamaño del canvas
    this.canvas.width = SANHUEAS.Config.SCREEN_WIDTH;
    this.canvas.height = SANHUEAS.Config.SCREEN_HEIGHT;

    // Inicializar Three.js
    if (!SANHUEAS.Three3D.init()) {
      console.error('[Engine] No se pudo inicializar Three.js');
      return false;
    }

    // Crear el mundo 3D
    if (!SANHUEAS.WorldGeometry.createWorld()) {
      console.error('[Engine] No se pudo crear la geometría del mundo');
      return false;
    }

    // Inicializar cámara 3D
    SANHUEAS.Camera3D.init();

    // Spawn definido por nivel
    const spawnData = SANHUEAS.World.getSpawnPoint();
    const spawn = new THREE.Vector3(spawnData.x, spawnData.y, spawnData.z);

    // Inicializar jugador 3D
    if (!SANHUEAS.Player3D.init(spawn)) {
      console.error('[Engine] No se pudo inicializar el jugador 3D');
      return false;
    }

    // Orientación inicial definida por nivel
    const camera3D = SANHUEAS.Camera3D.getCamera();
    const lookDir = new THREE.Vector3(
      Math.sin(spawnData.yaw || 0),
      Math.sin(spawnData.pitch || 0),
      -Math.cos(spawnData.yaw || 0)
    );
    const lookTarget = spawn.clone().add(lookDir);
    camera3D.lookAt(lookTarget);

    // Obtener contexto 2D para HUD (overlay)
    this.ctx = this.canvas.getContext('2d');

    // Hacer accesibles globalmente
    window.canvas = this.canvas;
    window.ctx = this.ctx;

    console.log('[Engine] ✓ Inicializado');
    console.log(`[Engine] Canvas: ${this.canvas.width}x${this.canvas.height}`);
    console.log(`[Engine] Motor: Three.js (3D moderno)`);

    return true;
  },

  /**
   * Inicia el game loop
   */
  start() {
    console.log('[Engine] Intentando iniciar game loop...');
    if (this.running) {
      console.warn('[Engine] Game loop ya está corriendo');
      return;
    }
    this.running = true;
    this.lastFrameTime = performance.now();
    this.loop = this.gameLoop.bind(this);
    requestAnimationFrame(this.loop);
    console.log('[Engine] ✅ Game loop iniciado');
  },

  /**
   * Detiene el game loop
   */
  stop() {
    this.running = false;
    console.log('[Engine] Game loop detenido');
  },

  /**
   * Game loop principal
   */
  gameLoop(currentTime) {
    if (!this.running) return;

    // Calcular delta time
    this.deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    // Limitar deltaTime máximo
    if (this.deltaTime > SANHUEAS.Config.DELTA_TIME_MAX) {
      this.deltaTime = SANHUEAS.Config.DELTA_TIME_MAX;
    }

    // Acumular tiempo para fixed update
    this.accumulator += this.deltaTime;

    // Update fijo
    while (this.accumulator >= this.FIXED_TIME_STEP) {
      this.update(this.FIXED_TIME_STEP);
      this.accumulator -= this.FIXED_TIME_STEP;
    }

    // Render
    this.render();

    // Siguiente frame
    requestAnimationFrame(this.loop);
  },

  /**
   * Actualización del juego
   */
  update(deltaTime) {
    // No actualizar si no estamos jugando
    if (!SANHUEAS.StateManager.isPlaying()) {
      return;
    }

    // Actualizar jugador 3D (incluye física, input, cámara)
    if (SANHUEAS.Player3D) {
      SANHUEAS.Player3D.update(deltaTime);
    }

    // Actualizar entidades
    if (SANHUEAS.EntityManager) {
      SANHUEAS.EntityManager.update(deltaTime);
    }
  },

  /**
   * Renderización del juego
   */
  render() {
    // Renderizar mundo 3D con Three.js SIEMPRE (no depender de Pointer Lock)
    if (SANHUEAS.Three3D) {
      SANHUEAS.Three3D.render();
    }

    // Renderizar HUD como overlay 2D
    if (SANHUEAS.HUD && this.ctx) {
      SANHUEAS.HUD.render(this.ctx);
    }

    // Debug info extendido solo en modo debug
    if (SANHUEAS.Config.DEBUG_MODE) {
      this.renderDebugInfo();
    }
  },

  /**
   * Renderiza información de debug
   */
  renderDebugInfo() {
    if (!this.ctx) return; // Proteger si no hay contexto

    const fps = SANHUEAS.Utils.FPSCounter.update(performance.now());

    this.ctx.fillStyle = '#00FF00';
    this.ctx.font = '11px monospace';
    this.ctx.textAlign = 'left';

    // FPS
    this.ctx.fillText(`FPS: ${fps}`, 120, 20);

    // Posición del jugador
    const playerPos = SANHUEAS.Player3D.getPosition();
    if (playerPos) {
      this.ctx.fillText(
        `Pos: (${playerPos.x.toFixed(1)}, ${playerPos.y.toFixed(1)}, ${playerPos.z.toFixed(1)})`,
        120,
        33
      );
    }

    // Velocidad
    const playerVel = SANHUEAS.Player3D.getVelocity();
    if (playerVel) {
      const speed = Math.sqrt(playerVel.x ** 2 + playerVel.z ** 2);
      this.ctx.fillText(
        `Speed: ${speed.toFixed(1)} m/s`,
        120,
        46
      );
    }

    // Estado
    const body = SANHUEAS.Player3D.getBody();
    if (body) {
      let state = 'Idle';
      if (SANHUEAS.Player3D.isJumping()) state = 'Jumping';
      if (SANHUEAS.Player3D.isCrouched()) state = 'Crouch';

      this.ctx.fillText(`State: ${state}`, 120, 59);
    }
  },

  getDeltaTime() {
    return this.deltaTime;
  }
};
