"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.sound = ASTEROIDS.sound || {};

ASTEROIDS.sound.Sound = function Sound(options) {
  this.name = null;
  this.url = null;
  this.audio = new Audio();
  this.isPlaying = false;
  this.loop = false;
  this.types = [];
  this.useDefaultTypes = true;
  this.volume = 0.5;

  if (options) {
    this.name = options['name'] || this.name;
    this.url = options['url'] || this.url;
    this.loop = options['loop'] || this.loop;
    this.volume = options['volume'] || this.volume;
    this.types = options['types'] || this.types;
    this.useDefaultTypes = options['useDefaultTypes'] || this.useDefaultTypes;
  }

  if (this.useDefaultTypes) {
    this.types = ASTEROIDS.sound.Sound.MIME_TYPES;
  }

  this.crossBrowserify();

  if (this.url) {
    this.load();
  }
};

ASTEROIDS.sound.Sound.MIME_TYPES = {
  mp3: 'audio/mp3',
  ogg: 'audio/ogg',
  wav: 'audio/wav',
  m4a: 'audio/mp4'
};

ASTEROIDS.sound.Sound.prototype.load = function() {
  this.audio.src = this.url;
  this.audio.load();
};

ASTEROIDS.sound.Sound.prototype.play = function() {
  if (!this.isPlaying && this.audio.readyState) {
    this.audio.onended = $.proxy(this._onEnd, this);
    this.isPlaying = true;
    this.audio.volume = this.volume;
    this.audio.play();
  } else if (!this.audio.readyState) {
    this.audio.addEventListener('loadeddata', function(e) {
      this.play();
    });
    this.load();
  }
};

ASTEROIDS.sound.Sound.prototype.stop = function() {
  this.pause();
  this.position(0);
};

ASTEROIDS.sound.Sound.prototype.pause = function() {
  this.isPlaying = false;
  this.audio.pause();
};

ASTEROIDS.sound.Sound.prototype.position = function(value) {
  if (value >= 0) {
    this.audio.currentTime = value;
  }
  return this.audio.currentTime;
};

ASTEROIDS.sound.Sound.prototype.crossBrowserify = function() {
  var type = this.getMimeType();
  var playableTypeFound = true;
  if (!this.audio.canPlayType(type)) {
    playableTypeFound = false;
    for (var i = 0; i < this.types.length; i++) {
      if (type !== this.types[i]) {
        type = types[i];
        if (this.audio.canPlayType(type)) {
          for (var ext in ASTEROIDS.sound.Sound.MIME_TYPES) {
            if (ASTEROIDS.sound.Sound.MIME_TYPES[ext] === type) {
              var oldExt = this.getExt();
              this.url = this.url.replace('.' + oldExt, '.' + ext);
            }
          }
          playableTypeFound = true;
        }
      }
    }
  }

  if (!playableTypeFound) {
    console.log('Audio error, could not find playable audio type', this.types);
  }
};

ASTEROIDS.sound.Sound.prototype.getExt = function() {
  var split = this.url.split('.');
  return split[split.length - 1];
};

ASTEROIDS.sound.Sound.prototype.getMimeType = function() {
  var ext = this.getExt();
  return ASTEROIDS.sound.Sound.MIME_TYPES[ext];
};

ASTEROIDS.sound.Sound.prototype._onEnd = function(e) {
  this.stop();
  this.isPlaying = false;
  if (this.loop) {
    this.load();
    this.play();
  }
};

