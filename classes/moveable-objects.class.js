/**
 * Represents a movable object in the game world.
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.5;
  energy = 5;
  hasWon = false;
  hasDied = false;
  hurtSoundPlayed = false;
  coinP;
  inventory;
  bubbleOffSetR = 0;
  bubbleOffSetL = 0;
  bubbleHeight = 0;
  lastHit = 0;
  lastBubble = 0;
  hurtDuration = 1;
  path = '';
  dead = false;
  isAttackA = false;
  isAttackB = false;
  IMAGES_SWIMMING = [];
  IMAGES_DEAD = [];
  IMAGES_HURT = [];
  IMAGES_DEAD_ELECTRIC = [];
  IMAGES_HURT_ELECTRIC = [];
  IMAGES_IDLE = [];
  IMAGES_LONG_IDLE = [];
  IMAGES_FIN_ATTACK = [];
  IMAGES_BUBBLE_ATTACK = [];
  IMAGES_POISON_BUBBLE = [];

  /**
   * Creates an instance of MovableObject.
   */
  constructor(world) {
    super(world);
    this.inventory = { poison: 0, coins: 0 };
  }

  /**
   * Loads all images required for animations.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD_ELECTRIC);
    this.loadImages(this.IMAGES_HURT_ELECTRIC);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_FIN_ATTACK);
    this.loadImages(this.IMAGES_BUBBLE_ATTACK);
    this.loadImages(this.IMAGES_POISON_BUBBLE);
  }

  /**
   * Checks if this object is colliding with another object.
   */
  isColliding(obj) {
    const collisionRight =
      this.x + this.width - this.offSetRightLowX * this.scaleX >
      obj.x + obj.offSetLeftUpX * obj.scaleX;
    const collisionBeneath =
      this.y + this.height - this.offSetRightLowY * this.scaleY >
      obj.y + obj.offSetLeftUpY * obj.scaleY;
    const collisionLeft =
      this.x + this.offSetLeftUpX * this.scaleX <
      obj.x + obj.width - obj.offSetRightLowX * obj.scaleX;
    const collisionAbove =
      this.y + this.offSetLeftUpY * this.scaleY <
      obj.y + obj.height - obj.offSetRightLowY * obj.scaleY;
    return (
      collisionRight && collisionLeft && collisionBeneath && collisionAbove
    );
  }

  /**
   * Checks if any of the movement keys (W, A, S, D) are currently pressed.
   */
  isKeyPressed(key) {
    switch (key) {
      case 'D':
        return this.world.keyboard.D;
      case 'A':
        return this.world.keyboard.A;
      case 'W':
        return this.world.keyboard.W;
      case 'S':
        return this.world.keyboard.S;
      case 'WASD':
        return (
          this.world.keyboard.D ||
          this.world.keyboard.A ||
          this.world.keyboard.W ||
          this.world.keyboard.S
        );
    }
  }

  /**
   * Shoots a bubble or poison based on the inventory.
   */
  shoot() {
    this.lastBubble = Date.now();
    let bubble =
      this.inventory.poison > 0 ? this.createPoison() : this.createBubble();
    world.throwableObjects.push(bubble);
  }

  /**
   * Creates a poison throwable object.
   */
  createPoison() {
    this.inventory.poison--;
    world.statusBarPoison.setPercentage(-1);

    let direction =
      this instanceof Character ? this.otherDirection : !this.otherDirection;
    return new ThrowableObject(
      this.x +
        (direction ? this.bubbleOffSetL : this.bubbleOffSetR) * this.scaleX,
      this.y + this.bubbleHeight * this.scaleY,
      true,
      this,
      this.world
    );
  }

  /**
   * Creates a bubble throwable object.
   */
  createBubble() {
    let direction =
      this instanceof Character ? this.otherDirection : !this.otherDirection;
    return new ThrowableObject(
      this.x +
        (direction ? this.bubbleOffSetL : this.bubbleOffSetR) * this.scaleX,
      this.y + this.bubbleHeight * this.scaleY,
      false,
      this,
      this.world
    );
  }

  /**
   * Applies damage to this object and handles death if energy reaches zero.
   */
  hit(damage) {
    if (this.isHurt()) return;
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.dead = true;
      this.handleDeath();
    } else {
      this.lastHit = Date.now();
    }
  }

  /**
   * Handles the death of the object based on its type.
   */
  handleDeath() {
    if (this instanceof ThrowableObject) this.handleThrowableObject();
    else if (this instanceof Character) this.handleCharacter();
    else this.handleEnemy();
  }

  /**
   * Handles the death of a throwable object.
   */
  handleThrowableObject() {
    let index = world.throwableObjects.indexOf(this);
    if (index > -1) world.throwableObjects.splice(index, 1);
  }

  /**
   * Handles the death of a character.
   */
  handleCharacter() {
    if (!this.hasDied) {
      this.hasDied = true;
      setTimeout(() => endGameScreen(), 3000);
    }
  }

  /**
   * Handles the death of an enemy.
   */
  handleEnemy() {
    setTimeout(() => {
      let index = world.level.enemies.indexOf(this);
      if (index > -1) world.level.enemies.splice(index, 1);
      if (this instanceof Endboss && !this.hasWon) {
        this.hasWon = true;
        winningGameScreen();
        setTimeout(() => backToMenu(), 4000);
      }
    }, 3000);
  }

  /**
   * Checks if the object is dead.
   */
  isDead() {
    return this.dead;
  }

  /**
   * Checks if the object's path matches the given path.
   */
  checkLastDeadPath(path) {
    return this.path === path;
  }

  /**
   * Checks if the object is currently hurt.
   */
  isHurt() {
    const timepassed = (Date.now() - this.lastHit) / 1000;
    if (timepassed > this.hurtDuration) {
      this.hurtSoundPlayed = false;
    }
    return timepassed < this.hurtDuration;
  }

  /**
   * Plays hurt sound for each object.
   */
  playHurtSound() {
    if (this.world.soundOn && !this.hurtSoundPlayed) {
      this.hurtSoundPlayed = true;
      this.hurtSound.play();
      this.pauseSnoringSound();
    }
  }

  /**
   * Plays dead sound for each object.
   */
  playDeadSound() {
    if (this.world.soundOn && !this.deadSound.ended) this.deadSound.play();
    this.pauseSnoringSound();
    this.deadSound.end;
  }

  /**
   * Plays snoring sound for each object.
   */
  playSnoringSound() {
    if (this.world.soundOn) this.snoringSound.play();
  }

  /**
   * Pauses snoring sound for each object.
   */
  pauseSnoringSound() {
    if (this.world.soundOn && this.snoringSound) this.snoringSound.pause();
  }

  /**
   * Plays swimming sound for each object.
   */
  playSwimmingSound() {
    if (this.world.soundOn) this.swimmingSound.play();
    this.pauseSnoringSound();
  }

  /**
   * Plays fin Attack sound for each object.
   */
  playFinAttackSound() {
    if (this.world.soundOn) this.finSound.play();
    this.pauseSnoringSound();
  }

  /**
   * Plays an animation by updating the current image.
   */
  playAnimation(images, frame = 0) {
    if (this.currentImage >= images.length) {
      this.currentImage = frame;
      this.isAttackA = false;
      this.isAttackB = false;
    }
    this.path = images[this.currentImage];
    this.img = this.imageCache[this.path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right if not dead.
   */
  moveRight() {
    if (!this.dead) this.x += this.speed;
  }

  /**
   * Moves the object to the left if not dead.
   */
  moveLeft() {
    if (!this.dead) this.x -= this.speed;
  }

  /**
   * Moves the object up if not dead.
   */
  moveUp() {
    if (!this.dead) this.y -= this.speed;
  }

  /**
   * Moves the object down if not dead.
   */
  moveDown() {
    if (!this.dead) this.y += this.speed;
  }
}
