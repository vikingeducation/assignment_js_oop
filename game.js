var APP = APP || {};

APP.Game = {
  init: function() {
    APP.View.cacheDOM();
    APP.View.handleMovement();
    APP.Game.loadObjects();
    APP.Game.listenForChanges();
  },

  loadObjects: function() {
    APP.Model.init();
  },

  moveSpaceShip: function() {
    var button = APP.View.keypress;
    APP.Model.moveSpaceShip(button);
  },

  listenForChanges: function() {
    setInterval(function() {
      APP.Game.moveSpaceShip();
      APP.View.clearCanvas();
      APP.View.drawSpaceShip(APP.Model.spaceship);
      APP.View.drawAsteroids(APP.Model.asteroids, 3);
    },200);
  }

};
