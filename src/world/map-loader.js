/**
 * SANHUEAS - Map Loader
 * Carga niveles JSON sin modificar código fuente
 */

SANHUEAS.MapLoader = (() => {
  'use strict';

  async function loadFromFile(path) {
    if (!path) {
      throw new Error('Ruta de mapa no definida');
    }

    let json;
    let lastError = null;

    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      json = await response.json();
    } catch (error) {
      lastError = error;
    }

    // Fallback para entornos locales con file://
    if (!json) {
      try {
        json = await loadWithXHR(path);
      } catch (error) {
        lastError = error;
      }
    }

    if (!json) {
      throw new Error(`No se pudo cargar ${path}: ${lastError?.message || 'error desconocido'}`);
    }

    validateLevelData(json);

    SANHUEAS.BlockRegistry.reset();
    SANHUEAS.BlockRegistry.mergeFromLevel(json.blocks || {});
    SANHUEAS.World.loadLevelData(json);

    console.log(`[MapLoader] ✓ Nivel cargado: ${json.name || 'sin nombre'}`);
    return json;
  }

  function loadWithXHR(path) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);
      xhr.responseType = 'text';

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`XHR ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Error de red XHR'));
      xhr.send();
    });
  }

  function validateLevelData(data) {
    if (!data || !Array.isArray(data.tiles) || data.tiles.length === 0) {
      throw new Error('Formato de nivel inválido: tiles faltante');
    }

    const width = data.tiles[0].length;
    if (width === 0) {
      throw new Error('Formato de nivel inválido: ancho 0');
    }

    data.tiles.forEach((row, index) => {
      if (!Array.isArray(row) || row.length !== width) {
        throw new Error(`Fila inválida en tiles[${index}]`);
      }

      row.forEach((value) => {
        if (!Number.isInteger(value)) {
          throw new Error('Los tiles deben ser enteros');
        }
      });
    });
  }

  return {
    loadFromFile,
    validateLevelData
  };
})();
