var APP = APP || {};

APP.Asteroid = function Asteroid (x,y,velocityX,velocityY) {
  this.coordX = x;
  this.coordY = y;
  this.velocityX = velocityX || 1;
  this.velocityY = velocityY || 1;
};

APP.Asteroid.prototype.tic = function(width, height) {
  this.coordX += this.velocityX;
  this.coordY += this.velocityY;
  if (this.coordX > width) {
    this.coordX -= width;
  } else if (this.coordX < 0) {
    this.coordX += width;
  }
  if (this.coordY > height) {
    this.coordY -= height;
  } else if (this.coordY < 0) {
    this.coordY += height;
  }
};

APP.buildAsteroid = function () {
  var randX = Math.floor(Math.random() * 300) + 1;
  var randY = Math.floor(Math.random() * 200) + 1;
  var randVelocityX = Math.floor(Math.random() * 3) + 1;
  var randVelocityY = Math.floor(Math.random() * 3) + 1;
  return new APP.Asteroid(randX, randY, randVelocityX, randVelocityY);
};
