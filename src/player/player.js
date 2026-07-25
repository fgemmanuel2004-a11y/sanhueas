/**
 * SANHUEAS - Player
 * Representa al jugador con posición, ángulo y física básica
 */

SANHUEAS.Player = {
  x: 3.5,
  y: 3.5,
  angle: 0,
  fov: Math.PI / 3,

  velocity: { x: 0, y: 0 },

  moveSpeed: 3.5,
  mouseSensitivity: 0.003, // Sensibilidad de ratón (radianes por píxel)
  radius: 0.2,

  // Para la cámara
  dirX: 1,
  dirY: 0,
  planeX: 0,
  planeY: 0,

  /**
   * Actualiza el estado del jugador
   */
  update(deltaTime) {
    this.handleInput(deltaTime);
    this.updateVelocity(deltaTime);
    this.checkCollisions();
  },

  /**
   * Maneja entrada de usuario (teclado y ratón)
   */
  handleInput(deltaTime) {
    const actions = SANHUEAS.Input.getActions();
    const speed = actions.run ? this.moveSpeed * 1.5 : this.moveSpeed;

    let moveX = 0;
    let moveY = 0;

    // Movimiento forward/backward (W/S)
    if (actions.forward) {
      moveX += Math.cos(this.angle) * speed;
      moveY += Math.sin(this.angle) * speed;
    }
    if (actions.backward) {
      moveX -= Math.cos(this.angle) * speed;
      moveY -= Math.sin(this.angle) * speed;
    }

    // Strafe left/right (A/D)
    if (actions.strafeLeft) {
      moveX += Math.cos(this.angle - Math.PI / 2) * speed;
      moveY += Math.sin(this.angle - Math.PI / 2) * speed;
    }
    if (actions.strafeRight) {
      moveX += Math.cos(this.angle + Math.PI / 2) * speed;
      moveY += Math.sin(this.angle + Math.PI / 2) * speed;
    }

    // Rotación con ratón (Pointer Lock)
    if (SANHUEAS.Input.isPointerLocked()) {
      const mouseDelta = SANHUEAS.Input.getMouseDelta();
      this.angle += mouseDelta.x * this.mouseSensitivity;
      
      // Normalizar ángulo
      this.angle = SANHUEAS.Utils.normalizeAngle(this.angle);
    }

    this.velocity.x = moveX;
    this.velocity.y = moveY;

    // Acciones especiales
    if (actions.pause) {
      if (SANHUEAS.StateManager.isPlaying()) {
        SANHUEAS.StateManager.setState(SANHUEAS.State.PAUSED);
      } else if (SANHUEAS.StateManager.isPaused()) {
        SANHUEAS.StateManager.setState(SANHUEAS.State.PLAYING);
      }
    }

    if (actions.shoot) {
      this.shoot();
    }

    if (actions.interact) {
      this.interact();
    }
  },

  /**
   * Actualiza la velocidad y posición
   */
  updateVelocity(deltaTime) {
    const newX = this.x + this.velocity.x * deltaTime;
    const newY = this.y + this.velocity.y * deltaTime;

    // Verificar colisiones antes de mover
    if (SANHUEAS.World.isWalkable(newX, this.y)) {
      this.x = newX;
    }
    if (SANHUEAS.World.isWalkable(this.x, newY)) {
      this.y = newY;
    }
  },

  /**
   * Verifica colisiones avanzadas
   */
  checkCollisions() {
    // Verificar si está muy cerca de paredes
    const buffer = SANHUEAS.Config.WALL_BUFFER;

    // Colisión en X
    if (!SANHUEAS.World.isWalkable(this.x + buffer, this.y)) {
      this.x = Math.floor(this.x) + 1 - buffer;
    }
    if (!SANHUEAS.World.isWalkable(this.x - buffer, this.y)) {
      this.x = Math.floor(this.x) + buffer;
    }

    // Colisión en Y
    if (!SANHUEAS.World.isWalkable(this.x, this.y + buffer)) {
      this.y = Math.floor(this.y) + 1 - buffer;
    }
    if (!SANHUEAS.World.isWalkable(this.x, this.y - buffer)) {
      this.y = Math.floor(this.y) + buffer;
    }
  },

  /**
   * Dispara arma
   */
  shoot() {
    // Solo registrar el evento, sin implementar armas aún
    // console.log('[Player] Disparo');
  },

  /**
   * Interactúa con el entorno
   */
  interact() {
    // Placeholder para futuras interacciones
    // console.log('[Player] Interact');
  },

  /**
   * Obtiene la posición actual
   */
  getPosition() {
    return { x: this.x, y: this.y };
  },

  /**
   * Obtiene el ángulo actual
   */
  getAngle() {
    return this.angle;
  },

  /**
   * Resetea al jugador
   */
  reset(x, y, angle) {
    this.x = x || 3.5;
    this.y = y || 3.5;
    this.angle = angle || 0;
    this.velocity = { x: 0, y: 0 };
  }
};
