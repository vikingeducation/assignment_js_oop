"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.observers = ASTEROIDS.observers || {};

ASTEROIDS.observers.Observer = function Observer(options) {
  this.container = null;

  if (options) {
    this.container = options['container'] || this.container;
  }
};

ASTEROIDS.observers.Observer.create = function(options) {
  return new ASTEROIDS.observers.Observer(options);
};

ASTEROIDS.observers.Observer.prototype.update = function(e, data) {};

