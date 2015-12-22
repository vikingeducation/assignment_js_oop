"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.events = ASTEROIDS.events || {};

ASTEROIDS.events.Tick = function Tick(options) {
  ASTEROIDS.events.Event.call(this, options);

  this.loop = true;
  this.speed = 30;

  this._event = 'tick';
};

ASTEROIDS.events.Tick.prototype = Object.create(ASTEROIDS.events.Event.prototype);
ASTEROIDS.events.Tick.prototype.constructor = ASTEROIDS.events.Tick;

