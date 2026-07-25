/**
 * SANHUEAS - Entity Manager
 * Gestiona todas las entidades activas del juego
 */

SANHUEAS.EntityManager = {
  entities: [],

  /**
   * Añade una entidad
   */
  add(entity) {
    this.entities.push(entity);
  },

  /**
   * Elimina una entidad
   */
  remove(entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  },

  /**
   * Obtiene todas las entidades activas
   */
  getActive() {
    return this.entities.filter(e => e.isActive);
  },

  /**
   * Actualiza todas las entidades
   */
  update(deltaTime) {
    for (let i = this.entities.length - 1; i >= 0; i--) {
      const entity = this.entities[i];
      if (entity.isActive) {
        entity.update(deltaTime);
      } else {
        this.entities.splice(i, 1);
      }
    }
  },

  /**
   * Renderiza todas las entidades
   */
  render(ctx) {
    // Ordenar por distancia al jugador (painter's algorithm)
    const active = this.getActive();
    active.sort(
      (a, b) => b.getDistanceToPlayer() - a.getDistanceToPlayer()
    );

    // Renderizar de atrás hacia adelante
    active.forEach(entity => entity.render(ctx));
  },

  /**
   * Limpia todas las entidades
   */
  clear() {
    this.entities = [];
  }
};
