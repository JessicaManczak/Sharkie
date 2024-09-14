/**
 * Class representing a character in the game, extending from MovableObject.
 */
class Character extends MovableObject {
  x = 0;
  y = 60;
  width = 280;
  height = 300;
  speed = 5;
  idleTime = 0;
  bubbleOffSetR = 610;
  bubbleOffSetL = 0;
  bubbleHeight = 600;
  lastHitCause;
  swimmingSound = sounds[1];
  deadSound = sounds[15];
  finSound = sounds[5];
  bubbleSound = sounds[3];
  hurtSound = sounds[2];
  snoringSound = sounds[9];
  scaleX = this.width / 815;
  scaleY = this.height / 1000;
  IMAGES_SWIMMING_COLLISION = [175, 494, 167, 260];
  IMAGES_DEAD_COLLISION = [0, 0, 0, 0];
  IMAGES_HURT_COLLISION = [225, 518, 237, 245];
  IMAGES_HURT_ELECTRIC_COLLISION = [268, 442, 225, 190];
  IMAGES_IDLE_COLLISION = [175, 494, 167, 260];
  IMAGES_LONG_IDLE_COLLISION = [175, 494, 167, 260];
  IMAGES_FIN_ATTACK_COLLISION = [170, 406, 131, 254];
  IMAGES_BUBBLE_COLLISION = [175, 494, 167, 260];
  IMAGES_POISON_BUBBLE_COLLISION = [175, 494, 185, 260];
  IMAGES_SWIMMING = [
    'img/1.Sharkie/3.Swim/1.png',
    'img/1.Sharkie/3.Swim/2.png',
    'img/1.Sharkie/3.Swim/3.png',
    'img/1.Sharkie/3.Swim/4.png',
    'img/1.Sharkie/3.Swim/5.png',
    'img/1.Sharkie/3.Swim/6.png',
  ];
  IMAGES_DEAD = [
    'img/1.Sharkie/6.dead/1.Poisoned/1.png',
    'img/1.Sharkie/6.dead/1.Poisoned/2.png',
    'img/1.Sharkie/6.dead/1.Poisoned/3.png',
    'img/1.Sharkie/6.dead/1.Poisoned/4.png',
    'img/1.Sharkie/6.dead/1.Poisoned/5.png',
    'img/1.Sharkie/6.dead/1.Poisoned/6.png',
    'img/1.Sharkie/6.dead/1.Poisoned/7.png',
    'img/1.Sharkie/6.dead/1.Poisoned/8.png',
    'img/1.Sharkie/6.dead/1.Poisoned/9.png',
    'img/1.Sharkie/6.dead/1.Poisoned/10.png',
    'img/1.Sharkie/6.dead/1.Poisoned/11.png',
    'img/1.Sharkie/6.dead/1.Poisoned/12.png',
  ];
  IMAGES_DEAD_ELECTRIC = [
    'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/10.png',
  ];
  IMAGES_HURT = [
    'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
  ];
  IMAGES_HURT_ELECTRIC = [
    'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
    'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
    'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
  ];
  IMAGES_IDLE = [
    'img/1.Sharkie/1.IDLE/1.png',
    'img/1.Sharkie/1.IDLE/2.png',
    'img/1.Sharkie/1.IDLE/3.png',
    'img/1.Sharkie/1.IDLE/4.png',
    'img/1.Sharkie/1.IDLE/5.png',
    'img/1.Sharkie/1.IDLE/6.png',
    'img/1.Sharkie/1.IDLE/7.png',
    'img/1.Sharkie/1.IDLE/8.png',
    'img/1.Sharkie/1.IDLE/9.png',
    'img/1.Sharkie/1.IDLE/10.png',
    'img/1.Sharkie/1.IDLE/11.png',
    'img/1.Sharkie/1.IDLE/12.png',
    'img/1.Sharkie/1.IDLE/13.png',
    'img/1.Sharkie/1.IDLE/14.png',
    'img/1.Sharkie/1.IDLE/15.png',
    'img/1.Sharkie/1.IDLE/16.png',
    'img/1.Sharkie/1.IDLE/17.png',
    'img/1.Sharkie/1.IDLE/18.png',
  ];
  IMAGES_LONG_IDLE = [
    'img/1.Sharkie/2.Long_IDLE/i1.png',
    'img/1.Sharkie/2.Long_IDLE/I2.png',
    'img/1.Sharkie/2.Long_IDLE/I3.png',
    'img/1.Sharkie/2.Long_IDLE/I4.png',
    'img/1.Sharkie/2.Long_IDLE/I5.png',
    'img/1.Sharkie/2.Long_IDLE/I6.png',
    'img/1.Sharkie/2.Long_IDLE/I7.png',
    'img/1.Sharkie/2.Long_IDLE/I8.png',
    'img/1.Sharkie/2.Long_IDLE/I9.png',
    'img/1.Sharkie/2.Long_IDLE/I10.png',
    'img/1.Sharkie/2.Long_IDLE/I11.png',
    'img/1.Sharkie/2.Long_IDLE/I12.png',
    'img/1.Sharkie/2.Long_IDLE/I13.png',
    'img/1.Sharkie/2.Long_IDLE/I14.png',
  ];
  IMAGES_FIN_ATTACK = [
    'img/1.Sharkie/4.Attack/Fin slap/1.png',
    'img/1.Sharkie/4.Attack/Fin slap/4.png',
    'img/1.Sharkie/4.Attack/Fin slap/5.png',
    'img/1.Sharkie/4.Attack/Fin slap/6.png',
    'img/1.Sharkie/4.Attack/Fin slap/7.png',
    'img/1.Sharkie/4.Attack/Fin slap/8.png',
  ];
  IMAGES_BUBBLE_ATTACK = [
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
  ];
  IMAGES_POISON_BUBBLE = [
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
  ];

