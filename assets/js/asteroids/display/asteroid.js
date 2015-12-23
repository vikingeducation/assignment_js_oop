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

  this.clampVelocity();

  this.$element.css({
    borderRadius: (this.width / 2) + 'px'
  });
};

ASTEROIDS.display.Asteroid.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Asteroid.prototype.constructor = ASTEROIDS.display.Asteroid;

ASTEROIDS.display.Asteroid.MIN_RADIUS = 8;
ASTEROIDS.display.Asteroid.MAX_RADIUS = 96;
ASTEROIDS.display.Asteroid.MIN_VELOCITY = 1;
ASTEROIDS.display.Asteroid.MAX_VELOCITY = 5;
ASTEROIDS.display.Asteroid.MIN_CHILDREN = 1;
ASTEROIDS.display.Asteroid.MAX_CHILDREN = 4;

ASTEROIDS.display.Asteroid.create = function(options) {
  return new ASTEROIDS.display.Asteroid(options);
};

ASTEROIDS.display.Asteroid.prototype.update = function() {
  ASTEROIDS.display.Sprite.prototype.update.call(this);
};

ASTEROIDS.display.Asteroid.prototype.collide = function(asteroid) {
  var distance = this._distanceTo(asteroid);

  if (distance < (this.radius + asteroid.radius)) {
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
};

ASTEROIDS.display.Asteroid.prototype.clampVelocity = function() {
  var that = this;
  ['x', 'y'].forEach(function(axis) {
    var direction = (that.velocity[axis] > 0) ? 1 : -1;
    var value = Math.abs(that.velocity[axis]);
    if (value < ASTEROIDS.display.Asteroid.MIN_VELOCITY) {
      that.velocity[axis] = direction * ASTEROIDS.display.Asteroid.MIN_VELOCITY;
    } else if (value > ASTEROIDS.display.Asteroid.MAX_VELOCITY) {
      that.velocity[axis] = direction * ASTEROIDS.display.Asteroid.MAX_VELOCITY;
    }
  });
};

ASTEROIDS.display.Asteroid.prototype._explode = function() {
  if (this.radius > ASTEROIDS.display.Asteroid.MIN_RADIUS &&
    this.container.sprites.length < ASTEROIDS.MAX_ASTEROIDS) {

    var numChildren = ASTEROIDS.utils.Math.random(
      ASTEROIDS.display.Asteroid.MIN_CHILDREN,
      ASTEROIDS.display.Asteroid.MAX_CHILDREN
    );

    var collidedAsteroid = this._collisions[0];
    var point = this._collisionPointWith(collidedAsteroid);

    for (var i = 0; i < numChildren; i++) {
      this._spawnChildAt(point, collidedAsteroid);
    }
  }
};

ASTEROIDS.display.Asteroid.prototype._spawnChildAt = function(point, collidedAsteroid) {
  var angle = ASTEROIDS.utils.Math.randomAngle();
  var velocity = {
    x: (this.diameter / collidedAsteroid.radius) * angle.x,
    y: (this.diameter / collidedAsteroid.radius) * angle.y
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

ASTEROIDS.display.Asteroid.prototype._distanceTo = function(asteroid) {
  var a = this.position.x - asteroid.position.x;
  var b = this.position.y - asteroid.position.y;
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
};

ASTEROIDS.display.Asteroid.prototype._collisionPointWith = function(asteroid) {
  var point = {};
  var that = this;
  ['x', 'y'].forEach(function(axis) {
    point[axis] = ((that.position[axis] * asteroid.radius) +
      (asteroid.position[axis] * that.radius)) / (that.radius + asteroid.radius);
  });
  return point;
};

ASTEROIDS.display.Asteroid.prototype._bounceVelocityFrom = function(asteroid) {
  var velocity = {};
  var that = this;
  ['x', 'y'].forEach(function(axis) {
    velocity[axis] = (that.velocity[axis] * (that.radius - asteroid.radius) +
      (2 * asteroid.radius * asteroid.velocity[axis])) / (that.radius + asteroid.radius);
  });
  return velocity;
};

