"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.sound = ASTEROIDS.sound || {};

ASTEROIDS.sound.SFX = function (options) {
  this.sounds = {};

  if (options) {
    this.sounds = options['sounds'] || this.sounds;
  }
};

ASTEROIDS.sound.SFX.instance = null;

ASTEROIDS.sound.SFX.play = function(sound) {
  var sounds = ASTEROIDS.sound.SFX.instance.sounds[sound];
  var didPlay = false;
  for (var i = 0; i < sounds.length; i++) {
    sound = sounds[i];
    if (!sound.isPlaying) {
      sound.play();
      didPlay = true;
      break;
    }
  }
  if (sound.isPlaying && !didPlay) {
    sound.stop();
    sound.play();
  }
};