  /**
   * Initializes the Character instance.
   */
  constructor(world) {
    //super(world).loadImage('img/1.Sharkie/3.Swim/1.png');
    super(world).loadImage('img/1.Sharkie/3.Swim/1.png');
    this.loadAllImages();
    this.swimmingSound.volume = 0.3;
    this.deadSound.volume = 0.3;
    this.finSound.volume = 0.3;
    this.bubbleSound.volume = 0.3;
    this.hurtSound.volume = 0.3;
    this.snoringSound.volume = 0.7;
    this.animate();
  }

  /**
   * Starts the movement and animation loops.
   */
  animate() {
    this.startMovementLoop();
    this.startAnimationLoop();
    this.checkIdle();
  }

  /**
   * Checks the character's idle with a setInterval loop.
   */
  checkIdle() {
    setInterval(() => {
      if (this.isKeyPressed('WASD')) {
        if (!this.world.soundOn) this.snoringSound.pause();
        this.idleTime = 0;
      }
    }, 10);
  }

  /**
   * Handles the character's movement with a setInterval loop.
   */
  startMovementLoop() {
    setInterval(() => {
      if (!this.world.running) return;
      this.handleMovement();
      this.world.cameraX = -this.x;
    }, 1000 / 60);
  }

  /**
   * Processes movement, attack, and keyboard input actions.
   */
  handleMovement() {
    this.swimmingSound.pause();
    if (!this.world.soundOn) this.snoringSound.pause();
    if (!this.isDead() && !this.world.level.endboss.dead) {
      if (!this.isAttackA && !this.isAttackB) this.handleKeyboardInput();
      this.handleAttacks();
    }
  }

  /**
   * Handles character movement based on keyboard input.
   */
  handleKeyboardInput() {
    if (this.isKeyPressed('D') && this.x < this.world.level.levelEndX)
      this.moveWithSound('right');
    if (this.isKeyPressed('A') && this.x > 0) this.moveWithSound('left');
    if (this.isKeyPressed('W') && this.y > this.world.level.levelEndYUp)
      this.moveWithSound('up');
    if (this.isKeyPressed('S') && this.y < this.world.level.levelEndYDown)
      this.moveWithSound('down');
  }

  /**
   * Handles character movement based on keyboard input.
   */
  moveWithSound(direction) {
    if (direction === 'right') {
      this.moveRight();
      this.otherDirection = false;
    } else if (direction === 'left') {
      this.moveLeft();
      this.otherDirection = true;
    } else if (direction === 'up') {
      this.y -= this.speed;
    } else if (direction === 'down') {
      this.y += this.speed;
    }
    this.playSwimmingSound();
  }

