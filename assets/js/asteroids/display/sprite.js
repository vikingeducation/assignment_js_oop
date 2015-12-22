"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Sprite = function Sprite(options) {
  this.id = null;
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

  if (options) {
    this.position = options['position'] || this.position;
    this.velocity = options['velocity'] || this.velocity;
    this.width = options['width'] || this.width;
    this.height = options['height'] || this.height;
  }

  this.$element = this.render();
  this.update();

  this.$element.css({
    width: this.width + 'px',
    height: this.height + 'px'
  });
};

ASTEROIDS.display.Sprite.prototype.update = function() {
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  this.$element.css({
    top: this.position.y + 'px',
    left: this.position.x + 'px'
  });
};

ASTEROIDS.display.Sprite.prototype.render = function() {
  return this.$element = $('<div class="sprite" data-id="' + this.id + '"></div>');
};

