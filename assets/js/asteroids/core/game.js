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

  if (options) {
    this.select = options['element'] || this.element;
  }

  this.initialize();
};

ASTEROIDS.core.Game.prototype.initialize = function() {
  this._container = new ASTEROIDS.display.Container({
    element: this.element
  });

  this._ai = new ASTEROIDS.observers.AI();
  this._collision = new ASTEROIDS.observers.Collision();
  this._ship = new ASTEROIDS.display.Ship();
  this._ship.position = {
    x: this._container.width / 2 - this._ship.width / 2,
    y: this._container.height / 2 - this._ship.height / 2
  };
  this._ship.update();
  this._container.add(this._ship);
  this._container.add(this._ai);
  this._container.add(this._collision);

  this._tick = new ASTEROIDS.events.Tick();
  this._tick.addListener($.proxy(this._container.update, this._container));
  this._tick.start();
};

