/**
 * SANHUEAS - Menu System
 * Menú principal y sistema de navegación
 */

SANHUEAS.Menu = {
  options: ['Jugar', 'Opciones', 'Salir'],
  selectedIndex: 0,

  /**
   * Renderiza el menú
   */
  render(ctx) {
    // Fondo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, SANHUEAS.Config.SCREEN_WIDTH, SANHUEAS.Config.SCREEN_HEIGHT);

    // Título
    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SANHUEAS', SANHUEAS.Config.HALF_WIDTH, 100);

    // Opciones
    ctx.font = '24px Arial';
    ctx.fillStyle = '#FFFFFF';

    this.options.forEach((option, index) => {
      const y = 200 + index * 60;
      const color = index === this.selectedIndex ? '#FF0000' : '#FFFFFF';

      ctx.fillStyle = color;
      ctx.fillText(option, SANHUEAS.Config.HALF_WIDTH, y);
    });

    // Instrucciones
    ctx.fillStyle = '#00FF00';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Usa flechas para navegar, ENTER para seleccionar', SANHUEAS.Config.HALF_WIDTH, SANHUEAS.Config.SCREEN_HEIGHT - 30);
  },

  /**
   * Maneja entrada en el menú
   */
  handleInput(actions) {
    // Esto se implementará cuando sea necesario
  }
};
