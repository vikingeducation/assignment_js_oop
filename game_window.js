"use strict";

var APP = APP || {};

APP.gameWindow = {

  // bring to the model
  asteroids: [],

  canvases: [],

  init: function() {
    this.canvases.push(APP.shipCanvas);
    this.canvases.push(APP.asteroidCanvas);
    $(document).keydown(this._controlShip);
  },

  updateContexts: function() {
   this._moveAsteroids();
   this._moveShip();
  },

  clearContexts: function() {
    this.canvases.forEach(function(canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    });
  },

  _controlShip: function(e) {
    var keys = [37, 38, 39],
        direction;
    if (e.which === 37) {
      direction = 'l';
    } else if (e.which === 38) {
      this.ship.boost();
    } else if (e.which === 39) {
      direction = 'r';
    }

    if (direction) {
      APP.gameWindow.ship.rotate(direction);
    }
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
