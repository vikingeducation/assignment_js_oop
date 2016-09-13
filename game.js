var APP = APP || {};

APP.Game = {

  getAsteroids: function() {
    APP.Model.init();
    APP.View.drawAsteroids(APP.Model.asteroids, 3);
    APP.View.drawSpaceShip(APP.Model.spaceship);
  },

  moveSpaceShip: function() {
    var button = APP.View.keypress;
    APP.Model.moveSpaceShip(button);
  }

};
