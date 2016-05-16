'use strict;'

function ShipModel(canvas){
  this.centerX = 250;
  this.centerY = 250;
  this.radius = 10;
  // Degrees with "north" equal to 0
  this.direction = 270;
  this.thrust = 0;
  this.setPositions();
}

ShipModel.prototype.tic = function(){
  this.resetCoords();

  this.centerX += this.xVelocity;
  this.centerY += this.yVelocity;

  if (this.thrust !== 0){
    this.thrust -= 1;
  }
};

ShipModel.prototype.resetCoords = function(){
  if (this.centerX > 500) {
    this.centerX  = 0;
  }

  if (this.centerY > 500) {
    this.centerY = 0;
  }

  if (this.centerX < 0) {
    this.centerX = 500;
  }


  if (this.centerY < 0) {
    this.centerY = 500;
  }
};

ShipModel.prototype.controlShip = function(event){
  event.preventDefault();
  var ship = event.data.ship;

  if (event.keyCode === 39 || event.keyCode === 75){
    // right
    ship.direction += 20;
  } else if (event.keyCode === 37 || event.keyCode === 74){
    // left
    ship.direction -= 20;
  } else if (event.keyCode === 38 || event.keyCode === 73){
    // up
    ship.thrust += 2;
  }

  // Normalize to less than 360 degrees
  ship.direction = (ship.direction % 360);

  ship.setPositions();
};

ShipModel.prototype.setPositions = function(){
  var noseTheta = getTheta(this.direction);
  var starboardTheta = getTheta(this.direction + 150);
  var portTheta = getTheta(this.direction + 210);

  this.noseX = arcX(this.centerX, this.radius, noseTheta);
  this.noseY = arcY(this.centerY, this.radius, noseTheta);

  this.starboardX = arcX(this.centerX, this.radius, starboardTheta);
  this.starboardY = arcY(this.centerY, this.radius, starboardTheta);

  this.portX = arcX(this.centerX, this.radius, portTheta);
  this.portY = arcY(this.centerY, this.radius, portTheta);
};
