CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 600;

Asteroid.prototype.tic = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
}



// a = new Asteroid(0, 0, 1, 1);
// a.tic
model = {

  init: function() {
    this.asteroids = buildAsteroids();
  },

  buildAsteroids: function() {

    var asteroids = []
    for (var i = 0; i < 1000; i++) {
      asteroids.push(createAsteroid());
    }
    return asteroids
  },

  createAsteroid: function() {
    var enterEdge = Math.floor(Math.random() * 4)

      var xPos, yPos, xVel, yVel;
      // enter top
      if(enterEdge === 0) {
        xPos = Math.floor(Math.random() * CANVAS_WIDTH)
        yPos = 0
        xVel = Math.floor(Math.random() * 5)
        yVel = Math.floor(Math.random() * 5)
      } else if(enterEdge === 1) { // enter right
        xPos = CANVAS_WIDTH
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.floor(Math.random() * 5) * -1
        yVel = Math.floor(Math.random() * 5)
      } else if(enterEdge === 2) { // enter bottom
        xPos = Math.floor(Math.random() * CANVAS_WIDTH)
        yPos = CANVAS_HEIGHT
        xVel = Math.floor(Math.random() * 5)
        yVel = Math.floor(Math.random() * 5)  * -1
      } else { // enter left
        xPos = 0
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.floor(Math.random() * 5)
        yVel = Math.floor(Math.random() * 5)
      }

      return new Asteroid(xPos,yPos,xVel,yVel);

  },

  Asteroid: function(xPos, yPos, xVel, yVel) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
  }
}

controller = {
  // play: function() {
  //   setInterval(function(){
  //     a.tic.apply(a);
  //   }, 1000);
  // }


}

view = {
  render: function(asteroids) {

  }
}

$(document).ready(controller.benchmark);