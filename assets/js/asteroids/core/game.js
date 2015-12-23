"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.core = ASTEROIDS.core || {};

ASTEROIDS.core.Game = function Game(options) {
  this.element = '#game';

  this._ai;
  this._collision;
  this._container;
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
  this._container.add(this._ai);
  this._container.add(this._collision);

  this._tick = new ASTEROIDS.events.Tick();
  this._tick.addListener($.proxy(this._container.update, this._container));
  this._tick.start();
};

