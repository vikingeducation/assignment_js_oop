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

APP.buildAsteroid = function () {
  var randX = Math.floor(Math.random() * 300) + 1;
  var randY = Math.floor(Math.random() * 200) + 1;
  var randVelocityX = Math.floor(Math.random() * 3) + 1;
  var randVelocityY = Math.floor(Math.random() * 3) + 1;
  return new APP.Asteroid(randX, randY, randVelocityX, randVelocityY);
};
