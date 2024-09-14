/**
 * Represents a status bar that displays the coin count.
 */
class StatusBarCoin extends DrawableObject {
  IMAGES_COIN = [
    'img/4. Marcadores/Purple/0_ _1.png',
    'img/4. Marcadores/Purple/20_ .png',
    'img/4. Marcadores/Purple/40_ _1.png',
    'img/4. Marcadores/Purple/60_ _1.png',
    'img/4. Marcadores/Purple/80_ _1.png',
    'img/4. Marcadores/Purple/100__1.png',
  ];
  percentage = 0;

  /**
   * Creates an instance of StatusBarCoin.
   */
  constructor(world) {
    super(world);
    this.loadImages(this.IMAGES_COIN);
    this.x = 240;
    this.y = -5;
    this.width = 220;
    this.height = 70;
    this.setPercentage(0);
  }

  /**
   * Updates the percentage of coins displayed on the status bar.
   */
  setPercentage(percentage) {
    this.percentage += percentage;
    let path = this.IMAGES_COIN[this.percentage];
    this.img = this.imageCache[path];
  }
}
