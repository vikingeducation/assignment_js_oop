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
      velocityX: model.randInt(-7,7),
      velocityY: model.randInt(-7,7),
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
    view.canvas = $('#playarea')[0].getContext('2d');
    view.renderTic(asteroids);
  },


  renderTic: function(asteroids) {
    var width = $('canvas').width();
    var height = $('canvas').height();
    view.canvas.clearRect(0, 0, width, height);
    $.each(asteroids, view.renderAsteroid);
  },


  renderAsteroid: function(index, asteroid) {
    view.canvas.beginPath();
    view.canvas.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2, false);
    view.canvas.closePath();
    view.canvas.strokeStyle = "#000";
    view.canvas.stroke();
  },


}



var controller = {

  init: function(asteroidCount) {
    model.init(asteroidCount);
    view.init(model.getAsteroids());
    setInterval(controller.tic, 35);
  },

  tic: function() {
    model.tic();
    view.renderTic(model.getAsteroids());
  }

}



$(document).ready( function() {
  controller.init(10);
})
