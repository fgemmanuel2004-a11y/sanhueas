/**
 * SANHUEAS 3D - Camera (FPS)
 * Cámara FPS integrada con Pointer Lock API
 */

SANHUEAS.Camera3D = (() => {
  'use strict';

  let camera;
  let euler; // Para manejar rotación suave
  let lastTime = 0;

  /**
   * Inicializa la cámara
   */
  function init() {
    camera = SANHUEAS.Three3D.getCamera();
    euler = new THREE.Euler(0, 0, 0, 'YXZ'); // Orden: yaw, pitch, roll

    console.log('✅ Cámara 3D inicializada');
    return camera;
  }

  /**
   * Actualiza la cámara según el input del ratón
   */
  function update() {
    if (!SANHUEAS.Input.isPointerLocked() || !camera) return;

    const mouseDelta = SANHUEAS.Input.getMouseDelta();
    if (!mouseDelta) return;

    // Sensibilidad del ratón
    const mouseSensitivity = 0.003;

    // Obtener rotación actual
    euler.setFromQuaternion(camera.quaternion);

    // Aplicar movimiento del ratón
    // Yaw (horizontal) - rotación alrededor del eje Y
    euler.y -= mouseDelta.x * mouseSensitivity;
    
    // Pitch (vertical) - rotación alrededor del eje X
    euler.x -= mouseDelta.y * mouseSensitivity;

    // Limitar pitch entre -PI/2 y PI/2 (no voltear completamente)
    euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

    camera.quaternion.setFromEuler(euler);
  }

  /**
   * Sincroniza la cámara con la posición del jugador
   */
  function syncWithPlayer(playerBody) {
    if (!camera || !playerBody) return;

    // Posición de los ojos (ligeramente más arriba que el centro del cuerpo)
    const eyeHeight = 0.6; // Altura relativa al centro del cuerpo
    camera.position.copy(playerBody.position);
    camera.position.y += eyeHeight;
  }

  /**
   * Obtiene la cámara
   */
  function getCamera() {
    return camera;
  }

  /**
   * Obtiene la dirección hacia adelante
   */
  function getForwardDirection() {
    if (!camera) return new THREE.Vector3(0, 0, -1);

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion);
    return forward;
  }

  /**
   * Obtiene la dirección hacia la derecha
   */
  function getRightDirection() {
    if (!camera) return new THREE.Vector3(1, 0, 0);

    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(camera.quaternion);
    return right;
  }

  /**
   * Obtiene el ángulo yaw (rotación horizontal)
   */
  function getYaw() {
    if (!camera) return 0;
    euler.setFromQuaternion(camera.quaternion);
    return euler.y;
  }

  /**
   * Obtiene el ángulo pitch (rotación vertical)
   */
  function getPitch() {
    if (!camera) return 0;
    euler.setFromQuaternion(camera.quaternion);
    return euler.x;
  }

  /**
   * Resetea la cámara
   */
  function reset(position = new THREE.Vector3(4, 1.6, 4)) {
    if (!camera) return;

    camera.position.copy(position);
    camera.quaternion.set(0, 0, 0, 1);
    euler.set(0, 0, 0);
  }

  return {
    init,
    update,
    syncWithPlayer,
    getCamera,
    getForwardDirection,
    getRightDirection,
    getYaw,
    getPitch,
    reset
  };
})();
