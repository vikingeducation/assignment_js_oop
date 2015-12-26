"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.core = ASTEROIDS.core || {};

ASTEROIDS.core.Game = function Game(options) {
  this.element = '#game';

  this._ai;
  this._collision;
  this._container;
  this._ship;
  this._tick;
  this._trash;
  this._key;
  this._sfx;

  if (options) {
    this.select = options['element'] || this.element;
  }

  this.initialize();
};

ASTEROIDS.core.Game.prototype.initialize = function() {
  this._initializeContainer();
  this._initializeObservers();
  this._initializeShip();
  this._populateContainer();
  this._initializeEvents();
  this._initializeSounds();
};

ASTEROIDS.core.Game.prototype._initializeContainer = function() {
  this._container = new ASTEROIDS.display.Container({
    element: this.element
  });
};

ASTEROIDS.core.Game.prototype._initializeObservers = function() {
  this._ai = new ASTEROIDS.observers.AI();
  this._collision = new ASTEROIDS.observers.Collision();
  this._trash = new ASTEROIDS.observers.Trash();
};

ASTEROIDS.core.Game.prototype._initializeShip = function() {
  this._ship = new ASTEROIDS.display.Ship();
  this._ship.position = {
    x: this._container.width / 2 - this._ship.width / 2,
    y: this._container.height / 2 - this._ship.height / 2
  };
  this._ship.update();
};

ASTEROIDS.core.Game.prototype._populateContainer = function() {
  this._container.add(this._ship);
  this._container.add(this._ai);
  this._container.add(this._collision);
  this._container.add(this._trash);
};

ASTEROIDS.core.Game.prototype._initializeEvents = function() {
  this._tick = new ASTEROIDS.events.Tick();
  this._tick.addListener($.proxy(this._container.update, this._container));
  this._tick.start();

  this._key = new ASTEROIDS.events.Key();
  this._key.start();
};

ASTEROIDS.core.Game.prototype._initializeSounds = function() {
  var sounds = {};
  sounds['bullet'] = [];
  sounds['asteroid-explosion'] = [];
  sounds['ship-explosion'] = [];
  sounds['music'] = [];
  var sound;
  for (var i = 0; i < 10; i++) {
    sound = new ASTEROIDS.sound.Sound({
      url: '/assets/audio/bullet.mp3'
    });
    sounds['bullet'].push(sound);

    sound = new ASTEROIDS.sound.Sound({
      url: '/assets/audio/asteroid-explosion.mp3'
    });
    sounds['asteroid-explosion'].push(sound);

    sound = new ASTEROIDS.sound.Sound({
      url: '/assets/audio/ship-explosion.mp3'
    });
    sounds['ship-explosion'].push(sound);
  }

  sound = new ASTEROIDS.sound.Sound({
    url: '/assets/audio/music.mp3',
    loop: true
  });
  sounds['music'].push(sound);

  this._sfx = new ASTEROIDS.sound.SFX({
    sounds: sounds
  });
  ASTEROIDS.sound.SFX.instance = this._sfx;

  ASTEROIDS.sound.SFX.play('music');
};

