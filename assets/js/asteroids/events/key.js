"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.events = ASTEROIDS.events || {};

ASTEROIDS.events.Key = function Key(options) {
  ASTEROIDS.events.Event.call(this, options);

  this._event = 'key';

  this._bind(document, 'keydown', $.proxy(this.onKeyDown, this));
  this._bind(document, 'keyup', $.proxy(this.onKeyUp, this));
};

ASTEROIDS.events.Key.justPressed = {};
ASTEROIDS.events.Key.pressed = {};

ASTEROIDS.events.Key.keyMap = {
  'SPACE': 32,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40
};

ASTEROIDS.events.Key.wasJustPressed = function(keyName) {
  var keyCode = ASTEROIDS.events.Key.keyMap[keyName.toUpperCase()];
  return ASTEROIDS.events.Key.justPressed[keyCode];
};

ASTEROIDS.events.Key.isPressed = function(keyName) {
  var keyCode = ASTEROIDS.events.Key.keyMap[keyName.toUpperCase()];
  return ASTEROIDS.events.Key.pressed[keyCode];
};

ASTEROIDS.events.Key.create = function(options) {
  return new ASTEROIDS.events.Key(options);
};

ASTEROIDS.events.Key.prototype = Object.create(ASTEROIDS.events.Event.prototype);
ASTEROIDS.events.Key.prototype.constructor = ASTEROIDS.events.Key;

ASTEROIDS.events.Key.prototype.onKeyDown = function(e) {
  ASTEROIDS.events.Key.justPressed = {};
  ASTEROIDS.events.Key.justPressed[e.keyCode] = true;
  ASTEROIDS.events.Key.pressed[e.keyCode] = true;
  return this._onKeyEvent(e);
};

ASTEROIDS.events.Key.prototype.onKeyUp = function(e) {
  ASTEROIDS.events.Key.justPressed = {};
  ASTEROIDS.events.Key.pressed[e.keyCode] = false;
  return this._onKeyEvent(e);
};

ASTEROIDS.events.Key.prototype._onKeyEvent = function(e) {
  e.preventDefault();
  this.start();
  return false;
};

