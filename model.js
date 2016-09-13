var APP = APP || {};

APP.Model = {
  init: function() {
    this.asteroids = [];

    for (var i = 0; i < 30; i++) {
      this.asteroids.push(APP.buildAsteroid());
    }
  }
};
