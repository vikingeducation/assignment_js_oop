"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.core = ASTEROIDS.core || {};

ASTEROIDS.core.Game = function Game(options) {
  this.element = '#game';
  this.audioUrl = '';

  this._ai;
  this._collision;
  this._container;
  this._ship;
  this._tick;
  this._trash;
  this._key;
  this._sfx;
  this._score;

  if (options) {
    this.select = options['element'] || this.element;
    this.audioUrl = options['audioUrl'] || this.audioUrl;
  }

  this.initialize();
};

ASTEROIDS.core.Game.prototype.initialize = function() {
  this._initializeContainer();
  this._initializeObservers();
  this._initializeScore();
  this._initializeShip();
  this._populateContainer();
  this._initializeEvents();
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
  this._ship = new ASTEROIDS.display.Ship({
    scoreBoard: this._score
  });
  this._ship.position = {
    x: this._container.width / 2 - this._ship.width / 2,
    y: this._container.height / 2 - this._ship.height / 2,
  };
  this._ship.update();
};

ASTEROIDS.core.Game.prototype._initializeScore = function() {
  this._score = new ASTEROIDS.display.Text({
    value: 'Score: 0'
  });
  this._container.add(this._score);
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

