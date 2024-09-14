/**
 * Class representing a dangerous jellyfish enemy.
 * Extends the JellyFish class.
 */
class JellyFishDanger extends JellyFish {
  IMAGES_SWIMMING = [
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
  ];
  IMAGES_DEAD = [
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png',
  ];
  danger = true;

  /**
   * Creates a new JellyFishDanger instance.
   */
  constructor(x, y, world) {
    super(x, y, world);
    this.loadImage('img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png');
    this.loadAllImages();
    this.danger = true;
  }
}
