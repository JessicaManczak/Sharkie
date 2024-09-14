/**
 * Class representing a coin object in the game, which extends a collectible object.
 */
class Coin extends CollactableObject {
  IMAGES_COIN = [
    'img/4. Marcadores/1. Coins/1.png',
    'img/4. Marcadores/1. Coins/1.png',
    'img/4. Marcadores/1. Coins/2.png',
    'img/4. Marcadores/1. Coins/3.png',
    'img/4. Marcadores/1. Coins/4.png',
    'img/4. Marcadores/1. Coins/4.png',
  ];

  /**
   * Creates a new Coin instance.
   */
  constructor(x, y, world) {
    super(world);
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.img = this.imageCache[this.IMAGES_COIN[0]];
    this.animate();
  }

  /**
   * Animates the coin by cycling through the provided images at a set interval.
   * Plays the coin animation every 140ms.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 140);
  }
}
