/**
 * Class representing a moving light object in the game.
 * Inherits from the `MovableObject` class and handles the movement and animation of light elements.
 */
class Light extends MovableObject {
  y = 0;
  width = 700;
  height = 250;
  speed = 0.05;

  /**
   * Creates an instance of the Light class.
   */
  constructor(minX, maxX, world) {
    super(world);
    this.loadImage('img/3. Background/Layers/1. Light/1.png');
    this.x = minX + Math.random() * (maxX - minX);
  }

  /**
   * Starts the animation for the light object.
   * Moves the light object continuously to the left by calling the `moveLeft` method.
   * The movement is updated 60 times per second.
   */
  animate() {
    this.moveLeft();
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
