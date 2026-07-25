/**
 * SANHUEAS - Input System (DOOM-style)
 * Gestiona entrada del teclado y ratón con Pointer Lock API
 */

SANHUEAS.Input = {
  keys: {},
  actions: {},
  
  // Mouse state
  mouseX: 0,
  mouseY: 0,
  mouseDeltaX: 0,
  mouseDeltaY: 0,
  isMouseLocked: false,
  mousePressed: false,

  // Mapeo de teclas a acciones
  KEY_MAP: {
    'w': 'forward',
    'arrowup': 'forward',
    's': 'backward',
    'arrowdown': 'backward',
    'a': 'strafeLeft',
    'q': 'strafeLeft',
    'd': 'strafeRight',
    'e': 'strafeRight',
    'shift': 'run',
    ' ': 'jump',
    'control': 'crouch',
    'enter': 'interact',
    'p': 'pause',
    'escape': 'unlock'
  },

  init() {
    // Inicializar acciones
    Object.values(this.KEY_MAP).forEach(action => {
      this.actions[action] = false;
    });

    // Añadir actions especiales
    this.actions['shoot'] = false;

    // Event listeners de teclado
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Event listeners de ratón
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    document.addEventListener('mouseup', (e) => this.handleMouseUp(e));

    // Pointer Lock change events
    document.addEventListener('pointerlockchange', () => this.handlePointerLockChange());
    document.addEventListener('pointerlockerror', () => this.handlePointerLockError());

    // Click en canvas para capturar cursor
    if (window.canvas) {
      window.canvas.addEventListener('click', () => this.requestPointerLock());
    }

    console.log('[Input] ✓ Sistema de input inicializado (DOOM-style)');
  },

  /**
   * Manejo de teclas presionadas
   */
  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    
    // Evitar repetición si ya está presionada
    if (this.keys[key]) return;
    
    this.keys[key] = true;

    // Mapear a acción
    if (this.KEY_MAP[key]) {
      this.actions[this.KEY_MAP[key]] = true;
    }

    // Escape para liberar cursor
    if (key === 'escape') {
      this.releasePointerLock();
    }
  },

  /**
   * Manejo de teclas soltadas
   */
  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    this.keys[key] = false;

    if (this.KEY_MAP[key]) {
      this.actions[this.KEY_MAP[key]] = false;
    }
  },

  /**
   * Manejo de movimiento del ratón
   */
  handleMouseMove(event) {
    if (!this.isMouseLocked) {
      this.mouseDeltaX = 0;
      this.mouseDeltaY = 0;
      return;
    }

    // movementX y movementY son específicos de Pointer Lock
    this.mouseDeltaX = event.movementX || 0;
    this.mouseDeltaY = event.movementY || 0;
  },

  /**
   * Manejo de botón del ratón presionado
   */
  handleMouseDown(event) {
    if (event.button === 0) { // Botón izquierdo
      this.mousePressed = true;
      this.actions['shoot'] = true;
    }
  },

  /**
   * Manejo de botón del ratón soltado
   */
  handleMouseUp(event) {
    if (event.button === 0) { // Botón izquierdo
      this.mousePressed = false;
      this.actions['shoot'] = false;
    }
  },

  /**
   * Solicita Pointer Lock
   */
  requestPointerLock() {
    if (!this.isMouseLocked && window.canvas) {
      window.canvas.requestPointerLock =
        window.canvas.requestPointerLock || window.canvas.mozRequestPointerLock;

      if (window.canvas.requestPointerLock) {
        window.canvas.requestPointerLock();
      }
    }
  },

  /**
   * Libera Pointer Lock
   */
  releasePointerLock() {
    document.exitPointerLock =
      document.exitPointerLock || document.mozExitPointerLock;

    if (document.exitPointerLock) {
      document.exitPointerLock();
    }
  },

  /**
   * Maneja cambios en Pointer Lock
   */
  handlePointerLockChange() {
    const pointerLockElement =
      document.pointerLockElement ||
      document.mozPointerLockElement;

    this.isMouseLocked = !!pointerLockElement;
    console.log(
      `[Input] Pointer Lock ${this.isMouseLocked ? 'ACTIVADO' : 'DESACTIVADO'}`
    );
  },

  /**
   * Maneja errores de Pointer Lock
   */
  handlePointerLockError() {
    console.warn('[Input] ⚠ Error en Pointer Lock');
  },

  /**
   * Verifica si una tecla está presionada
   */
  isKeyDown(key) {
    return this.keys[key.toLowerCase()] || false;
  },

  /**
   * Verifica si una acción está activa
   */
  isActionActive(action) {
    return this.actions[action] || false;
  },

  /**
   * Obtiene el estado de todas las acciones
   */
  getActions() {
    return { ...this.actions };
  },

  /**
   * Obtiene delta del ratón (para rotación)
   */
  getMouseDelta() {
    const delta = {
      x: this.mouseDeltaX,
      y: this.mouseDeltaY
    };
    // Resetear para el siguiente frame
    this.mouseDeltaX = 0;
    this.mouseDeltaY = 0;
    return delta;
  },

  /**
   * Verifica si el cursor está capturado
   */
  isPointerLocked() {
    return this.isMouseLocked;
  },

  /**
   * Limpia el estado de input
   */
  clear() {
    this.keys = {};
    Object.keys(this.actions).forEach(action => {
      this.actions[action] = false;
    });
  }
};
