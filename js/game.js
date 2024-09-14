let canvas;
let world;
let soundOn = true;
let keyboard;
let isFullscreen = false;
let sounds = [];
let soundFiles = [
  'audio/world_music.mp3',
  'audio/swimming.mp3',
  'audio/hurt_simple.mp3',
  'audio/throw_sharkie.mp3',
  'audio/hurt_puff.mp3',
  'audio/fin_attack.mp3',
  'audio/coin_pick_up.mp3',
  'audio/poison_pick_up.mp3',
  'audio/puffer_dead.mp3',
  'audio/snoring.mp3',
  'audio/jelly_dead.mp3',
  'audio/boss_hurt.mp3',
  'audio/boss_bubble_attack.mp3',
  'audio/boss_bite_attack.mp3',
  'audio/boss_dead.mp3',
  'audio/dead_sharkie.mp3',
];

/**
 * Initializes the game by setting up the canvas, keyboard, and starting the game.
 */
function start() {
  if (!canvas) {
    canvas = document.getElementById('canvas');
  }
  if (!keyboard) {
    keyboard = new Keyboard();
  }
  reStart();
  menuScreen();
  document.getElementById('startScreen').classList.add('d_none');
  document.getElementById('ingameScreen').classList.remove('d_none');
}

/**
 * Restarts the game and shows the in-game screen.
 */
function tryAgain() {
  reStart();
  menuScreen();
  document.getElementById('ingameScreen').classList.remove('d_none');
}

/**
 * Restarts the game by stopping the current world, reloading the level, and creating a new world instance.
 */
function reStart() {
  if (world) {
    world.stop();
    reloadScript('levels/level1.js');
  }
  world = new World(canvas, keyboard, soundOn);
}

/**
 * Hides all screens and shows only the menu screen.
 */
function menuScreen() {
  document.getElementById('startScreen').classList.add('d_none');
  document.getElementById('deadScreen').classList.add('d_none');
  document.getElementById('menuDiv').classList.add('d_none');
  document.getElementById('ingameScreen').classList.add('d_none');
}

/**
 * Stops the current game world and returns to the main menu screen.
 */
function backToMenu() {
  if (world && world.running) {
    world.stop();
  }
  document.getElementById('startScreen').classList.remove('d_none');
  document.getElementById('deadScreen').classList.add('d_none');
  document.getElementById('menuDiv').classList.add('d_none');
  document.getElementById('ingameScreen').classList.add('d_none');
  document.getElementById('instructionScreen').classList.add('d_none');
  document.getElementById('impressum').classList.add('d_none');
  document.getElementById('story').classList.add('d_none');
  document.getElementById('winningScreen').classList.add('d_none');
}

/**
 * Shows the instructions screen and hides all other screens.
 */
function showInstructions() {
  document.getElementById('menuDiv').classList.remove('d_none');
  document.getElementById('instructionScreen').classList.remove('d_none');
  document.getElementById('startScreen').classList.add('d_none');
  document.getElementById('deadScreen').classList.add('d_none');
  document.getElementById('winningScreen').classList.add('d_none');
  document.getElementById('ingameScreen').classList.add('d_none');
}

/**
 * Displays the winning game screen and hides all other screens.
 */
function winningGameScreen() {
  document.getElementById('winningScreen').classList.remove('d_none');
  document.getElementById('startScreen').classList.add('d_none');
  document.getElementById('deadScreen').classList.add('d_none');
  document.getElementById('menuDiv').classList.add('d_none');
  document.getElementById('ingameScreen').classList.add('d_none');
}

/**
 * Displays the end game screen and hides all other screens.
 */
function endGameScreen() {
  document.getElementById('deadScreen').classList.remove('d_none');
  document.getElementById('winningScreen').classList.add('d_none');
  document.getElementById('startScreen').classList.add('d_none');
  document.getElementById('menuDiv').classList.add('d_none');
  document.getElementById('ingameScreen').classList.add('d_none');
}

/**
 * Displays the impressum screen and hides all other screens.
 */
function showImpressum() {
  document.getElementById('menuDiv').classList.remove('d_none');
  document.getElementById('impressum').classList.remove('d_none');
  document.getElementById('deadScreen').classList.add('d_none');
  document.getElementById('winningScreen').classList.add('d_none');
  document.getElementById('startScreen').classList.add('d_none');
  document.getElementById('ingameScreen').classList.add('d_none');
}

/**
 * Displays the story screen and hides all other screens.
 */
function showStory() {
  document.getElementById('menuDiv').classList.remove('d_none');
  document.getElementById('story').classList.remove('d_none');
  document.getElementById('deadScreen').classList.add('d_none');
  document.getElementById('winningScreen').classList.add('d_none');
  document.getElementById('startScreen').classList.add('d_none');
  document.getElementById('ingameScreen').classList.add('d_none');
}

/**
 * Reloads a script with the given source URL by removing the old script element and adding a new one.
 */
function reloadScript(src) {
  let oldScript = document.querySelector(`script[src="${src}"]`);
  if (oldScript) {
    oldScript.remove();
  }
  let newScript = document.createElement('script');
  newScript.src = src;
  document.body.appendChild(newScript);
}

/**
 * Toggles the sound on or off. Updates the sound button image and plays or pauses the game world sound accordingly.
 */
function toggleSoundOnOff() {
  if (soundOn) {
    document.getElementById('soundButton').src = 'img/icons/sound_off.png';
    soundOn = false;
    if (world) {
      world.worldSound.pause();
      world.soundOn = false;
    }
  } else {
    document.getElementById('soundButton').src = 'img/icons/sound_on.png';
    soundOn = true;
    if (world) {
      world.worldSound.play();
      world.soundOn = true;
    }
  }
}

/**
 * Preloads audio files and stores them in the global `sounds` array.
 */
async function preloadSounds() {
  soundFiles.forEach((file, index) => {
    let audio = new Audio();
    audio.src = file;
    audio.preload = 'auto';
    sounds[index] = audio;
  });
}
