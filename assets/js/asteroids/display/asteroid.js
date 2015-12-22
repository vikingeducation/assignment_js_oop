"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Asteroid = function Asteroid(options) {
  options = options || {};
  options['width'] = options['width'] || 32;
  options['height'] = options['height'] || 32;

  ASTEROIDS.display.Sprite.call(this, options);

  this.$element.css({
    borderRadius: (this.width / 2) + 'px'
  });
};

ASTEROIDS.display.Asteroid.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Asteroid.prototype.constructor = ASTEROIDS.display.Asteroid;

ASTEROIDS.display.Asteroid.prototype.render = function() {
  var $sprite = ASTEROIDS.display.Sprite.prototype.render.call(this);
  $sprite.addClass('asteroid');
  return $sprite;
};

