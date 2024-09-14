/**
 * Represents a status bar that displays the poison level.
 */
class StatusBarPoison extends DrawableObject {
  IMAGES_POISON = [
    'img/4. Marcadores/Purple/0_.png',
    'img/4. Marcadores/Purple/20_.png',
    'img/4. Marcadores/Purple/40_.png',
    'img/4. Marcadores/Purple/60_.png',
    'img/4. Marcadores/Purple/80_.png',
    'img/4. Marcadores/Purple/100_.png',
  ];
  percentage = 0;

  /**
   * Creates an instance of StatusBarPoison.
   */
  constructor(world) {
    super(world);
    this.loadImages(this.IMAGES_POISON);
    this.x = 460;
    this.y = -5;
    this.width = 220;
    this.height = 70;
    this.setPercentage(0);
  }

  /**
   * Updates the percentage of poison displayed on the status bar.
   */
  setPercentage(percentage) {
    this.percentage += percentage;
    let path = this.IMAGES_POISON[this.percentage];
    this.img = this.imageCache[path];
  }
}
