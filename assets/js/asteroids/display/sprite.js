"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Sprite = function Sprite(options) {
  this.id = null;
  this.container = null;
  this.position = {
    x: 0,
    y: 0
  };
  this.velocity = {
    x: 0,
    y: 0
  };
  this.width = 0;
  this.height = 0;
  this.rotation = 0;
  this.isDead = false;
  this.isAlive = true;
  this.isDestroyed = false;

  this._collisions = [];

  if (options) {
    this.container = options['container'] || this.container;
    this.position = options['position'] || this.position;
    this.velocity = options['velocity'] || this.velocity;
    this.width = options['width'] || this.width;
    this.height = options['height'] || this.height;
    this.rotation = options['rotation'] || this.rotation;
  }

  this.$element = this.render();
  this.$element.css({
    width: this.width + 'px',
    height: this.height + 'px'
  });

  this._lastRotation = this.rotation;

  this.update();
};

ASTEROIDS.display.Sprite.create = function(options) {
  return new ASTEROIDS.display.Sprite(options);
};

ASTEROIDS.display.Sprite.prototype.MIN_VELOCITY = 0;
ASTEROIDS.display.Sprite.prototype.MAX_VELOCITY = 10;

ASTEROIDS.display.Sprite.prototype.update = function(e, data) {
  this.clampVelocity();

  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  this.$element.css({
    top: this.position.y + 'px',
    left: this.position.x + 'px'
  });

  if (this.rotation !== 0 && this.rotation !== this._lastRotation) {
    if (this.rotation < -180) {
      this.rotation = 180;
    } else if (this.rotation > 180) {
      this.rotation = -180;
    }

    this.$element.css({
      '-webkit-transform' : 'rotate('+ this.rotation +'deg)',
      '-moz-transform' : 'rotate('+ this.rotation +'deg)',
      '-ms-transform' : 'rotate('+ this.rotation +'deg)',
      'transform' : 'rotate('+ this.rotation +'deg)'
    });

    this._lastRotation = this.rotation;
  }
};

ASTEROIDS.display.Sprite.prototype.collide = function(sprite) {
  var left,
      right,
      top,
      bottom;

  if (this.position.x < sprite.position.x) {
    left = this;
    right = sprite;
  } else {
    left = sprite;
    right = this;
  }

  if (this.position.y < sprite.position.y) {
    top = this;
    bottom = sprite;
  } else {
    top = sprite;
    bottom = this;
  }

  var x = right.position.x;
  var y = bottom.position.y;
  var width = (left.position.x + left.width) - right.position.x;
  var height = (top.position.y + top.height) - bottom.position.y;

  if (width <= 0 || height <= 0) {
    this.removeCollision(sprite);
  } else {
    this.addCollision(sprite);
    return {
      x: (x + width) / 2,
      y: (y + height) / 2
    };
  }
};

ASTEROIDS.display.Sprite.prototype.addCollision = function(sprite) {
  var collisionIndex = this._collisions.indexOf(sprite);
  if (collisionIndex < 0) {
    this._collisions.push(sprite);
  }
};

ASTEROIDS.display.Sprite.prototype.removeCollision = function(sprite) {
  var collisionIndex = this._collisions.indexOf(sprite);
  if (collisionIndex >= 0) {
    this._collisions.splice(collisionIndex, 1);
  }
};

ASTEROIDS.display.Sprite.prototype.render = function() {
  return this.$element = $('<div class="sprite" data-id="' + this.id + '"></div>');
};

ASTEROIDS.display.Sprite.prototype.die = function() {
  this.isDead = true;
  this.isAlive = !this.isDead;
};

ASTEROIDS.display.Sprite.prototype.destroy = function() {
  //
};

ASTEROIDS.display.Sprite.prototype.removed = function() {};

ASTEROIDS.display.Sprite.prototype.clampVelocity = function() {
  var that = this;
  ['x', 'y'].forEach(function(axis) {
    var direction = (that.velocity[axis] > 0) ? 1 : -1;
    var value = Math.abs(that.velocity[axis]);
    if (value < that.MIN_VELOCITY) {
      that.velocity[axis] = direction * that.MIN_VELOCITY;
    } else if (value > that.MAX_VELOCITY) {
      that.velocity[axis] = direction * that.MAX_VELOCITY;
    }
  });
};

