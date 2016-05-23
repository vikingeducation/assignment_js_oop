"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.observers = ASTEROIDS.observers || {};

ASTEROIDS.observers.Trash = function Trash(options) {
  ASTEROIDS.observers.Observer.call(this, options);

  this.lastDelta = null;
  this.interval = 5000;
};

ASTEROIDS.observers.Trash.create = function(options) {
  return new ASTEROIDS.observers.Trash(options);
};

ASTEROIDS.observers.Trash.prototype = Object.create(ASTEROIDS.observers.Observer.prototype);
ASTEROIDS.observers.Trash.prototype.constructor = ASTEROIDS.observers.Trash;

ASTEROIDS.observers.Trash.prototype.update = function(e, data) {
  if (this.lastDelta === null ||
      data.delta - this.lastDelta > this.interval) {
    this.clean();
    this.lastDelta = data.delta;
  }
};

ASTEROIDS.observers.Trash.prototype.clean = function() {
  var that = this;

  var numTrashed = 0;

  this.container.trashes.forEach(function(spriteA) {
    if (spriteA.isTrash) {
      var numCollisions = 0;
      that.container.trashes.forEach(function(spriteB) {
        if (spriteA !== spriteB) {
          spriteB._collisions.forEach(function(collided) {
            if (spriteA === collided) {
              numCollisions++;
            }
          });
        }
      });

      if (numCollisions === 0) {
        spriteA.destroy();
        that.container.removeTrash(spriteA);
        numTrashed++;
      }
    }
  });
};

