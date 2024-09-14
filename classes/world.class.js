/**
 * Represents the game world, including the character, level, and various game elements.
 */
class World {
  character = new Character(this);
  level = new Level(
    level1.background,
    level1.light,
    level1.enemies,
    level1.coins,
    level1.poisons,
    this
  );
  soundOn;
  worldSound = sounds[0];
  coinPickUpSound = sounds[6];
  poisonPickUpSound = sounds[7];
  running = true;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusBar = new StatusBar();
  statusBarPoison = new StatusBarPoison();
  statusCoin = new StatusBarCoin();
  throwableObjects = [];

  /**
   * Initializes a new instance of the World class.
   */
  constructor(canvas, keyboard, soundOn) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundOn = soundOn;
    this.worldSound.volume = 0.4;
    this.coinPickUpSound.volume = 0.3;
    this.poisonPickUpSound.volume = 0.3;
    this.worldSound.loop = true;
    this.worldSound[soundOn ? 'play' : 'pause']();
    this.draw();
    this.run();
  }

  /**
   * Starts the game loop, checking for collisions at regular intervals.
   */
  run() {
    setInterval(() => {
      if (this.running) this.checkCollisions();
    }, 200);
  }

  /**
   * Stops the game, pausing the background music and setting the running flag to false.
   */
  stop() {
    this.worldSound.pause();
    this.worldSound.currentTime = 0;
    this.running = false;
  }

  /**
   * Checks for collisions between various game objects.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => this.checkEnemyCollisions(enemy));
    this.throwableObjects.forEach((bubble) =>
      this.checkBubbleCollisions(bubble)
    );
    this.checkItemCollisions(
      this.level.coins,
      'coins',
      this.coinPickUpSound,
      this.statusCoin
    );
    this.checkItemCollisions(
      this.level.poison,
      'poison',
      this.poisonPickUpSound,
      this.statusBarPoison
    );
  }

  /**
   * Checks for collisions between the character and an enemy.
   */
  checkEnemyCollisions(enemy) {
    if (this.character.isColliding(enemy) && !enemy.isDead()) {
      if (this.character.isAttackB && !(enemy instanceof JellyFish)) {
        enemy.hit(1);
      } else {
        this.character.lastHitCause = enemy;
        this.character.hit(1);
        this.statusBar.setPercentage(this.character.energy);
      }
    }
  }

  /**
   * Checks for collisions between a bubble and enemies or the character.
   */
  checkBubbleCollisions(bubble) {
    this.level.enemies.forEach((enemy) => {
      if (
        bubble.origin != enemy &&
        enemy.isColliding(bubble) &&
        !enemy.isDead()
      ) {
        bubble.hit(1);
        enemy.hit(bubble.isPoison ? 2 : 1);
      }
    });

    if (
      bubble.origin != this.character &&
      this.character.isColliding(bubble) &&
      !this.character.isDead()
    ) {
      bubble.hit(1);
      this.character.hit(1);
      this.character.lastHitCause = bubble.origin;
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks for collisions between the character and items (coins or poison).
   */
  checkItemCollisions(items, itemType, sound, status) {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (
        this.character.isColliding(item) &&
        this.character.inventory[itemType] < 5
      ) {
        if (this.soundOn) sound.play();
        this.character.inventory[itemType]++;
        items.splice(i, 1);
        status.setPercentage(1);
        i--;
      }
    }
  }

  /**
   * Draws the game world, including background, fixed, and dynamic objects.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackgroundObjects();
    this.drawFixedObjects();
    this.drawDynamicObjects();
    if (this.running) requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws background objects, such as background layers and coins.
   */
  drawBackgroundObjects() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poison);
    this.addObjectsToMap(this.level.lights);
    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Draws fixed objects, such as status bars.
   */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarPoison);
    this.addToMap(this.statusCoin);
  }

  /**
   * Draws dynamic objects, including the character and enemies.
   */
  drawDynamicObjects() {
    this.ctx.translate(this.cameraX, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Adds a list of objects to the map, drawing each one.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Draws a single object on the canvas, handling flipping for objects facing the other direction.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an object horizontally for drawing.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas context to its original state after flipping.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
