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
        xVel = Math.floor(Math.random() * 5) * velocityDir;
        yVel = Math.floor(Math.random() * 5)
      } else if(enterEdge === 1) { // enter right
        xPos = CANVAS_WIDTH
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.floor(Math.random() * 5) * -1
        yVel = Math.floor(Math.random() * 5) * velocityDir;
      } else if(enterEdge === 2) { // enter bottom
        xPos = Math.floor(Math.random() * CANVAS_WIDTH)
        yPos = CANVAS_HEIGHT
        xVel = Math.floor(Math.random() * 5) * velocityDir;
        yVel = Math.floor(Math.random() * 5) * -1
      } else { // enter left
        xPos = 0
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.floor(Math.random() * 5)
        yVel = Math.floor(Math.random() * 5) * velocityDir;
      }

      return new model.Asteroid(xPos,yPos,xVel,yVel);

  },

  Asteroid: function(xPos, yPos, xVel, yVel) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
  },

  moveAsteroids: function() {
        console.log(model.asteroids)

    for(var a in model.asteroids){
      console.log(a)

      model.asteroids[a].tic()
    }
  }

};

controller = {

  init: function(){
    this.play
  },

  play: function() {
    model.init(5)

    view.render(model.asteroids)
    setInterval(function() {
      model.moveAsteroids()
      view.render(model.asteroids)}, 1000);
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