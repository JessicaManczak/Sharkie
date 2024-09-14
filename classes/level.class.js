/**
 * Class representing a level in the game.
 * Manages and initializes background objects, lights, enemies, coins, and poison for the level.
 */
class Level {
  backgroundObjects;
  lights;
  enemies;
  coins;
  poison;
  levelEndX = 3595;
  levelEndYUp = -80;
  levelEndYDown = 230;
  endboss;

  /**
   * Creates an instance of Level.
   * Initializes background objects, lights, enemies, coins, and poison based on the provided data.
   */
  constructor(backgroundObjects, lights, enemies, coins, poison, world) {
    this.backgroundObjects = [];
    this.lights = [];
    this.enemies = [];
    this.coins = [];
    this.poison = [];
    this.createBaseEntities(backgroundObjects, lights, coins, poison, world);
    this.createEnemies(enemies, world);
  }

  /**
   * Creates and initializes base entities for the level, including background objects, lights, coins, and poison.
   */
  createBaseEntities(backgroundObjects, lights, coins, poison, world) {
    for (let obj of backgroundObjects) {
      this.backgroundObjects.push(new BackgroundObject(obj[0], obj[1], world));
    }
    for (let obj of lights) {
      this.lights.push(new Light(obj[0], obj[1], world));
    }
    for (let obj of coins) {
      this.coins.push(new Coin(obj[0], obj[1], world));
    }
    for (let obj of poison) {
      this.poison.push(new Poison(obj[0], obj[1], world));
    }
  }

  /**
   * Creates and initializes enemies for the level based on the provided definitions.
   */
  createEnemies(enemies, world) {
    for (let obj of enemies) {
      if (obj[0] == 0) this.enemies.push(new Fish(obj[1], obj[2], world));
      else if (obj[0] == 4)
        this.enemies.push(new FishDanger(obj[1], obj[2], world));
      else if (obj[0] == 2)
        this.enemies.push(new JellyFish(obj[1], obj[2], world));
      else if (obj[0] == 3)
        this.enemies.push(new JellyFishDanger(obj[1], obj[2], world));
      else {
        this.endboss = new Endboss(obj[1], obj[2], world);
        this.enemies.push(this.endboss);
      }
    }
  }
}
