/**
 * SANHUEAS - Enemy
 * Clase para enemigos del juego
 */

SANHUEAS.Enemy = class Enemy extends SANHUEAS.Entity {
  constructor(x, y, type = 'imp') {
    super(x, y);
    this.type = type;
    this.width = 0.3;
    this.height = 0.8;
    this.speed = 1.5;
    this.health = 30;
    this.maxHealth = 30;
    this.attackRange = 2;
    this.attackDamage = 10;
    this.attackCooldown = 1;
    this.lastAttackTime = 0;
    this.state = 'idle'; // idle, patrol, chase, attack
  }

  /**
   * Actualiza el enemigo
   */
  update(deltaTime) {
    if (!this.isActive) return;

    const distToPlayer = this.getDistanceToPlayer();

    // Cambiar estado según distancia
    if (distToPlayer < this.attackRange) {
      this.state = 'attack';
      this.attackPlayer(deltaTime);
    } else if (distToPlayer < 8) {
      this.state = 'chase';
      this.chasePlayer();
    } else {
      this.state = 'patrol';
    }

    super.update(deltaTime);
  }

  /**
   * Persigue al jugador
   */
  chasePlayer() {
    const dx = SANHUEAS.Player.x - this.x;
    const dy = SANHUEAS.Player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      this.velocity.x = (dx / distance) * this.speed;
      this.velocity.y = (dy / distance) * this.speed;
    }
  }

  /**
   * Ataca al jugador
   */
  attackPlayer(deltaTime) {
    const now = performance.now() / 1000;

    if (now - this.lastAttackTime >= this.attackCooldown) {
      // SANHUEAS.Player.takeDamage(this.attackDamage); // Implementar cuando exista health del jugador
      this.lastAttackTime = now;
    }

    this.velocity = { x: 0, y: 0 };
  }

  /**
   * Renderiza el enemigo como billboard
   */
  render(ctx) {
    const screenX = (this.x - SANHUEAS.Player.x) * 50 + SANHUEAS.Config.HALF_WIDTH;
    const screenY = (this.y - SANHUEAS.Player.y) * 50 + SANHUEAS.Config.HALF_HEIGHT;

    // Billboard simple (cuadrado)
    ctx.fillStyle = this.state === 'attack' ? '#FF0000' : '#FF6600';
    ctx.fillRect(screenX - 20, screenY - 30, 40, 60);

    // Health bar
    ctx.fillStyle = '#00FF00';
    const healthWidth = (this.health / this.maxHealth) * 40;
    ctx.fillRect(screenX - 20, screenY - 40, healthWidth, 5);
  }
};
