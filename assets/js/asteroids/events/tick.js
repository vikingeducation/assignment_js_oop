"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.events = ASTEROIDS.events || {};

ASTEROIDS.events.Tick = function Tick(options) {
  ASTEROIDS.events.Event.call(this, options);

  this.loop = true;
  this.speed = 30;

  this._event = 'tick';
};

ASTEROIDS.events.Tick.create = function(options) {
  return new ASTEROIDS.events.Tick(options);
};

ASTEROIDS.events.Tick.prototype = Object.create(ASTEROIDS.events.Event.prototype);
ASTEROIDS.events.Tick.prototype.constructor = ASTEROIDS.events.Tick;

ASTEROIDS.events.Tick.prototype.fire = function() {
  this.data = {
    delta: (window.performance) ? window.performance.now() : Date.now()
  };

  ASTEROIDS.events.Event.prototype.fire.call(this);
};

