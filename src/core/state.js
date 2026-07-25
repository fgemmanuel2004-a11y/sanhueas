/**
 * SANHUEAS - State Machine
 * Gestiona los diferentes estados del juego
 */

SANHUEAS.State = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAMEOVER: 'gameover',
  TRANSITION: 'transition'
};

SANHUEAS.StateManager = {
  current: SANHUEAS.State.PLAYING,
  previous: null,
  listeners: [],

  setState(newState) {
    if (this.current !== newState) {
      this.previous = this.current;
      this.current = newState;
      this.notifyListeners();
      console.log(`[State] ${this.previous} → ${this.current}`);
    }
  },

  getCurrentState() {
    return this.current;
  },

  getPreviousState() {
    return this.previous;
  },

  isPlaying() {
    return this.current === SANHUEAS.State.PLAYING;
  },

  isPaused() {
    return this.current === SANHUEAS.State.PAUSED;
  },

  isMenu() {
    return this.current === SANHUEAS.State.MENU;
  },

  subscribe(listener) {
    this.listeners.push(listener);
  },

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.current));
  }
};

// Compatibilidad
const State = SANHUEAS.StateManager;
