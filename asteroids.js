//var ASTEROIDS = ASTEROIDS || {};

var model = {

  init: function(width, height, asteroidCount) {
    model.setCanvasDimensions(width, height);
    for (var i = 0; i < asteroidCount; i++) {
      var asteroid = new model.Asteroid(model.startingAttributes());
    };
    model.setAsteroidMethods();
  },


  asteroids: [],


  setCanvasDimensions: function(width, height) {
    this.width = width;
    this.height = height;
  },


  Asteroid: function(startingAttributes) {
    this.id = startingAttributes.id;
    this.x = startingAttributes.x;
    this.y = startingAttributes.y;
    this.velocityX = startingAttributes.velocityX;
    this.velocityY = startingAttributes.velocityY;
    this.radius = startingAttributes.radius;
    this.destroyFlag = false;
    model.asteroids.push(this);
  },


  setAsteroidMethods: function() {

    model.Asteroid.prototype.tic = function() {
      if (this.destroyFlag) {
        this.destroy()
      }
      else {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.wrapX();
        this.wrapY();
      };
    };


    model.Asteroid.prototype.wrapX = function() {
      var offscreenRight = (this.x > model.width + (2 * this.radius));
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
      var offscreenBottom = (this.y > model.height+ (2 * this.radius));
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
      this.x = model.width + (2 * this.radius);
    };

    model.Asteroid.prototype.wrapToTop = function() {
      this.y = -2 * this.radius;
    };

    model.Asteroid.prototype.wrapToBottom = function() {
      this.y = model.height + (2 * this.radius);
    };


    model.Asteroid.prototype.asteroidCollisions = function() {
      var thisAsteroid = this;
      var laterAsteroids = $(model.asteroids).map(function(index, asteroid) {
        if (asteroid.id > thisAsteroid.id) {
          return asteroid;
        };
      });

      $.each(laterAsteroids, function(index, laterAsteroid) {
        if (thisAsteroid.isCollidingWith(laterAsteroid)) {
          thisAsteroid.destroyFlag = true;
          laterAsteroid.destroyFlag = true;
        };
      });
    };


    model.Asteroid.prototype.isCollidingWith = function(other) {
      var dx = this.x - other.x;
      var dy = this.y - other.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius + other.radius) {
        return true;
      };
    };


    model.Asteroid.prototype.destroy = function() {
      if (this.radius > 15) {
        // make little asteroids
      };
      var index = model.asteroids.indexOf(this);
      delete model.asteroids[index];
    };
  },


  startingAttributes: function() {
    var attributes = {
      id: model.asteroids.length,
      x: model.randInt(0, model.width),
      y: model.randInt(0, model.height),
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
    model.checkCollisions();

    $.each(model.asteroids, function(i, asteroid) {
      asteroid.tic();
    });

    model.ticCleanUp();
  },


  ticCleanUp: function() {
    model.asteroids = $.map(model.asteroids, function(asteroid) {
      if (asteroid) {
        return asteroid;
      };
    });
  },


  checkCollisions: function() {
    $.each(model.asteroids, function(i, asteroid) {
      asteroid.asteroidCollisions();
    });
  },


  randInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}




var view = {

  init: function(width, height, asteroids) {
    view.$canvas = $('#playarea');
    view.context = view.$canvas[0].getContext('2d');
    view.setCanvasDimensions(width, height);
    view.renderTic(asteroids);
    $('.play-button').on('click', controller.start)
  },


  setCanvasDimensions: function(width, height) {
    view.$canvas.attr('width', width + 'px');
    view.$canvas.attr('height', height + 'px');
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

  init: function(width, height, asteroidCount) {
    model.init(width, height, asteroidCount);
    view.init(width, height, model.getAsteroids());
  },


  start: function() {
    $('button').attr('disabled', true).off('click');
    controller.interval = setInterval(controller.tic, 35);
  },


  tic: function() {
    model.tic();
    view.renderTic(model.getAsteroids());
  }

}



$(document).ready( function() {
  controller.init(640, 480, 10);
})
