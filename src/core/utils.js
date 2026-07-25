/**
 * SANHUEAS - Utilidades Generales
 * Funciones auxiliares para matemáticas y geometría
 */

SANHUEAS.Utils = {
  /**
   * Limita un valor entre mín y máx
   */
  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },

  /**
   * Interpola linealmente entre dos valores
   */
  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  /**
   * Distancia euclidiana entre dos puntos
   */
  distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },

  /**
   * Distancia cuadrada (sin raíz, más rápido)
   */
  distanceSquared(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx * dx + dy * dy;
  },

  /**
   * Normaliza un ángulo a rango [0, 2π)
   */
  normalizeAngle(angle) {
    while (angle < 0) angle += Math.PI * 2;
    while (angle >= Math.PI * 2) angle -= Math.PI * 2;
    return angle;
  },

  /**
   * Diferencia angular entre dos ángulos
   */
  angleDiff(a, b) {
    let diff = b - a;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return diff;
  },

  /**
   * Convierte grados a radianes
   */
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  },

  /**
   * Convierte radianes a grados
   */
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  },

  /**
   * FPS counter
   */
  FPSCounter: {
    lastTime: 0,
    frameCount: 0,
    fps: 0,

    update(currentTime) {
      if (!this.lastTime) this.lastTime = currentTime;
      const deltaTime = currentTime - this.lastTime;

      if (deltaTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastTime = currentTime;
      } else {
        this.frameCount++;
      }

      return this.fps;
    },

    getFPS() {
      return this.fps;
    }
  }
};
