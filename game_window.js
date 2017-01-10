"use strict";

var APP = APP || {};

APP.gameWindow = {

  asteroids: [],

  canvases: [],

  init: function() {
    this.canvases.push(APP.shipCanvas);
    this.canvases.push(APP.asteroidCanvas);
  },

  updateContexts: function() {
   this._moveAsteroids();
   this._moveShip();
  },

  clearContexts: function() {
    this.canvases.forEach(function(canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    })
  },

  _moveShip: function() {
    this.ship.draw();
  },

  _moveAsteroids: function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  }
};
