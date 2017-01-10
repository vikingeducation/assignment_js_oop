"use strict";

var APP = APP || {};

APP.gameWindow = {

  asteroids: [],

  moveAsteroids: function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  }
};
