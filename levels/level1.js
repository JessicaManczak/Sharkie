var level1 = {
  /**
   * Background layers for the level. Each element is an array containing:
   * - A path to the image file
   * - The X-axis position where the image starts
   */
  background: [
    ['img/3. Background/Layers/5. Water/L1.png', 0],
    ['img/3. Background/Layers/4.Fondo 2/L1.png', 0],
    ['img/3. Background/Layers/3.Fondo 1/L1.png', 0],
    ['img/3. Background/Layers/2. Floor/D1.png', 0],

    ['img/3. Background/Layers/5. Water/L2.png', 719],
    ['img/3. Background/Layers/4.Fondo 2/L2.png', 719],
    ['img/3. Background/Layers/3.Fondo 1/L2.png', 719],
    ['img/3. Background/Layers/2. Floor/D2.png', 719],

    ['img/3. Background/Layers/5. Water/L1.png', 719 * 2],
    ['img/3. Background/Layers/4.Fondo 2/L1.png', 719 * 2],
    ['img/3. Background/Layers/3.Fondo 1/L1.png', 719 * 2],
    ['img/3. Background/Layers/2. Floor/D1.png', 719 * 2],

    ['img/3. Background/Layers/5. Water/L2.png', 719 * 3],
    ['img/3. Background/Layers/4.Fondo 2/L2.png', 719 * 3],
    ['img/3. Background/Layers/3.Fondo 1/L2.png', 719 * 3],
    ['img/3. Background/Layers/2. Floor/D2.png', 719 * 3],

    ['img/3. Background/Layers/5. Water/L1.png', 719 * 4],
    ['img/3. Background/Layers/4.Fondo 2/L1.png', 719 * 4],
    ['img/3. Background/Layers/3.Fondo 1/L1.png', 719 * 4],
    ['img/3. Background/Layers/2. Floor/D1.png', 719 * 4],

    ['img/3. Background/Layers/5. Water/L2.png', 719 * 5],
    ['img/3. Background/Layers/4.Fondo 2/L2.png', 719 * 5],
    ['img/3. Background/Layers/3.Fondo 1/L2.png', 719 * 5],
    ['img/3. Background/Layers/2. Floor/D2.png', 719 * 5],
  ],

  /**
   * Lighting zones for the level. Each element is an array containing:
   * - The starting X-axis position of the light
   * - The ending X-axis position of the light
   */
  light: [
    [0, 500],
    [1000, 1500],
    [1900, 2500],
    [2800, 3500],
  ],

  /**
   * Positions of coins in the level. Each element is an array containing:
   * - The X-axis position of the coin
   * - The Y-axis position of the coin
   */
  coins: [
    [800, 200],
    [1200, 150],
    [2000, 250],
    [2600, 150],
    [3500, 230],
  ],

  /**
   * Positions of poisons in the level. Each element is an array containing:
   * - The X-axis position of the poison
   * - The Y-axis position of the poison
   */
  poisons: [
    [630, 295],
    [1400, 330],
    [2370, 270],
    [2830, 325],
    [3700, 300],
  ],

  /**
   * Enemies in the level. Each element is an array containing:
   * - The type of enemy (0 = Fish, 1 = Boss, 2 = Jelly, 3 = DangerJelly, 4 = DangerFish)
   * - The X-axis position of the enemy
   * - The Y-axis position of the enemy
   */
  enemies: [
    [0, 600, 200],
    [0, 900, 100],
    [0, 1000, 300],

    [4, 1500, 100],
    [4, 1600, 200],
    [4, 1900, 100],

    [2, 2250, 250],
    [2, 2350, 100],
    [2, 2450, 250],

    [3, 3100, 100],
    [3, 3100, 250],

    [1, 3780, -40],
  ],
};
