//var ASTEROIDS = ASTEROIDS || {};

var model = {

  init: function(asteroidCount) {
    for (var i = 0; i < asteroidCount; i++) {
      var asteroid = new model.Asteroid(model.randomAttributes());
    };
    model.setAsteroidMethods();
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


  setAsteroidMethods: function() {

    model.Asteroid.prototype.tic = function() {
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.wrapX();
      this.wrapY();
    };

    model.Asteroid.prototype.wrapX = function() {
      var offscreenRight = (this.x > view.$canvas.width() + (2 * this.radius));
      var movingRight = (this.velocityX > 0);
      var offscreenLeft = (this.x < (-2 * this.radius) );
      var movingLeft = (this.velocityX < 0);

      if (offscreenRight && movingRight) {
        this.wrapToLeft();
      }
      else if (offscreenLeft && movingLeft) {
        this.wrapToRight();
      };
    };

    model.Asteroid.prototype.wrapY = function() {
      var offscreenBottom = (this.y > view.$canvas.height() + (2 * this.radius));
      var movingDown = (this.velocityY > 0);
      var offscreenTop = (this.y < (-2 * this.radius) );
      var movingUp = (this.velocityY < 0);

      if (offscreenBottom && movingDown) {
        this.wrapToTop();
      }
      else if (offscreenTop && movingUp) {
        this.wrapToBottom();
      };
    };

    model.Asteroid.prototype.wrapToLeft = function() {
      this.x = -2 * this.radius;
    };

    model.Asteroid.prototype.wrapToRight = function() {
      this.x = view.$canvas.width() + (2 * this.radius);
    };

    model.Asteroid.prototype.wrapToTop = function() {
      this.y = -2 * this.radius;
    };

    model.Asteroid.prototype.wrapToBottom = function() {
      this.y = view.$canvas.height() + (2 * this.radius);
    };

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
    view.$canvas = $('#playarea');
    view.context = view.$canvas[0].getContext('2d');
    view.renderTic(asteroids);
    $('.play-button').on('click', controller.start)
  },


  renderTic: function(asteroids) {
    view. context.clearRect(0, 0, view.$canvas.width(), view.$canvas.height());
    $.each(asteroids, view.renderAsteroid);
  },


  renderAsteroid: function(index, asteroid) {
    view.context.beginPath();
    view.context.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2, false);
    view.context.closePath();
    view.context.strokeStyle = "#000";
    view.context.stroke();
  },


}



var controller = {

  init: function(asteroidCount) {
    model.init(asteroidCount);
    view.init(model.getAsteroids());
  },

  start: function() {
    $('button').attr('disabled', true).off('click');
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
