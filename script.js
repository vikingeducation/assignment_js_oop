CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 600;
//var ASTEROIDS = ASTEROIDS || {}

model = {

  init: function(num) {
    this.asteroids = model.buildAsteroids(num);
  },

  buildAsteroids: function(num) {

    var asteroids = []
    for (var i = 0; i < num; i++) {
      asteroids.push(model.createAsteroid());
    }
    model.Asteroid.prototype.tic = function() {
      this.xPos += this.xVel;
      this.yPos += this.yVel;
    }
    return asteroids
  },

  getVelocityDir: function() {
    var velNum = Math.floor(Math.random() * 2);
    if (velNum === 1) {
      return 1;
    } else {
      return -1;
    }
  },

  createAsteroid: function() {
    var enterEdge = Math.floor(Math.random() * 4)

      var velocityDir = model.getVelocityDir();

      var xPos, yPos, xVel, yVel;
      // enter top
      if(enterEdge === 0) {
        xPos = Math.floor(Math.random() * CANVAS_WIDTH)
        yPos = 0
        xVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
        yVel = Math.ceil(Math.random() * 5)
      } else if(enterEdge === 1) { // enter right
        xPos = CANVAS_WIDTH
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.ceil(Math.random() * 5) * -1
        yVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
      } else if(enterEdge === 2) { // enter bottom
        xPos = Math.floor(Math.random() * CANVAS_WIDTH)
        yPos = CANVAS_HEIGHT
        xVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
        yVel = Math.ceil(Math.random() * 5) * -1
      } else { // enter left
        xPos = 0
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.ceil(Math.random() * 5)
        yVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
      }

      return new model.Asteroid(xPos,yPos,xVel,yVel);

  },

  Asteroid: function(xPos, yPos, xVel, yVel) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
  },

  updateAsteroids: function() {
    var updatedAsteroids = []
    for (var a in model.asteroids) {
      var asteroid = model.asteroids[a];
      if (asteroid.xPos >= 0 && asteroid.xPos <= 800 && asteroid.yPos >= 0 && asteroid.yPos <= 600) {
        updatedAsteroids.push(asteroid);
      }
    }
    var toBuild = model.asteroids.length - updatedAsteroids.length;
    for (var i = 0; i < toBuild; i++) {
      updatedAsteroids.push(model.createAsteroid())
    }
    model.asteroids = updatedAsteroids;
  },

  moveAsteroids: function() {
    model.updateAsteroids();
    for(var a in model.asteroids){
      model.asteroids[a].tic()
    }
  }

};

controller = {

  init: function(){
    this.play
  },

  play: function() {
    model.init(10)

    view.render(model.asteroids)
    setInterval(function() {
      model.moveAsteroids()
      view.render(model.asteroids)}, 100);
  }


};

view = {
  render: function(asteroids) {
    var $canvas = $('#canvas');
    $canvas.empty();
    for (var asteroid in asteroids) {
      $canvas.append('<div></div>')
      $('div').last().css('top', asteroids[asteroid].yPos)
                     .css('left', asteroids[asteroid].xPos)
                     .addClass('asteroid');
    }
  }
};

$(document).ready(controller.play());