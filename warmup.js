function Asteroid = function(xCoord, yCoord, xVelocity, yVelocity) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
}

Asteroid.prototype.tic = function() {
  this.xCoord += this.xVelocity;
  this.yCoord += this.yVelocity;
}


function AsteroidToo(xCoord, yCoord, xVelocity, yVelocity) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.tic = function() {
    this.xCoord += this.xVelocity;
    this.yCoord += this.yVelocity;    
  }
}