/**
 * Represents a throwable object in the game.
 * Can be either a regular bubble or a poisoned bubble, depending on the `isPoison` flag.
 * The object will move in a sine wave pattern horizontally, while gravity may be applied vertically.
 */
class ThrowableObject extends MovableObject {
  startY;
  isPoison;
  origin;
  energy = 1;
  offSetLeftUpX = 0;
  offSetLeftUpY = 0;
  offSetRightLowX = 0;
  offSetRightLowY = 0;
  scaleX = 1;
  scaleY = 1;

  /**
   * Constructs a throwable object.
   * Loads the correct image (poisonous or regular bubble) based on the `isPoison` flag.
   * Schedules the object to be removed from the world after 1300 milliseconds.
   * Initializes the object's properties and starts the throwing motion.
   */
  constructor(x, y, isPoison, origin, world) {
    super(world);
    this.loadCorrectImage(isPoison);
    this.scheduleRemoval(world);
    this.initializeProperties(x, y, isPoison, origin);
    this.throw();
  }

  /**
   * Loads the correct image for the object based on whether it is poisonous.
   */
  loadCorrectImage(isPoison) {
    let image = isPoison
      ? 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned_Bubble_for_whale.png'
      : 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    this.loadImage(image);
  }

  /**
   * Schedules the removal of the object from the world after a specified delay.
   */
  scheduleRemoval(world) {
    setTimeout(() => {
      let index = world.throwableObjects.indexOf(this);
      if (index > -1) {
        world.throwableObjects.splice(index, 1);
      }
    }, 1300);
  }

  /**
   * Initializes the properties of the object, such as position, size, and direction.
   */
  initializeProperties(x, y, isPoison, origin) {
    this.x = x;
    this.y = y;
    this.startY = y;
    this.height = 50;
    this.width = 50;
    this.isPoison = isPoison;
    this.otherDirection =
      origin instanceof Character
        ? origin.otherDirection
        : !origin.otherDirection;
    this.origin = origin;
  }

  /**
   * Starts the throwing motion of the object.
   * Moves the object horizontally and applies a sine wave pattern to the Y position.
   */
  throw() {
    setInterval(() => {
      this.x += this.otherDirection ? -10 : 10;
      this.y =
        this.startY + 30 * Math.sin(((2 * Math.PI) / 500) * (Date.now() % 500));
    }, 45);
  }
}
