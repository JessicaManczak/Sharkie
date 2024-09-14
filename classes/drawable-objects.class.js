/**
 * Class representing a drawable object in a game world.
 * Provides methods to load images, draw the object, and visualize its hitbox and frame.
 */
class DrawableObject {
  x;
  y;
  height;
  width;
  world;
  img;
  imageCache = {};
  currentImage = 0;
  showHitbox = false;
  showImgFrame = false;
  offSetLeftUpX = 0;
  offSetLeftUpY = 0;
  offSetRightLowX = 0;
  offSetRightLowY = 0;
  scaleX = 1;
  scaleY = 1;

  /**
   * Creates a new DrawableObject.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Loads an image from the specified path.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the given canvas rendering context.
   * Optionally draws the image frame and hitbox if enabled.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.showImgFrame) {
      if (this instanceof Character || this instanceof Enemy) {
        this.drawFrame(ctx);
      }
    }
    if (this.showHitbox) {
      if (this instanceof Character || this instanceof Enemy) {
        this.drawHitBox(ctx);
      }
    }
  }

  /**
   * Draws a frame around the object's image.
   */
  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '3';
    ctx.strokeStyle = 'yellow';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  /**
   * Draws the hitbox of the object.
   */
  drawHitBox(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '3';
    ctx.strokeStyle = 'red';
    ctx.rect(
      this.x + this.offSetLeftUpX * this.scaleX,
      this.y + this.offSetLeftUpY * this.scaleY,
      this.width - (this.offSetRightLowX + this.offSetLeftUpX) * this.scaleX,
      this.height - (this.offSetRightLowY + this.offSetLeftUpY) * this.scaleY
    );
    ctx.stroke();
  }

  /**
   * Loads multiple images and caches them.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
