/**
 * Class representing the keyboard input handling for a game.
 * Handles both keyboard and touch events for movement and actions.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  F = false;

  /**
   * Initializes the Keyboard class by binding key and button press events.
   */
  constructor() {
    this.bindKeyPressEvents();
    this.bindBtsPressEvents();
  }

  /**
   * Binds keydown and keyup events for keyboard input handling.
   * Updates the keyboard state based on the key pressed or released.
   */
  bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 32) {
        keyboard.SPACE = true;
      }

      if (e.keyCode == 65) {
        keyboard.A = true;
      }

      if (e.keyCode == 87) {
        keyboard.W = true;
      }

      if (e.keyCode == 68) {
        keyboard.D = true;
      }

      if (e.keyCode == 83) {
        keyboard.S = true;
      }

      if (e.keyCode == 70) {
        keyboard.F = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.keyCode == 32) {
        keyboard.SPACE = false;
      }

      if (e.keyCode == 65) {
        keyboard.A = false;
      }

      if (e.keyCode == 87) {
        keyboard.W = false;
      }

      if (e.keyCode == 68) {
        keyboard.D = false;
      }

      if (e.keyCode == 83) {
        keyboard.S = false;
      }

      if (e.keyCode == 70) {
        keyboard.F = false;
      }
    });
  }

  /**
   * Binds touch events to on-screen buttons for touch input handling.
   * Updates the keyboard state based on the button pressed or released.
   */
  bindBtsPressEvents() {
    document.getElementById('upButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.W = true;
    });

    document.getElementById('upButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.W = false;
    });

    document
      .getElementById('downButton')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.S = true;
      });

    document.getElementById('downButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.S = false;
    });

    document
      .getElementById('leftButton')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.A = true;
      });

    document.getElementById('leftButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.A = false;
    });

    document
      .getElementById('rightButton')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.D = true;
      });

    document.getElementById('rightButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.D = false;
    });

    document.getElementById('finButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.F = true;
    });

    document.getElementById('finButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.F = false;
    });

    document
      .getElementById('bubbleButton')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.SPACE = true;
      });

    document
      .getElementById('bubbleButton')
      .addEventListener('touchend', (e) => {
        e.preventDefault();
        this.SPACE = false;
      });
  }
}
