"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.observers = ASTEROIDS.observers || {};

ASTEROIDS.observers.Collision = function Collision(options) {
  ASTEROIDS.observers.Observer.call(this, options);
};

ASTEROIDS.observers.Collision.create = function(options) {
  return new ASTEROIDS.observers.Collision(options);
};

ASTEROIDS.observers.Collision.prototype = Object.create(ASTEROIDS.observers.Observer.prototype);
ASTEROIDS.observers.Collision.prototype.constructor = ASTEROIDS.observers.Collision;

ASTEROIDS.observers.Collision.prototype.update = function(e, data) {
  var that = this;

  this.container.sprites.forEach(function(spriteA) {
    that.container.sprites.forEach(function(spriteB) {
      if (spriteA !== spriteB) {
        spriteA.collide(spriteB);
      }
    });
  });
};

