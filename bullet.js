var APP = APP || {};

APP.Bullet = function (x,y,velocityX,velocityY) {
  this.coordX = x;
  this.coordY = y;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
};

APP.Bullet.prototype.travel = function () {
  this.coordX += this.velocityX;
  this.coordY += this.velocityY;
};
