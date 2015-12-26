"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Text = function Text(options) {
  this.value = '';

  if (options) {
    this.value = options['value'] || {};
  }

  ASTEROIDS.display.Sprite.call(this, options);

  this.$element.text(this.value);
  this.$element.css({
    color: '#fff',
    width: '100%',
    border: 'none',
    textAlign: 'right'
  });

  this._lastString = this.value;

  this.update();
};

ASTEROIDS.display.Text.prototype = Object.create(ASTEROIDS.display.Sprite.prototype);
ASTEROIDS.display.Text.prototype.constructor = ASTEROIDS.display.Text;

ASTEROIDS.display.Text.create = function(options) {
  return new ASTEROIDS.display.Text(options);
};

ASTEROIDS.display.Text.prototype.update = function(e, data) {
  if (this._lastString !== this.value) {
    this.$element.text(this.value);
  }
};

ASTEROIDS.display.Text.prototype.render = function() {
  var $sprite = ASTEROIDS.display.Sprite.prototype.render.call(this);
  $sprite.addClass('text');
  return $sprite;
};

