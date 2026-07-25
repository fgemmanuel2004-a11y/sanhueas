/**
 * SANHUEAS - Texture Manager
 * Gestiona texturas y paletas de colores
 */

SANHUEAS.Texture = {
  textures: {},
  walls: {
    0: {
      color: '#888888',      // Espacio vacío (gris)
      lightColor: '#CCCCCC',
      darkColor: '#444444'
    },
    1: {
      color: '#884444',      // Pared roja oscura
      lightColor: '#FF6666',
      darkColor: '#440000'
    },
    2: {
      color: '#448844',      // Pared verde oscura
      lightColor: '#66FF66',
      darkColor: '#004400'
    },
    3: {
      color: '#444488',      // Pared azul oscura
      lightColor: '#6666FF',
      darkColor: '#000044'
    }
  },

  /**
   * Carga una textura
   */
  loadTexture(id, imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    this.textures[id] = img;
  },

  /**
   * Obtiene el color de una pared
   */
  getWallColor(tileId, distance) {
    const wall = this.walls[tileId];
    
    // Si tileId es inválido, usar pared por defecto
    if (!wall) {
      return '#FF00FF'; // Magenta = error
    }

    // Aplicar lighting basado en distancia (fog effect)
    let lightFactor = 1 - (distance / SANHUEAS.Config.MAX_DEPTH);
    lightFactor = Math.max(0.2, Math.min(1, lightFactor)); // Clamp [0.2, 1]

    // Interpolar entre color oscuro y claro según distancia
    return this.interpolateColor(
      wall.darkColor,
      wall.lightColor,
      lightFactor
    );
  },

  /**
   * Interpola entre dos colores hex
   */
  interpolateColor(color1, color2, factor) {
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);

    return this.rgbToHex(r, g, b);
  },

  /**
   * Convierte hex a RGB
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 128, g: 128, b: 128 };
  },

  /**
   * Convierte RGB a hex
   */
  rgbToHex(r, g, b) {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }
};
