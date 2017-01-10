"use strict";

var APP = APP || {};

APP.gameWindow = {

  asteroids: [],

  ticAsteroids: function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.tic();
    });
  }
}