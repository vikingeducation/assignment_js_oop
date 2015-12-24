"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Ship = function Ship(options) {
  ASTEROIDS.display.Sprite.call(this, options);

  this.bullets = [];
  this.width = 16;
  this.height = 32;
  this.isInvincible = false;

  this.lastDelta = null;

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

  this._arm();
};

ASTEROIDS.display.Ship.SPEED = 0.75;
ASTEROIDS.display.Ship.ROTATION_SPEED = 6;
ASTEROIDS.display.Ship.RELOAD_TIME = 200;

ASTEROIDS.display.Ship.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Ship.prototype.constructor = ASTEROIDS.display.Ship;

ASTEROIDS.display.Ship.prototype.MIN_VELOCITY = 0;
ASTEROIDS.display.Ship.prototype.MAX_VELOCITY = 10;

ASTEROIDS.display.Ship.prototype.update = function(e, data) {
  ASTEROIDS.display.Sprite.prototype.update.call(this, e, data);

  this._move();
  if (data) {
    if (this.lastDelta === null ||
        data.delta - this.lastDelta > ASTEROIDS.display.Ship.RELOAD_TIME) {
      this._fire();
      this.lastDelta = data.delta;
    }
  }
};

ASTEROIDS.display.Ship.prototype.collide = function(sprite) {
  var point;
  if (!(sprite instanceof ASTEROIDS.display.Bullet)) {
    point = ASTEROIDS.display.Sprite.prototype.collide.call(this, sprite);
  }

  if (point && !this.isInvincible) {
    this.die();
  }
};

ASTEROIDS.display.Ship.prototype.removed = function() {
  this.live();
  this.position = {
    x: this.container.width / 2 - this.width / 2,
    y: this.container.height / 2 - this.height / 2
  };
  this.velocity = {
    x: 0,
    y: 0
  };
  this.rotation = 0;
  this.update();
  this.container.add(this);
};

ASTEROIDS.display.Ship.prototype.render = function() {
  var $sprite = ASTEROIDS.display.Sprite.prototype.render.call(this);
  $sprite.addClass('ship');
  return $sprite;
};

ASTEROIDS.display.Ship.prototype.destroy = function() {
  ASTEROIDS.display.Sprite.prototype.destroy.call(this);

  this.bullets.forEach(function(bullet) {
    bullet.destroy();
  });
  this.bullets = null;
};

ASTEROIDS.display.Ship.prototype._fire = function() {
  if (ASTEROIDS.events.Key.isPressed('space')) {
    var bullet;
    for (var i = 0; i < this.bullets.length; i++) {
      bullet = this.bullets[i];
      if (bullet.isDead) {
        break;
      }
    }
    bullet.live();
    bullet.fireFrom(this);
  }
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

ASTEROIDS.display.Ship.prototype._arm = function() {
  for (var i = 0; i < 100; i++) {
    var bullet = new ASTEROIDS.display.Bullet({
      isDead: true,
      position: {
        x: -100,
        y: -100
      },
      ship: this
    });
    this.bullets.push(bullet);
  }
};

