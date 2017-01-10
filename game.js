"use strict";

var APP = APP || {};

APP.game = {
  play: function() {
    this.interval = setInterval(this.loop, 100);
  },

  stop: function() {
    clearInterval(this.interval);
  },

  loop: function() {
    APP.gameWindow.ticAsteroids();
  }
}