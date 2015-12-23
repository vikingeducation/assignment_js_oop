"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.utils = ASTEROIDS.utils || {};

ASTEROIDS.utils.Math = function Math() {};

ASTEROIDS.utils.Math.MAX_INTEGER = Math.pow(2, 53) - 1;
ASTEROIDS.utils.Math.MIN_INTEGER = -(Math.pow(2, 53) - 1);

ASTEROIDS.utils.Math.random = function(min, max) {
  min = min || ASTEROIDS.utils.Math.MIN_INTEGER;
  max = max || ASTEROIDS.utils.Math.MAX_INTEGER;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

ASTEROIDS.utils.Math.randomAngle = function() {
  var angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle),
    y: Math.sin(angle)
  };
};

