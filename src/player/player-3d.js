/**
 * SANHUEAS 3D - Player (FPS)
 * Jugador 3D con física, entrada y cámara FPS
 */

SANHUEAS.Player3D = (() => {
  'use strict';

  let body;
  let moveSpeed = 5; // m/s
  let sprintMultiplier = 1.5;
  let isSprinting = false;

  /**
   * Inicializa el jugador 3D
   */
  function init(position = new THREE.Vector3(4, 1.6, 4)) {
    // Crear cuerpo físico
    body = SANHUEAS.Physics.createBody({
      position: position.clone(),
      mass: 1,
      isGravity: true
    });

    console.log('✅ Jugador 3D inicializado');
    console.log(`   Posición: (${body.position.x.toFixed(1)}, ${body.position.y.toFixed(1)}, ${body.position.z.toFixed(1)})`);

    return body;
  }

  /**
   * Actualiza el jugador
   */
  function update(deltaTime) {
    if (!body) return;

    // Procesar input
    handleInput();

    // Actualizar física
    SANHUEAS.Physics.updateBody(body, deltaTime);

    // Sincronizar cámara
    SANHUEAS.Camera3D.syncWithPlayer(body);

    // Actualizar cámara con input del ratón
    SANHUEAS.Camera3D.update();
  }

  /**
   * Procesa el input del jugador
   */
  function handleInput() {
    if (!body || !SANHUEAS.Input.isPointerLocked()) return;

    const actions = SANHUEAS.Input.getActions();

    // Sprint (Shift)
    isSprinting = actions.run;
    const currentSpeed = isSprinting ? moveSpeed * sprintMultiplier : moveSpeed;

    // Obtener direcciones de la cámara
    const forward = SANHUEAS.Camera3D.getForwardDirection();
    const right = SANHUEAS.Camera3D.getRightDirection();

    // El movimiento del jugador es en plano XZ, independientemente del pitch
    forward.y = 0;
    right.y = 0;
    if (forward.lengthSq() > 0) forward.normalize();
    if (right.lengthSq() > 0) right.normalize();

    // Movimiento WASD
    if (actions.forward) {
      SANHUEAS.Physics.applyMovement(body, forward, currentSpeed);
    }
    if (actions.backward) {
      const backward = forward.clone().multiplyScalar(-1);
      SANHUEAS.Physics.applyMovement(body, backward, currentSpeed * 0.8);
    }
    if (actions.strafeLeft) {
      const left = right.clone().multiplyScalar(-1);
      SANHUEAS.Physics.applyMovement(body, left, currentSpeed * 0.8);
    }
    if (actions.strafeRight) {
      SANHUEAS.Physics.applyMovement(body, right, currentSpeed * 0.8);
    }

    // Saltar (Espacio)
    if (actions.jump) {
      SANHUEAS.Physics.jump(body);
      SANHUEAS.Input.actions.jump = false;
    }

    // Agacharse (Ctrl)
    if (actions.crouch) {
      SANHUEAS.Physics.startCrouch(body);
    } else {
      SANHUEAS.Physics.stopCrouch(body);
    }

    // Disparar (Clic izquierdo)
    if (SANHUEAS.Input.mousePressed) {
      onFire();
    }

  }

  /**
   * Se ejecuta cuando el jugador dispara
   */
  function onFire() {
    // TODO: Implementar sistema de armas
    console.log('🔫 Disparo registrado');
  }

  /**
   * Se ejecuta cuando el jugador interactúa
   */
  function onInteract() {
    // TODO: Implementar interacciones
    console.log('🔑 Interacción registrada');
  }

  /**
   * Obtiene el cuerpo del jugador
   */
  function getBody() {
    return body;
  }

  /**
   * Obtiene la posición del jugador
   */
  function getPosition() {
    return body ? body.position.clone() : null;
  }

  /**
   * Obtiene la velocidad del jugador
   */
  function getVelocity() {
    return body ? body.velocity.clone() : null;
  }

  /**
   * Establece velocidad de movimiento
   */
  function setMoveSpeed(speed) {
    moveSpeed = speed;
  }

  /**
   * Obtiene si está en el suelo
   */
  function isGrounded() {
    return body ? body.canJump : false;
  }

  /**
   * Obtiene si está agachado
   */
  function isCrouched() {
    return body ? body.isCrouching : false;
  }

  /**
   * Obtiene si está saltando
   */
  function isJumping() {
    return body ? !body.canJump && body.velocity.y > 0 : false;
  }

  /**
   * Resetea la posición del jugador
   */
  function reset(position = new THREE.Vector3(4, 1.6, 4)) {
    if (!body) return;

    body.position.copy(position);
    body.velocity.set(0, 0, 0);
    body.canJump = true;

    SANHUEAS.Camera3D.reset(position);
  }

  return {
    init,
    update,
    handleInput,
    getBody,
    getPosition,
    getVelocity,
    setMoveSpeed,
    isGrounded,
    isCrouched,
    isJumping,
    reset
  };
})();
