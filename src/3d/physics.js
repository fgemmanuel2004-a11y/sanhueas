/**
 * SANHUEAS 3D - Physics System
 * Maneja gravedad, colisiones y movimiento
 */

SANHUEAS.Physics = (() => {
  'use strict';

  // Configuración de física
  const GRAVITY = -9.8; // m/s²
  const JUMP_FORCE = 5; // m/s
  const COLLISION_RADIUS = 0.35; // Radio para colisiones
  const COLLISION_HEIGHT = 1.6; // Altura de la cápsula de colisión
  const GROUND_Y = 1.6; // Altura base del centro del cuerpo
  const STEP_HEIGHT = 0.3; // Altura máxima de escalón que puedes subir

  let bodies = [];

  /**
   * Crea un cuerpo físico
   */
  function createBody(options = {}) {
    const body = {
      position: options.position || new THREE.Vector3(0, 1.6, 0),
      velocity: options.velocity || new THREE.Vector3(0, 0, 0),
      mass: options.mass || 1,
      isGravity: options.isGravity !== false,
      isColliding: false,
      canJump: true,
      isCrouching: false,
      crouchAmount: 0, // 0 = normal, 1 = agachado
      maxCrouchAmount: 0.5 // Reducción de altura cuando te agachas
    };

    bodies.push(body);
    return body;
  }

  /**
   * Actualiza la física de un cuerpo
   */
  function updateBody(body, deltaTime) {
    if (!body) return;

    // Aplicar gravedad
    if (body.isGravity) {
      body.velocity.y += GRAVITY * deltaTime;
      body.velocity.y = Math.max(body.velocity.y, -20); // Límite de caída
    }

    // Integrar en ejes por separado para colisión estable
    const nextX = body.position.x + body.velocity.x * deltaTime;
    const nextZ = body.position.z + body.velocity.z * deltaTime;
    const nextY = body.position.y + body.velocity.y * deltaTime;

    moveWithWallCollisions(body, nextX, nextZ);

    body.position.y = nextY;
    if (body.position.y <= GROUND_Y) {
      body.position.y = GROUND_Y;
      if (body.velocity.y < 0) body.velocity.y = 0;
      body.canJump = true;
    }

    // Actualizar posición de agacharse
    if (body.isCrouching) {
      body.crouchAmount = Math.min(body.crouchAmount + deltaTime * 3, body.maxCrouchAmount);
    } else {
      body.crouchAmount = Math.max(body.crouchAmount - deltaTime * 3, 0);
    }

    return body;
  }

  function canOccupy(x, z) {
    const offsets = [
      { x: -COLLISION_RADIUS, z: -COLLISION_RADIUS },
      { x: COLLISION_RADIUS, z: -COLLISION_RADIUS },
      { x: -COLLISION_RADIUS, z: COLLISION_RADIUS },
      { x: COLLISION_RADIUS, z: COLLISION_RADIUS }
    ];

    for (const offset of offsets) {
      if (SANHUEAS.WorldGeometry.isSolidAtPosition(x + offset.x, z + offset.z)) {
        return false;
      }
    }

    return true;
  }

  function moveWithWallCollisions(body, targetX, targetZ) {
    body.isColliding = false;

    if (canOccupy(targetX, body.position.z)) {
      body.position.x = targetX;
    } else {
      body.velocity.x = 0;
      body.isColliding = true;
    }

    if (canOccupy(body.position.x, targetZ)) {
      body.position.z = targetZ;
    } else {
      body.velocity.z = 0;
      body.isColliding = true;
    }
  }

  /**
   * Maneja colisiones contra el mundo
   */
  function handleCollisions(body) {
    // Mantener compatibilidad con llamadas existentes
    if (!body) return;

    if (body.position.y <= GROUND_Y) {
      body.position.y = GROUND_Y;
      body.velocity.y = Math.max(0, body.velocity.y);
      body.canJump = true;
    }
  }

  /**
   * Salta
   */
  function jump(body) {
    if (!body || !body.canJump) return;

    body.velocity.y = JUMP_FORCE;
    body.canJump = false;
  }

  /**
   * Comienza a agacharse
   */
  function startCrouch(body) {
    if (body) {
      body.isCrouching = true;
    }
  }

  /**
   * Termina de agacharse
   */
  function stopCrouch(body) {
    if (body) {
      body.isCrouching = false;
    }
  }

  /**
   * Aplica movimiento al cuerpo
   */
  function applyMovement(body, direction, speed) {
    if (!body || !direction) return;

    const moveVector = direction.clone();
    moveVector.y = 0;
    if (moveVector.lengthSq() === 0) return;

    moveVector.normalize().multiplyScalar(speed);

    // Movimiento estable e independiente del framerate
    body.velocity.x = moveVector.x;
    body.velocity.z = moveVector.z;

    // Aplicar fricción
    body.velocity.x *= 0.9;
    body.velocity.z *= 0.9;
  }

  /**
   * Obtiene todos los cuerpos
   */
  function getBodies() {
    return bodies;
  }

  /**
   * Limpia un cuerpo
   */
  function removeBody(body) {
    const idx = bodies.indexOf(body);
    if (idx > -1) {
      bodies.splice(idx, 1);
    }
  }

  /**
   * Obtiene constantes de física
   */
  function getConstants() {
    return {
      GRAVITY,
      JUMP_FORCE,
      COLLISION_RADIUS,
      COLLISION_HEIGHT,
      STEP_HEIGHT
    };
  }

  return {
    createBody,
    updateBody,
    handleCollisions,
    jump,
    startCrouch,
    stopCrouch,
    applyMovement,
    getBodies,
    removeBody,
    getConstants
  };
})();
