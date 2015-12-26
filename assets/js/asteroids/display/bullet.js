"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Bullet = function Bullet(options) {
  options = options || {};

  this.ship = null;
  this.width = 16;
  this.height = 2;
  this.isInvincible = false;

  this.lastDelta = null;
  this.timer = 0;

  if (options) {
    this.ship = options['ship'] || this.ship;
  }

  options['width'] = this.width;
  options['height'] = this.height;

  ASTEROIDS.display.Sprite.call(this, options);
};

ASTEROIDS.display.Bullet.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Bullet.prototype.constructor = ASTEROIDS.display.Bullet;

ASTEROIDS.display.Bullet.prototype.MIN_VELOCITY = 0;
ASTEROIDS.display.Bullet.prototype.MAX_VELOCITY = 20;
ASTEROIDS.display.Bullet.prototype.LIFE_TIME = 3000;

ASTEROIDS.display.Bullet.prototype.update = function(e, data) {
  ASTEROIDS.display.Sprite.prototype.update.call(this, e, data);

  if (data && this.isAlive) {
    if (this.lastDelta === null) {
        this.lastDelta = data.delta;
    }
    var elapsed = data.delta - this.lastDelta;
    this.timer -= elapsed;
    if (this.timer <= 0) {
      this.die();
    }
    this.lastDelta = data.delta;
  }
};

ASTEROIDS.display.Bullet.prototype.collide = function(sprite) {
  var point;
  if (!(sprite instanceof ASTEROIDS.display.Ship) &&
      !(sprite instanceof ASTEROIDS.display.Bullet)) {
    point = ASTEROIDS.display.Sprite.prototype.collide.call(this, sprite);
  }

  if (point && !this.isInvincible) {
    this.die();
    this.ship.score = Math.ceil(this.ship.score + sprite.width);
  }
};

ASTEROIDS.display.Bullet.prototype.removed = function() {
  this.position = {
    x: -100,
    y: -100
  };
  this.update();
};

ASTEROIDS.display.Bullet.prototype.fireFrom = function(ship) {
  var radians = ASTEROIDS.utils.Math.toRadians(ship.rotation);
  this.position = {
    x: ship.position.x + (Math.cos(radians) * ship.width),
    y: ship.position.y + (Math.sin(radians) * ship.height)
  };
  this.rotation = ASTEROIDS.utils.Math.toDegrees(radians);
  this.velocity = {
    x: Math.cos(radians) * this.MAX_VELOCITY,
    y: Math.sin(radians) * this.MAX_VELOCITY
  };
  this.timer = this.LIFE_TIME;
  ship.container.add(this);

  ASTEROIDS.sound.SFX.play('bullet');
};

ASTEROIDS.display.Bullet.prototype.render = function() {
  var $sprite = ASTEROIDS.display.Sprite.prototype.render.call(this);
  $sprite.addClass('bullet');
  return $sprite;
};

ASTEROIDS.display.Bullet.prototype.destroy = function() {
  ASTEROIDS.display.Sprite.prototype.destroy.call(this);

  this.ship = null;
};

