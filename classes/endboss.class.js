/**
 * The Endboss has several states and animations (spawning, swimming, attacking, hurt, and dead),
 * and interacts with the player character through attacks and collisions.
 */
class Endboss extends Enemy {
  width = 450;
  height = 400;
  hadFirstContact = false;
  spawnStart = false;
  lastAttack = 0;
  bubbleOffSetR = 610;
  bubbleOffSetL = 0;
  bubbleHeight = 700;
  scaleX = this.width / 1041;
  scaleY = this.height / 1216;
  biteSound = sounds[13];
  bubbleSound = sounds[12];
  deadSound = sounds[14];
  hurtSound = sounds[11];
  IMAGES_SWIMMING_COLLISION = [87, 629, 92, 246];
  IMAGES_SPAWN_COLLISION = [0, 0, 1041, 1216];
  IMAGES_DEAD_COLLISION = [174, 493, 111, 92];
  IMAGES_HURT_COLLISION = [174, 493, 111, 92];
  IMAGES_ATTACK_COLLISION = [0, 629, 92, 246];
  IMAGES_BUBBLE_COLLISION = [87, 629, 92, 246];
  IMAGES_SPAWNING = [
    'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
  ];
  IMAGES_SWIMMING = [
    'img/2.Enemy/3 Final Enemy/2.floating/1.png',
    'img/2.Enemy/3 Final Enemy/2.floating/2.png',
    'img/2.Enemy/3 Final Enemy/2.floating/3.png',
    'img/2.Enemy/3 Final Enemy/2.floating/4.png',
    'img/2.Enemy/3 Final Enemy/2.floating/5.png',
    'img/2.Enemy/3 Final Enemy/2.floating/6.png',
    'img/2.Enemy/3 Final Enemy/2.floating/7.png',
    'img/2.Enemy/3 Final Enemy/2.floating/8.png',
    'img/2.Enemy/3 Final Enemy/2.floating/9.png',
    'img/2.Enemy/3 Final Enemy/2.floating/10.png',
    'img/2.Enemy/3 Final Enemy/2.floating/11.png',
    'img/2.Enemy/3 Final Enemy/2.floating/12.png',
    'img/2.Enemy/3 Final Enemy/2.floating/13.png',
  ];
  IMAGES_DEAD = [
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
  ];
  IMAGES_HURT = [
    'img/2.Enemy/3 Final Enemy/Hurt/1.png',
    'img/2.Enemy/3 Final Enemy/Hurt/2.png',
    'img/2.Enemy/3 Final Enemy/Hurt/3.png',
    'img/2.Enemy/3 Final Enemy/Hurt/4.png',
  ];
  IMAGES_ATTACK = [
    'img/2.Enemy/3 Final Enemy/Attack/1.png',
    'img/2.Enemy/3 Final Enemy/Attack/2.png',
    'img/2.Enemy/3 Final Enemy/Attack/3.png',
    'img/2.Enemy/3 Final Enemy/Attack/4.png',
    'img/2.Enemy/3 Final Enemy/Attack/5.png',
    'img/2.Enemy/3 Final Enemy/Attack/6.png',
  ];
  IMAGES_ATTACK_BUBBLE = [
    'img/2.Enemy/3 Final Enemy/Attack/1.png',
    'img/2.Enemy/3 Final Enemy/Attack/2.png',
    'img/2.Enemy/3 Final Enemy/Attack/3.png',
    'img/2.Enemy/3 Final Enemy/Attack/3.png',
    'img/2.Enemy/3 Final Enemy/Attack/2.png',
    'img/2.Enemy/3 Final Enemy/Attack/1.png',
  ];

  /**
   * Creates an instance of the Endboss.
   */
  constructor(x, y, world) {
    super(world);
    this.loadAllImages();
    this.setSoundVolumes(0.3);
    this.loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    this.x = x;
    this.y = y;
    this.action();
    this.animate();
  }

  /**
   * Sets the volume for all the boss's sound effects.
   */
  setSoundVolumes(volume) {
    this.biteSound.volume = volume;
    this.bubbleSound.volume = volume;
    this.deadSound.volume = volume;
    this.hurtSound.volume = volume;
  }

