"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Container = function Container(options) {
  this.sprites = [];
  this.$element = null;
  this.width = 0;
  this.height = 0;

  if (options) {
    this.sprites = options['sprites'] || this.sprites;
    this.$element = $(options['element']) || this.$element;

    if (this.$element) {
      this.width = this.$element.width();
      this.height = this.$element.height();
    }
  }
};

ASTEROIDS.display.Container.prototype.update = function() {
  var that = this;

  this.sprites.forEach(function(sprite) {
    sprite.update();
    
    if (sprite.position.x < 0 - sprite.width) {
      sprite.position.x = that.width;
    } else if (sprite.position.x > that.width) {
      sprite.position.x = 0 - sprite.width;
    }

    if (sprite.position.y < 0 - sprite.height) {
      sprite.position.y = that.height;
    } else if (sprite.position.y > that.height) {
      sprite.position.y = 0 - sprite.height;
    }
  });
};

ASTEROIDS.display.Container.prototype.add = function(sprite) {
  sprite.id = this.sprites.length;
  sprite.$element.attr('data-id', sprite.id);
  this.sprites.push(sprite);
  this.$element.append(sprite.$element);
  return sprite;
};

ASTEROIDS.display.Container.prototype.remove = function(sprite) {
  this.sprites.splice(sprite.id, 1);
  this.$element.remove(sprite.$element);
  return sprite;
};

