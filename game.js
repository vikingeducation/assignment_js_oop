"use strict";

var APP = APP || {};

APP.game = {

  play: function() {
    APP.asteroid.init();
    APP.asteroid.createMany(2000);
    this.interval = setInterval(this.loop, 100);
  },

  stop: function() {
    clearInterval(this.interval);
  },

  loop: function() {
    APP.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    APP.gameWindow.moveAsteroids();
  },

  benchmark: function() {
    var time = Date.now();
    APP.asteroid.createMany(100);
    for (var i = 0; i < 100; i++) {
      APP.gameWindow.ticAsteroids();
    }
    console.log(Date.now() - time);
  },
};
