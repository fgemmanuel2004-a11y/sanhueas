/**
 * SANHUEAS - Entity Base Class
 * Clase base para todas las entidades del juego
 */

SANHUEAS.Entity = class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 0.5;
    this.height = 0.5;
    this.angle = 0;
    this.velocity = { x: 0, y: 0 };
    this.isActive = true;
    this.health = 100;
  }

  /**
   * Actualiza la entidad
   */
  update(deltaTime) {
    // Aplicar velocidad
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
  }

  /**
   * Renderiza la entidad
   */
  render(ctx) {
    // Implementar en subclases
  }

  /**
   * Verifica colisión con otra entidad
   */
  collidesWith(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.width + other.width;
  }

  /**
   * Recibe daño
   */
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.isActive = false;
      this.onDeath();
    }
  }

  /**
   * Evento de muerte
   */
  onDeath() {
    // Implementar en subclases
  }

  /**
   * Obtiene la distancia al jugador
   */
  getDistanceToPlayer() {
    const dx = this.x - SANHUEAS.Player.x;
    const dy = this.y - SANHUEAS.Player.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
};
