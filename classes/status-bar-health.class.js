/**
 * Represents a status bar that displays the player's health.
 */
class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    'img/4. Marcadores/Purple/0_ .png',
    'img/4. Marcadores/Purple/20__1.png',
    'img/4. Marcadores/Purple/40_ .png',
    'img/4. Marcadores/Purple/60_ .png',
    'img/4. Marcadores/Purple/80_ .png',
    'img/4. Marcadores/Purple/100_ .png',
  ];
  percentage = 5;

  /**
   * Creates an instance of StatusBar.
   */
  constructor(world) {
    super(world);
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 5;
    this.y = -5;
    this.width = 225;
    this.height = 70;
    this.setPercentage(5);
  }

  /**
   * Updates the percentage of health displayed on the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.percentage];
    this.img = this.imageCache[path];
  }
}
