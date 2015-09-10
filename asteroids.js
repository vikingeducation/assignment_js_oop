//var ASTEROIDS = ASTEROIDS || {};

var model = {

  init: function(asteroidCount) {
    for (var i = 0; i < asteroidCount; i++) {
      var asteroid = new model.Asteroid(model.randomAttributes());
    };
    model.Asteroid.prototype.tic = function() {
      this.x += this.velocityX;
      this.y += this.velocityY;
    };
  },


  asteroids: [],


  Asteroid: function(startingAttributes) {
    this.x = startingAttributes.x;
    this.y = startingAttributes.y;
    this.velocityX = startingAttributes.velocityX;
    this.velocityY = startingAttributes.velocityY;
    this.radius = startingAttributes.radius;
    model.asteroids.push(this);
  },


  randomAttributes: function() {
    var attributes = {
      x: model.randInt(0, 640),
      y: model.randInt(0, 480),
      velocityX: model.randInt(-25,25),
      velocityY: model.randInt(-25,25),
      radius: model.randInt(10,30)
    };
    return attributes;
  },


  getAsteroids: function() {
    return model.asteroids;
  },


  tic: function() {
    $.each(model.asteroids, function(i, asteroid) {
      asteroid.tic();
    });
  },


  randInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}




var view = {

  init: function(asteroids) {
    view.renderTic(asteroids)
  },


  renderTic: function(asteroids) {
    $.each(asteroids, view.renderAsteroid);
  },


  renderAsteroid: function(index, asteroid) {
    var canvas = $('#playarea')[0].getContext('2d');
    canvas.beginPath();
    canvas.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2, false);
    canvas.closePath();
    canvas.strokeStyle = "#000";
    canvas.stroke();
  },


}



var controller = {

  init: function(asteroidCount) {
    model.init(asteroidCount);
    view.init(model.getAsteroids());
    setTimeout(controller.tic, 2000);
  },

  tic: function() {
    model.tic();
    view.init(model.getAsteroids());
  }

}



$(document).ready( function() {
  controller.init(10);
})