  /**
   * Starts the boss's main action loop, handling movement and attack logic.
   * Executes 60 times per second.
   */
  action() {
    setInterval(() => {
      if (this.hadFirstContact && !this.dead && !this.world.character.dead) {
        this.adjustYPosition();
        if (!this.isHurt() && Date.now() > this.lastAttack + 3000) {
          this.handleAttack();
        }
      }
    }, 1000 / 60);
  }

  /**
   * Adjusts the boss's y-position to align with the player character.
   */
  adjustYPosition() {
    let char = this.world.character;
    let charY = char.y + char.height - char.offSetRightLowY * char.scaleY;
    let bossY = this.y + this.offSetLeftUpY * this.scaleY;
    let bossHeight =
      this.height - (this.offSetLeftUpY + this.offSetRightLowY) * this.scaleY;

    if (charY < bossY + bossHeight * 0.25) {
      this.y -= 1;
    } else if (
      char.y + char.offSetLeftUpY * char.scaleY >
      bossY + bossHeight * 0.75
    ) {
      this.y += 1;
    }
  }

  /**
   * Handles attack logic for the boss. Decides between melee or bubble attack.
   */
  handleAttack() {
    this.lastAttack = Date.now();
    let bossPos = this.x + this.offSetLeftUpX * this.scaleX;
    let charPos =
      this.world.character.x +
      this.world.character.width -
      this.world.character.offSetRightLowX * this.world.character.scaleX;

    if (bossPos - charPos < this.offSetLeftUpX * this.scaleX) {
      this.isAttackB = true;
    } else {
      this.isAttackA = true;
      this.shoot();
    }
    this.currentImage = 0;
  }

  /**
   * Starts the animation loop, running every 160 milliseconds.
   * Changes animation based on boss's state.
   */
  animate() {
    setInterval(() => {
      if (!this.hadFirstContact) {
        this.animateSpawn();
      } else {
        this.animateState();
      }
    }, 160);
  }

  /**
   * Handles the spawning animation, plays until first contact with the player.
   */
  animateSpawn() {
    this.setHitBox(this.IMAGES_SPAWN_COLLISION);
    if (this.world.character.x > 3100 || this.spawnStart) {
      this.spawnStart = true;
      this.playAnimation(this.IMAGES_SPAWNING);
      if (this.path == this.IMAGES_SPAWNING[this.IMAGES_SPAWNING.length - 1])
        this.hadFirstContact = true;
    }
  }

  /**
   * Determines the current state of the boss and plays the appropriate animation.
   */
  animateState() {
    if (this.isDead()) {
      this.animateDead();
    } else if (this.isHurt()) {
      this.animateHurt();
    } else if (this.isAttackA) {
      this.animateAttackA();
    } else if (this.isAttackB) {
      this.animateAttackB();
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
      this.setHitBox(this.IMAGES_SWIMMING_COLLISION);
    }
  }

  /**
   * Plays the death animation and sound for the boss.
   */
  animateDead() {
    if (
      !this.checkLastDeadPath(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1])
    ) {
      this.playDeadSound();
      this.playAnimation(this.IMAGES_DEAD);
      this.setHitBox(this.IMAGES_DEAD_COLLISION);
    }
  }

  /**
   * Plays the hurt animation and sound for the boss.
   */
  animateHurt() {
    this.playHurtSound();
    this.playAnimation(this.IMAGES_HURT);
    this.setHitBox(this.IMAGES_HURT_COLLISION);
  }

  /**
   * Plays the bubble attack animation and sound.
   */
  animateAttackA() {
    if (this.world.soundOn) this.bubbleSound.play();
    this.playAnimation(this.IMAGES_ATTACK_BUBBLE);
    this.setHitBox(this.IMAGES_BUBBLE_COLLISION);
  }

  /**
   * Plays the melee attack animation and sound.
   */
  animateAttackB() {
    if (this.world.soundOn) this.biteSound.play();
    this.playAnimation(this.IMAGES_ATTACK);
    this.setHitBox(this.IMAGES_ATTACK_COLLISION);
  }

  /**
   * Sets the hitbox for the boss based on the current collision state.
   */
  setHitBox(box) {
    this.offSetLeftUpX = box[0];
    this.offSetLeftUpY = box[1];
    this.offSetRightLowX = box[2];
    this.offSetRightLowY = box[3];
  }
}