  /**
   * Handles the character's attack actions.
   */
  handleAttacks() {
    if (
      this.world.keyboard.SPACE &&
      !this.isAttackA &&
      !this.isAttackB &&
      Date.now() > this.lastBubble + 1000
    )
      this.shootBubble();
    if (this.world.keyboard.F && !this.isAttackB && !this.isAttackA)
      this.performFinAttack();
  }

  /**
   * Handles the character's bubble attack action.
   */
  shootBubble() {
    if (this.world.soundOn) {
      setTimeout(() => {
        this.bubbleSound.play();
      }, 1100);
    }
    this.pauseSnoringSound();
    this.isAttackA = true;
    this.currentImage = 0;
    setTimeout(() => {
      this.shoot();
    }, 1100);
  }

  /**
   * Handles the character's fin attack action.
   */
  performFinAttack() {
    this.playFinAttackSound();
    this.isAttackB = true;
    this.currentImage = 0;
  }

  /**
   * Starts the main animation loop, which runs every 150 milliseconds.
   */
  startAnimationLoop() {
    setInterval(() => {
      if (!this.world.running) return;
      this.handleAnimation();
    }, 140);
  }

  /**
   * Handles the current animation state based on the character's condition.
   */
  handleAnimation() {
    if (this.isDead()) this.handleDeath();
    else if (this.isAttackB) this.playFinAttack();
    else if (this.isAttackA) this.playBubbleAttack();
    else if (this.isHurt()) this.handleHurt();
    else if (this.isKeyPressed('WASD')) this.handleSwimming();
    else this.handleIdle();
  }

  /**
   * Depending on the last hit cause, it uses either an electric death animation
   * or a regular death animation.
   */
  handleDeath() {
    const images =
      this.lastHitCause instanceof JellyFishDanger
        ? this.IMAGES_DEAD_ELECTRIC
        : this.IMAGES_DEAD;
    if (!this.checkLastDeadPath(images[images.length - 1])) {
      this.playDeadSound();
      this.playAnimation(images);
      this.setHitBox(this.IMAGES_DEAD_COLLISION);
    }
    this.idleTime = 0;
    super.handleDeath();
  }

  /**
   * Plays the fin attack animation and updates the hitbox for the attack.
   */
  playFinAttack() {
    this.playAnimation(this.IMAGES_FIN_ATTACK);
    this.setHitBox(this.IMAGES_FIN_ATTACK_COLLISION);
    this.idleTime = 0;
  }

  /**
   * Plays the bubble attack animation and updates the hitbox for the attack.
   */
  playBubbleAttack() {
    this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
    this.setHitBox(this.IMAGES_BUBBLE_COLLISION);
    this.idleTime = 0;
  }

  /**
   * It plays a hurt animation based on whether the damage was caused by an electric attack or a regular one.
   */
  handleHurt() {
    const images =
      this.lastHitCause instanceof JellyFishDanger
        ? this.IMAGES_HURT_ELECTRIC
        : this.IMAGES_HURT;
    this.playHurtSound();
    this.playAnimation(images);
    this.setHitBox(this.IMAGES_HURT_COLLISION);
    this.idleTime = 0;
  }

  /**
   * Handles the swimming animation when the character is moving.
   */
  handleSwimming() {
    this.playAnimation(this.IMAGES_SWIMMING);
    this.setHitBox(this.IMAGES_SWIMMING_COLLISION);
    this.idleTime = 0;
  }

  /**
   * Handles the idle animation when the character is not moving.
   */
  handleIdle() {
    if (this.idleTime >= 5000) {
      this.playLongIdleAnimation();
    } else {
      this.playAnimation(this.IMAGES_IDLE);
      this.setHitBox(this.IMAGES_IDLE_COLLISION);
    }
    this.idleTime += 140;
  }

  /**
   * Plays the long idle animation if the character has been idle for more than 5 seconds and 10 animation frames.
   */
  playLongIdleAnimation() {
    if (this.idleTime >= 5000 + 10 * 140) {
      this.playSnoringSound();
      this.playAnimation(this.IMAGES_LONG_IDLE, 11);
    } else {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    }
    this.setHitBox(this.IMAGES_LONG_IDLE_COLLISION);
  }

  /**
   * Updates the hitbox for the character based on the collision box data.
   */
  setHitBox(box) {
    this.offSetLeftUpX = box[0];
    this.offSetLeftUpY = box[1];
    this.offSetRightLowX = box[2];
    this.offSetRightLowY = box[3];
  }
}
