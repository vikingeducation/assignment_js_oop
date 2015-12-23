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
  }

  this.$element = this.render();
  this.$element.css({
    width: this.width + 'px',
    height: this.height + 'px'
  });

  this.update();
};

ASTEROIDS.display.Sprite.create = function(options) {
  return new ASTEROIDS.display.Sprite(options);
};

ASTEROIDS.display.Sprite.prototype.update = function(e, data) {
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  this.$element.css({
    top: this.position.y + 'px',
    left: this.position.x + 'px'
  });
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
  
};

ASTEROIDS.display.Sprite.prototype.removed = function() {};

ASTEROIDS.display.Sprite.prototype.clampVelocity = function() {};

