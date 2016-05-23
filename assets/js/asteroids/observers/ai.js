"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.observers = ASTEROIDS.observers || {};

ASTEROIDS.observers.AI = function AI(options) {
  ASTEROIDS.observers.Observer.call(this, options);

  this.lastDelta = null;
  this.interval = 5000;
};

ASTEROIDS.observers.AI.create = function(options) {
  return new ASTEROIDS.observers.AI(options);
};

ASTEROIDS.observers.AI.prototype = Object.create(ASTEROIDS.observers.Observer.prototype);
ASTEROIDS.observers.AI.prototype.constructor = ASTEROIDS.observers.AI;

ASTEROIDS.observers.AI.prototype.update = function(e, data) {
  if (this.lastDelta === null ||
      data.delta - this.lastDelta > this.interval) {
    this.addAsteroid();
    this.lastDelta = data.delta;
  }
};

ASTEROIDS.observers.AI.prototype.addAsteroid = function() {
  var asteroid = ASTEROIDS.display.Asteroid.create();

  var angle = ASTEROIDS.utils.Math.randomAngle();
  var speed = ASTEROIDS.utils.Math.random(
    ASTEROIDS.display.Asteroid.MIN_VELOCITY,
    ASTEROIDS.display.Asteroid.MAX_VELOCITY
  );
  var velocity = {
    x: speed * angle.x,
    y: speed * angle.y
  };
  var edge = {
    x: (speed % 2 === 0) ? this.container.width + asteroid.diameter : 0 - asteroid.diameter,
    y: (speed % 2 === 0) ? this.container.height + asteroid.diameter : 0 - asteroid.diameter
  };
  var position = {
    x: edge.x,
    y: edge.y
  };
  asteroid.position = position;
  asteroid.velocity = velocity;
  asteroid.update();

  this.container.add(asteroid);
};

