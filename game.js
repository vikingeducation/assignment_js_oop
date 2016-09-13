var APP = APP || {};

APP.Game = {

  getAsteroids: function() {
    APP.Model.init();
    APP.View.drawAsteroids(APP.Model.asteroids, 3);
  }

}