"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.display = ASTEROIDS.display || {};

ASTEROIDS.display.Container = function Container(options) {
  this.sprites = [];
  this.observers = [];
  this.$element = null;
  this.width = 0;
  this.height = 0;

  this._spriteId = 0;

  if (options) {
    this.observers = options['observers'] || this.observers;
    this.sprites = options['sprites'] || this.sprites;
    this.$element = $(options['element']) || this.$element;

    if (this.$element) {
      this.width = this.$element.width();
      this.height = this.$element.height();
    }
  }
};

ASTEROIDS.display.Container.create = function(options) {
  return new ASTEROIDS.display.Container(options);
};

ASTEROIDS.display.Container.prototype.update = function(e, data) {
  var that = this;

  this.sprites.forEach(function(sprite) {
    if (sprite.isDead) {
      that.remove(sprite);
    } else {
      sprite.update(e, data);
      that._wrapPositionOf(sprite);
    }
  });

  this.observers.forEach(function(observer) {
    observer.update(e, data);
  });
};


ASTEROIDS.display.Container.prototype.add = function(object) {
  if (object instanceof ASTEROIDS.display.Sprite) {
    this.addSprite(object);
  } else if (object instanceof ASTEROIDS.observers.Observer) {
    this.addObserver(object);
  }
};

ASTEROIDS.display.Container.prototype.remove = function(object) {
  if (object instanceof ASTEROIDS.display.Sprite) {
    this.removeSprite(object);
  } else if (object instanceof ASTEROIDS.observers.Observer) {
    this.removeObserver(object);
  }
};

ASTEROIDS.display.Container.prototype.addSprite = function(sprite) {
  sprite.container = this;
  sprite.id = this._spriteId++;
  this.sprites.push(sprite);
  sprite.$element.attr('data-id', sprite.id);
  this.$element.append(sprite.$element);
  return sprite;
};

ASTEROIDS.display.Container.prototype.removeSprite = function(sprite) {
  var $sprite = this.$element.find('div[data-id="' + sprite.id + '"]');
  $.when($sprite.remove()).then(sprite.removed());
  var index = this.sprites.indexOf(sprite);
  this.sprites.splice(index, 1);
  sprite.container = null;
  sprite.id = null;
  sprite.$element.attr('data-id', '');
  return sprite;
};

ASTEROIDS.display.Container.prototype.addObserver = function(observer) {
  observer.container = this;
  this.observers.push(observer);
  return observer;
};

ASTEROIDS.display.Container.prototype.removeObserver = function(observer) {
  observer.container = null;
  var index = this.observers.indexOf(observer);
  this.observers.splice(index, 1);
  return observer;
};

ASTEROIDS.display.Container.prototype._wrapPositionOf = function(sprite) {
  if (sprite.position.x < 0 - sprite.width) {
    sprite.position.x = this.width;
  } else if (sprite.position.x > this.width) {
    sprite.position.x = 0 - sprite.width;
  }

  if (sprite.position.y < 0 - sprite.height) {
    sprite.position.y = this.height;
  } else if (sprite.position.y > this.height) {
    sprite.position.y = 0 - sprite.height;
  }
};

