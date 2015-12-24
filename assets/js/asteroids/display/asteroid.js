"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Asteroid = function Asteroid(options) {
  options = options || {};

  this.radius = ASTEROIDS.utils.Math.random(
    ASTEROIDS.display.Asteroid.MIN_RADIUS,
    ASTEROIDS.display.Asteroid.MAX_RADIUS
  );

  if (typeof options['radius'] === 'number' && options['radius'] > 3) {
    this.radius = (options['radius'] > ASTEROIDS.display.Asteroid.MAX_RADIUS) ?
      ASTEROIDS.display.Asteroid.MAX_RADIUS : options['radius'];
  }

  this.diameter = this.radius * 2;
  options['width'] = this.diameter;
  options['height'] = this.diameter;

  ASTEROIDS.display.Sprite.call(this, options);

  this.$element.css({
    borderRadius: (this.width / 2) + 'px'
  });
};

ASTEROIDS.display.Asteroid.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Asteroid.prototype.constructor = ASTEROIDS.display.Asteroid;

ASTEROIDS.display.Asteroid.MIN_RADIUS = 8;
ASTEROIDS.display.Asteroid.MAX_RADIUS = 96;
ASTEROIDS.display.Asteroid.MIN_CHILDREN = 1;
ASTEROIDS.display.Asteroid.MAX_CHILDREN = 4;
ASTEROIDS.display.Asteroid.MAX_ASTEROIDS = 50;

ASTEROIDS.display.Asteroid.create = function(options) {
  return new ASTEROIDS.display.Asteroid(options);
};

ASTEROIDS.display.Asteroid.prototype.MIN_VELOCITY = 1;
ASTEROIDS.display.Asteroid.prototype.MAX_VELOCITY = 5;

ASTEROIDS.display.Asteroid.prototype.update = function(e, data) {
  ASTEROIDS.display.Sprite.prototype.update.call(this, e, data);
};

ASTEROIDS.display.Asteroid.prototype.collide = function(asteroid) {
  if (ASTEROIDS.display.Sprite.prototype.collide.call(this, asteroid)) {
    this.die();
    this.addCollision(asteroid);
  } else {
    this.removeCollision(asteroid);
  }
};

ASTEROIDS.display.Asteroid.prototype.render = function() {
  var $sprite = ASTEROIDS.display.Sprite.prototype.render.call(this);
  $sprite.addClass('asteroid');
  return $sprite;
};

ASTEROIDS.display.Asteroid.prototype.removed = function() {
  this._explode();
  this.removeAllCollisions();
  this.container.addTrash(this);
};

ASTEROIDS.display.Asteroid.prototype.destroy = function() {
  ASTEROIDS.display.Sprite.prototype.destroy.call(this);
  this.radius = 0;
  this.diameter = 0;
};

ASTEROIDS.display.Asteroid.prototype._explode = function() {
  if (this.radius > ASTEROIDS.display.Asteroid.MIN_RADIUS &&
    this.container.sprites.length < ASTEROIDS.display.Asteroid.MAX_ASTEROIDS) {

    var numChildren = ASTEROIDS.utils.Math.random(
      ASTEROIDS.display.Asteroid.MIN_CHILDREN,
      ASTEROIDS.display.Asteroid.MAX_CHILDREN
    );

    var collided = this._collisions[0];
    if (collided) {
      var point = this._collisionPointWith(collided);

      for (var i = 0; i < numChildren; i++) {
        this._spawnChildAt(point, collided);
      }
      this.removeCollision(collided);
    }
  }
};

ASTEROIDS.display.Asteroid.prototype._spawnChildAt = function(point, collided) {
  var angle = ASTEROIDS.utils.Math.randomAngle();
  var velocity = {
    x: (this.diameter / (collided.width / 2)) * angle.x,
    y: (this.diameter / (collided.width / 2)) * angle.y
  };
  var position = {
    x: point.x + (angle.x * (this.diameter + 1)),
    y: point.y + (angle.y * (this.diameter + 1))
  };
  var asteroid = new ASTEROIDS.display.Asteroid({
    position: position,
    velocity: velocity,
    radius: this.radius / 2
  });
  this.container.add(asteroid);
};

ASTEROIDS.display.Asteroid.prototype._collisionPointWith = function(collided) {
  var point = {};
  var that = this;
  ['x', 'y'].forEach(function(axis) {
    point[axis] = ((that.position[axis] * (collided.width / 2)) +
      (collided.position[axis] * that.radius)) / (that.radius + (collided.width / 2));
  });
  return point;
};

ASTEROIDS.display.Asteroid.prototype._bounceVelocityFrom = function(collided) {
  var velocity = {};
  var that = this;
  ['x', 'y'].forEach(function(axis) {
    velocity[axis] = (that.velocity[axis] * (that.radius - (collided.width / 2)) +
      (2 * (collided.width / 2) * collided.velocity[axis])) / (that.radius + (collided.width / 2));
  });
  return velocity;
};

