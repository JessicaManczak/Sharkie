/**
 * Class representing a dangerous fish enemy with swimming, hurt, and dead animations.
 * Extends the Enemy class.
 */
class Fish extends Enemy {
  width = 130;
  height = 100;
  energy = 2;
  hurtDuration = 2;
  scaleX = this.width / 241;
  scaleY = this.height / 198;
  hurtSound = sounds[4];
  deadSound = new Audio(sounds[8].src);
  IMAGES_SWIMMING_COLLISION = [9, 18, 41, 60];
  IMAGES_DEAD_COLLISION = [9, 10, 34, 12];
  IMAGES_HURT_COLLISION = [9, 18, 41, 60];
  IMAGES_SWIMMING = [
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
  ];
  IMAGES_DEAD = [
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
  ];
  IMAGES_HURT = [
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
  ];

  /**
   * Creates a new Fish instance.
   */
  constructor(x, y, world) {
    super(world);
    this.loadImage(
      'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png'
    );
    this.loadAllImages();
    this.x = x;
    this.y = y;
    this.speed = 0.15 + Math.random() * 0.25;
    this.deadSound.volume = 0.3;
    this.hurtSound.volume = 0.5;
    this.action();
    this.animate();
  }

  /**
   * Handles the movement and actions of the fish.
   * Moves left and adjusts the position when the fish is dead.
   */
  action() {
    setInterval(() => {
      this.moveLeft();
      if (this.dead && this.y < 390) {
        this.y += 3;
      }
    }, 1000 / 60);
  }

  /**
   * Animates the fish's current state: swimming, hurt, or dead.
   */
  animate() {
    setInterval(() => {
      if (this.isDead()) this.animateDead();
      else if (this.isHurt()) this.animateHurt();
      else this.animateSwim();
    }, 160);
  }

  /**
   * Animates the fish in its dead state.
   * Plays the dead animation and sets the collision box.
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
   * Animates the fish in its hurt state.
   * Plays the hurt sound and animation, and sets the collision box.
   */
  animateHurt() {
    this.playHurtSound();
    this.playAnimation(this.IMAGES_HURT);
    this.setHitBox(this.IMAGES_HURT_COLLISION);
  }

  /**
   * Animates the fish in its swimming state.
   * Plays the swimming animation and sets the collision box.
   */
  animateSwim() {
    this.playAnimation(this.IMAGES_SWIMMING);
    this.setHitBox(this.IMAGES_SWIMMING_COLLISION);
  }

  /**
   * Sets the hitbox for the fish based on the current collision box array.
   */
  setHitBox(box) {
    this.offSetLeftUpX = box[0];
    this.offSetLeftUpY = box[1];
    this.offSetRightLowX = box[2];
    this.offSetRightLowY = box[3];
  }
}
