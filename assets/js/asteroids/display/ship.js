"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Ship = function Ship(options) {
  ASTEROIDS.display.Sprite.call(this, options);

  this.bullets = [];
  this.width = 16;
  this.height = 32;

  if (options) {
    this.bullets = options['bullets'] || this.bullets;
  }

  this.$element = this.render();
  this.$element.css({
    width: 0,
    height: 0,
    borderTop: 'none',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '32px solid #fff'
  });

  this.update();
};

ASTEROIDS.display.Ship.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Ship.prototype.constructor = ASTEROIDS.display.Ship;

