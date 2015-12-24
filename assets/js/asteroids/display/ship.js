"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Ship = function Ship(options) {
  ASTEROIDS.display.Sprite.call(this, options);

  this.bullets = [];
  this.width = 16;
  this.height = 32;
  this.isInvincible = false;

  if (options) {
    this.bullets = options['bullets'] || this.bullets;
  }

  this.$element = this.render();
  this.$element.css({
    width: 0,
    height: 0,
    borderRight: 'none',
    borderLeft: this.height + 'px solid #fff',
    borderTop: this.width / 2 + 'px solid transparent',
    borderBottom: this.width / 2 + 'px solid transparent'
  });

  this.update();
};

ASTEROIDS.display.Ship.SPEED = 0.75;
ASTEROIDS.display.Ship.ROTATION_SPEED = 6;

ASTEROIDS.display.Ship.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Ship.prototype.constructor = ASTEROIDS.display.Ship;

ASTEROIDS.display.Ship.prototype.MIN_VELOCITY = 0;
ASTEROIDS.display.Ship.prototype.MAX_VELOCITY = 10;

ASTEROIDS.display.Ship.prototype.update = function(e, data) {
  ASTEROIDS.display.Sprite.prototype.update.call(this, e, data);

  this._move();

  if (ASTEROIDS.events.Key.isPressed('space')) {
    key = 'space';
  }
};

ASTEROIDS.display.Ship.prototype.collide = function(sprite) {
  var point = ASTEROIDS.display.Sprite.prototype.collide.call(this, sprite);

  if (point && !this.isInvincible) {
    this.die();
  }
};

ASTEROIDS.display.Ship.prototype.removed = function() {
  this.live();
  this.position.x = this.container.width / 2 - this.width / 2;
  this.position.y = this.container.height / 2 - this.height / 2;
  this.rotation = 0;
  this.update();
  this.container.add(this);
};

ASTEROIDS.display.Ship.prototype.render = function() {
  var $sprite = ASTEROIDS.display.Sprite.prototype.render.call(this);
  $sprite.addClass('ship');
  return $sprite;
};

ASTEROIDS.display.Ship.prototype._move = function() {
  if (ASTEROIDS.events.Key.isPressed('left') &&
      !ASTEROIDS.events.Key.wasJustPressed('right')) {
    this.rotation -= ASTEROIDS.display.Ship.ROTATION_SPEED;
  }

  if (ASTEROIDS.events.Key.isPressed('right') &&
      !ASTEROIDS.events.Key.wasJustPressed('left')) {
    this.rotation += ASTEROIDS.display.Ship.ROTATION_SPEED;
  }

  if (ASTEROIDS.events.Key.isPressed('up') &&
      !ASTEROIDS.events.Key.wasJustPressed('down')) {
    this._accelerate();
  }

  if (ASTEROIDS.events.Key.isPressed('down') &&
      !ASTEROIDS.events.Key.wasJustPressed('up')) {
    this._delecerate();
  }
};

ASTEROIDS.display.Ship.prototype._accelerate = function() {
  this._throttle(1);
};

ASTEROIDS.display.Ship.prototype._delecerate = function() {
  this._throttle(-1);
};

ASTEROIDS.display.Ship.prototype._throttle = function(direction) {
  var radians = ASTEROIDS.utils.Math.toRadians(this.rotation);
  this.velocity.x += direction * (Math.cos(radians) * ASTEROIDS.display.Ship.SPEED);
  this.velocity.y += direction * (Math.sin(radians) * ASTEROIDS.display.Ship.SPEED);
};

