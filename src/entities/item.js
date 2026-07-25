/**
 * SANHUEAS - Item
 * Clase para items del juego
 */

SANHUEAS.Item = class Item extends SANHUEAS.Entity {
  constructor(x, y, type = 'health') {
    super(x, y);
    this.type = type;
    this.width = 0.2;
    this.height = 0.2;
    this.pickedUp = false;
    this.bobOffset = 0;
    this.bobSpeed = 2;

    // Configurar según tipo
    this.setupByType();
  }

  setupByType() {
    const config = {
      health: { color: '#00FF00', value: 25 },
      ammo: { color: '#FFFF00', value: 30 },
      armor: { color: '#0088FF', value: 50 }
    };

    this.config = config[this.type] || config.health;
  }

  /**
   * Actualiza el item
   */
  update(deltaTime) {
    // Efecto de bobbing
    this.bobOffset += this.bobSpeed * deltaTime;

    // Verificar si el jugador lo ha recogido
    if (this.collidesWith(SANHUEAS.Player)) {
      this.onPickUp();
      this.isActive = false;
    }
  }

  /**
   * Evento de recogida
   */
  onPickUp() {
    console.log(`[Item] Se recogió ${this.type}`);
  }

  /**
   * Renderiza el item
   */
  render(ctx) {
    const screenX = (this.x - SANHUEAS.Player.x) * 50 + SANHUEAS.Config.HALF_WIDTH;
    const screenY = (this.y - SANHUEAS.Player.y) * 50 + SANHUEAS.Config.HALF_HEIGHT + Math.sin(this.bobOffset) * 5;

    ctx.fillStyle = this.config.color;
    ctx.fillRect(screenX - 5, screenY - 5, 10, 10);
  }
};
