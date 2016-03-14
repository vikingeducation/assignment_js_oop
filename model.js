var GAME = GAME || {};


GAME.model = {

  asteroids: [],

  init: function(numAsteroids) {
    GAME.model.generateAsteroids(numAsteroids);
  },


  Asteroid: function(xCoord, yCoord, size, xVelocity, yVelocity) {
    this.xCoord = xCoord || GAME.useful.random(10, 990);
    this.yCoord = yCoord || GAME.useful.random(10, 990);
    this.size = size || GAME.useful.random(70,90);
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;

  },

  // question: can you get prototypes to work here?

  // Asteroid.prototype: var tic = function() {
  //   this.xCoord += this.xVelocity;
  //   this.yCoord += this.yVelocity;
  // },

  generateAsteroids: function(numAsteroids) {
    numAsteroids = numAsteroids || 1;
    for (var i = 0; i < numAsteroids; i++) {
      var ast = new GAME.model.Asteroid();
      GAME.model.asteroids.push(ast);
    }
  },



}

GAME.model.Asteroid.prototype.tic = function() {
  this.xCoord += this.xVelocity;
  this.yCoord += this.yVelocity;
}











GAME.useful = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}


