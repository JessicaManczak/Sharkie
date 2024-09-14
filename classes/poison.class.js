/**
 * Class representing a poison object in the game.
 * Inherits from `CollactableObject` and handles the animation of poison images.
 */
class Poison extends CollactableObject {
  IMAGES_POISON = [
    'img/4. Marcadores/Posión/Animada/1.png',
    'img/4. Marcadores/Posión/Animada/2.png',
    'img/4. Marcadores/Posión/Animada/3.png',
    'img/4. Marcadores/Posión/Animada/4.png',
    'img/4. Marcadores/Posión/Animada/5.png',
    'img/4. Marcadores/Posión/Animada/6.png',
    'img/4. Marcadores/Posión/Animada/7.png',
    'img/4. Marcadores/Posión/Animada/8.png',
  ];

  /**
   * Creates an instance of the Poison class.
   */
  constructor(x, y, world) {
    super(world);
    this.loadImages(this.IMAGES_POISON);
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 80;
    this.img = this.imageCache[this.IMAGES_POISON[0]];
    this.animate();
  }

  /**
   * Starts the animation loop for the poison object.
   * Changes the image at regular intervals to create an animation effect.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_POISON);
    }, 190);
  }
}
