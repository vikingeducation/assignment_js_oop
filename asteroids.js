//var ASTEROIDS = ASTEROIDS || {};

var model = {

  init: function(width, height, asteroidCount) {
    model.setCanvasDimensions(width, height);

    model.player = new model.Player();
    model.setPlayerMethods();

    for (var i = 0; i < asteroidCount; i++) {
      var asteroid = new model.Asteroid(model.asteroidAttributes());
    };
    model.setAsteroidMethods();
  },

  player: null,
  asteroids: [],
  nextAsteroidID: 0,


  setCanvasDimensions: function(width, height) {
    model.width = width;
    model.height = height;
  },


  Player: function() {
    this.x = Math.floor(model.width / 2);
    this.y = Math.floor(model.height / 2);
    this.velocityX = 0;
    this.velocityY = 0;
    this.heading = 0;
  },


  Asteroid: function(asteroidAttributes) {
    this.id = model.nextAsteroidID;
    model.nextAsteroidID++;

    this.x = asteroidAttributes.x;
    this.y = asteroidAttributes.y;
    this.velocityX = asteroidAttributes.velocityX;
    this.velocityY = asteroidAttributes.velocityY;
    this.radius = asteroidAttributes.radius;
    this.destroyFlag = false;
    model.asteroids.push(this);
  },


  setPlayerMethods: function() {
    model.Player.prototype.turnLeft = function() {
      model.player.heading--;
      console.log(model.player.heading);
    };
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
      var index = model.asteroids.indexOf(this);
      delete model.asteroids[index];

      // spawn little guys
      if (this.radius > 12) {
        this.spawnChildren();
      };
    };


    model.Asteroid.prototype.spawnChildren = function() {
      var spawns = 1 + Math.floor(this.radius / 10);
      var spawnSize = Math.floor(this.radius / spawns);
      var offsets = [[-1,-1], [1,1], [-1,1], [1,-1]];
      for (var i = 0; i < spawns; i++) {
        var newRadius = spawnSize + model.randInt(-2, 2);
        var newX = this.x + newRadius * offsets[i][0];
        var newY = this.y + newRadius * offsets[i][1];
        var newVelX = offsets[i][0] * model.randInt(0, 2);
        var newVelY = offsets[i][1] * model.randInt(0, 2);
        new model.Asteroid(model.asteroidAttributes(newX, newY, newVelX, newVelY, newRadius));
      };
    };
  },


  asteroidAttributes: function(x, y, velX, velY, radius) {
    var attributes = {
      id: model.asteroids.length,
      x: (x) ? x : model.randInt(0, model.width),
      y: (y) ? y : model.randInt(0, model.height),
      velocityX: (velX) ? velX : model.randInt(-2,2),
      velocityY: (velY) ? velY : model.randInt(-2,2),
      radius: (radius) ? radius : model.randInt(10,30)
    };
    return attributes;
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


  userInput: function() {
    switch(event.which) {
      case 37:
        model.player.turnLeft();
        //turn left;
        break;
      case 39:
        //turn right;
        break;
      case 38:
        //accel;
        break;
    };
  },


  getPlayer: function() {
    return model.player;
  },


  getAsteroids: function() {
    return model.asteroids;
  },


  randInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}




var view = {

  init: function(width, height, player, asteroids) {
    view.$canvas = $('#playarea');
    view.context = view.$canvas[0].getContext('2d');
    view.setCanvasDimensions(width, height);
    view.renderTic(player, asteroids);
    $('.play-button').on('click', controller.start)
  },


  setCanvasDimensions: function(width, height) {
    view.$canvas.attr('width', width + 'px');
    view.$canvas.attr('height', height + 'px');
  },


  renderTic: function(player, asteroids) {
    view.context.clearRect(0, 0, view.$canvas.width(), view.$canvas.height());
    view.renderPlayer(player);
    $.each(asteroids, view.renderAsteroid);
  },


  renderPlayer: function(player) {
    view.context.beginPath();
    view.context.moveTo(player.x, player.y - 15);
    view.context.lineTo(player.x - 10, player.y + 15);
    view.context.lineTo(player.x + 10, player.y + 15);
    view.context.closePath();
    view.context.rotate(player.heading * Math.PI / 180);
    view.context.strokeStyle = "#000";
    view.context.stroke();
  },


  renderAsteroid: function(index, asteroid) {
    view.context.beginPath();
    view.context.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2, false);
    view.context.closePath();
    view.context.strokeStyle = "#000";
    view.context.stroke();
  },


  activateControls: function() {
    $(window).on('keydown', model.userInput);
  }


}



var controller = {

  init: function(width, height, asteroidCount) {
    model.init(width, height, asteroidCount);
    view.init(width, height, model.getPlayer(), model.getAsteroids());
  },


  start: function() {
    $('button').attr('disabled', true).off('click');
    view.activateControls();
    controller.interval = setInterval(controller.tic, 35);
  },


  tic: function() {
    model.tic();
    view.renderTic(model.getPlayer(), model.getAsteroids());
  }

}



$(document).ready( function() {
  controller.init(640, 480, 10);
})
