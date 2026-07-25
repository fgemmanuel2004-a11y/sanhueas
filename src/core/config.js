/**
 * SANHUEAS - Configuración Global
 * Centro de control para todos los parámetros del juego
 */

window.SANHUEAS = window.SANHUEAS || {};

SANHUEAS.Config = {
  // Pantalla
  SCREEN_WIDTH: 640,
  SCREEN_HEIGHT: 480,
  HALF_WIDTH: 320,
  HALF_HEIGHT: 240,

  // Raycasting
  NUM_RAYS: 640,
  MAX_DEPTH: 20,
  TILE_SIZE: 1,
  RAY_STEP: 0.01,

  // Jugador
  PLAYER_SPEED: 3.5,
  PLAYER_ROT_SPEED: Math.PI,
  PLAYER_RADIUS: 0.2,
  PLAYER_FOV: Math.PI / 3,

  // Colisiones
  WALL_BUFFER: 0.15,

  // Rendering
  AMBIENT_LIGHT: 50,
  MAX_LIGHT_DISTANCE: 20,

  // FPS
  TARGET_FPS: 60,
  DELTA_TIME_MAX: 0.033,

  // Debug
  DEBUG_MODE: false,
  SHOW_FPS: true,
  SHOW_MAP: false,

  // Niveles
  START_LEVEL_FILE: 'assets/maps/level-01.json'
};

// Para compatibilidad con código antiguo
const SCREEN_WIDTH = SANHUEAS.Config.SCREEN_WIDTH;
const SCREEN_HEIGHT = SANHUEAS.Config.SCREEN_HEIGHT;
const HALF_WIDTH = SANHUEAS.Config.HALF_WIDTH;
const HALF_HEIGHT = SANHUEAS.Config.HALF_HEIGHT;
const NUM_RAYS = SANHUEAS.Config.NUM_RAYS;
const MAX_DEPTH = SANHUEAS.Config.MAX_DEPTH;
const TILE_SIZE = SANHUEAS.Config.TILE_SIZE;
