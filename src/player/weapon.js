/**
 * SANHUEAS - Weapon System
 * Sistema de armas del jugador
 */

SANHUEAS.Weapon = {
  weapons: {
    pistol: {
      id: 0,
      name: 'Pistol',
      damage: 20,
      fireRate: 0.1,
      ammo: 999,
      maxAmmo: 999
    },
    shotgun: {
      id: 1,
      name: 'Shotgun',
      damage: 80,
      fireRate: 0.5,
      ammo: 24,
      maxAmmo: 32
    },
    rifle: {
      id: 2,
      name: 'Rifle',
      damage: 50,
      fireRate: 0.07,
      ammo: 120,
      maxAmmo: 300
    }
  },

  currentWeapon: 'pistol',
  lastFireTime: 0,

  /**
   * Dispara el arma actual
   */
  fire() {
    const now = performance.now() / 1000;
    const weapon = this.weapons[this.currentWeapon];

    if (now - this.lastFireTime >= weapon.fireRate && weapon.ammo > 0) {
      weapon.ammo--;
      this.lastFireTime = now;
      this.playFireSound();
      return true;
    }
    return false;
  },

  /**
   * Cambia de arma
   */
  selectWeapon(weaponId) {
    const weaponName = Object.keys(this.weapons)[weaponId];
    if (weaponName) {
      this.currentWeapon = weaponName;
      console.log(`[Weapon] Arma seleccionada: ${this.weapons[weaponName].name}`);
    }
  },

  /**
   * Obtiene el arma actual
   */
  getCurrentWeapon() {
    return this.weapons[this.currentWeapon];
  },

  /**
   * Recarga el arma
   */
  reload() {
    const weapon = this.weapons[this.currentWeapon];
    weapon.ammo = weapon.maxAmmo;
    console.log(`[Weapon] ${weapon.name} recargada`);
  },

  /**
   * Reproduce sonido de disparo
   */
  playFireSound() {
    // Se implementará con sistema de audio
  }
};
