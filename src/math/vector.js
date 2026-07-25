/**
 * SANHUEAS - Vector2D
 * Clase para operaciones vectoriales 2D
 */

SANHUEAS.Vector2 = class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Copia este vector
   */
  clone() {
    return new SANHUEAS.Vector2(this.x, this.y);
  }

  /**
   * Copia los valores de otro vector
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * Suma otro vector
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * Resta otro vector
   */
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Multiplica por un escalar
   */
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Divide por un escalar
   */
  divide(scalar) {
    if (scalar === 0) return this;
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /**
   * Magnitud (longitud) del vector
   */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Magnitud al cuadrado (más rápido)
   */
  magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Normaliza el vector
   */
  normalize() {
    const mag = this.magnitude();
    if (mag > 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  /**
   * Producto punto (dot product)
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Distancia a otro vector
   */
  distance(v) {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Distancia cuadrada (más rápido)
   */
  distanceSquared(v) {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return dx * dx + dy * dy;
  }

  /**
   * Rota el vector
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }

  /**
   * Ángulo del vector
   */
  angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * String representation
   */
  toString() {
    return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
};
