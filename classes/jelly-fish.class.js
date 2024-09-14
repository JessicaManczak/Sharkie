/**
 * Class representing a jellyfish enemy.
 * Extends the Enemy class.
 */
class JellyFish extends Enemy {
  width = 100;
  height = 150;
  energy = 1;
  danger = false;
  animationCounter = 0;
  deadSound = new Audio(sounds[10].src);
  hurtDuration = 0;
  scaleX = this.width / 211;
  scaleY = this.height / 300;
  IMAGES_SWIMMING_COLLISION = [10, 55, 10, 45];
  IMAGES_DEAD_COLLISION = [0, 0, 0, 0];
  IMAGES_SWIMMING = [
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
  ];
  IMAGES_DEAD = [
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
  ];

  /**
   * Creates a new JellyFish instance.
   */
  constructor(x, y, world) {
    super(world);
    this.loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
    this.loadAllImages();
    this.x = x;
    this.y = y;
    this.startY = y;
    this.speed = 0.15 + Math.random() * 0.25;
    this.deadSound.volume = 0.3;
    this.animate();
    this.action();
  }

  /**
   * Moves the jellyfish up and down while it's alive, and lets it fall when dead.
   */
  action() {
    setInterval(() => {
      if (!this.dead) {
        this.y =
          this.startY +
          30 * Math.sin(((2 * Math.PI) / 1280) * (Date.now() % 1280));
      } else if (this.y < 340) {
        this.y += 3;
      }
    }, 1000 / 60);
  }

  /**
   * Animates the jellyfish depending on its state (alive, hurt, or dead).
   */
  animate() {
    setInterval(() => {
      if (this.isDead()) this.animateDead();
      else if (this.animationCounter > 3) {
        this.animateSwim();
      }
      this.animationCounter++;
      if (this.animationCounter >= 8) this.animationCounter = 0;
    }, 160);
  }

  /**
   * Animates the dead state of the jellyfish.
   */
  animateDead() {
    this.playDeadSound();
    this.playAnimation(this.IMAGES_DEAD);
    this.setHitBox(this.IMAGES_DEAD_COLLISION);
  }

  /**
   * Animates the swimming state of the jellyfish.
   */
  animateSwim() {
    this.playAnimation(this.IMAGES_SWIMMING);
    this.setHitBox(this.IMAGES_SWIMMING_COLLISION);
  }

  /**
   * Sets the hitbox of the jellyfish based on its state.
   */
  setHitBox(box) {
    this.offSetLeftUpX = box[0];
    this.offSetLeftUpY = box[1];
    this.offSetRightLowX = box[2];
    this.offSetRightLowY = box[3];
  }
}
