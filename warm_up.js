var APP = APP || {};

APP.Asteroid = function Asteroid (x,y,velocityX,velocityY) {
  this.coordX = x;
  this.coordY = y;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
};

APP.Asteroid.prototype.tic = function() {
  this.coordX += this.velocityX;
  this.coordY += this.velocityY;
};


var asteroid = new APP.Asteroid(2,2,1,1);

APP.buildManyAsteroids = function (numOfAsteroids) {
  var asteroids = [];
  for (var i=0; i < numOfAsteroids; i++) {
    var randomX = Math.floor((Math.random() * (5 - 1) + 1));
    var randomY = Math.
  }
};
