/**
 * SANHUEAS - Block Registry
 * Catálogo de tipos de bloque para niveles
 */

SANHUEAS.BlockRegistry = (() => {
  'use strict';

  let blocks = {};

  function getDefaultBlocks() {
    return {
      0: {
        id: 0,
        name: 'empty',
        category: 'space',
        solid: false,
        wallMaterial: null,
        interactive: false
      },
      1: {
        id: 1,
        name: 'wall_red',
        category: 'wall',
        solid: true,
        wallMaterial: 'wallRed',
        interactive: false
      },
      2: {
        id: 2,
        name: 'wall_blue',
        category: 'wall',
        solid: true,
        wallMaterial: 'wallBlue',
        interactive: false
      },
      3: {
        id: 3,
        name: 'wall_green',
        category: 'wall',
        solid: true,
        wallMaterial: 'wallGreen',
        interactive: false
      },
      4: {
        id: 4,
        name: 'wall_yellow',
        category: 'wall',
        solid: true,
        wallMaterial: 'wallYellow',
        interactive: false
      },
      10: {
        id: 10,
        name: 'door_placeholder',
        category: 'door',
        solid: true,
        wallMaterial: 'wallDoor',
        interactive: true
      },
      20: {
        id: 20,
        name: 'switch_placeholder',
        category: 'switch',
        solid: false,
        wallMaterial: null,
        interactive: true
      }
    };
  }

  function reset() {
    blocks = getDefaultBlocks();
  }

  function mergeFromLevel(levelBlocks = {}) {
    Object.keys(levelBlocks).forEach((key) => {
      const id = Number(key);
      const incoming = levelBlocks[key] || {};
      const base = blocks[id] || {
        id,
        name: `block_${id}`,
        category: 'custom',
        solid: true,
        wallMaterial: 'wallRed',
        interactive: false
      };

      blocks[id] = {
        ...base,
        ...incoming,
        id
      };
    });
  }

  function getBlock(id) {
    return blocks[id] || blocks[1];
  }

  function isSolid(id) {
    const block = getBlock(id);
    return !!block.solid;
  }

  function getWallMaterialKey(id) {
    const block = getBlock(id);
    return block.wallMaterial || 'wallRed';
  }

  function isInteractive(id) {
    const block = getBlock(id);
    return !!block.interactive;
  }

  function getAll() {
    return { ...blocks };
  }

  reset();

  return {
    reset,
    mergeFromLevel,
    getBlock,
    isSolid,
    isInteractive,
    getWallMaterialKey,
    getAll
  };
})();
