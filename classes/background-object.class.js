/**
 * Class representing a background object in the game.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 580;
  /**
   * Creates an instance of BackgroundObject.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
