'use strict;'

function ShipModel(canvas){
  this.centerX = 250;
  this.centerY = 250;
  this.radius = 10;
  // Degrees with "north" equal to 0
  this.direction = 0;
  this.velocity = 0;
  this.setPositions();
}

ShipModel.prototype.tic = function(){
  // console.log(this.centerX + ', ' + this.centerY);

  this.setPositions();

  if (this.velocity !== 0){
    this.velocity -= 0.1;
  }
};

// When ship goes off-screen, wrap to other side
ShipModel.prototype.resetCoords = function(){
  if (this.centerX >= 500) {
    this.centerX = 0;
  }

  if (this.centerY >= 500) {
    this.centerY = 0;
  }

  if (this.centerX <= 0) {
    this.centerX = 500;
  }

  if (this.centerY <= 0) {
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
    ship.velocity += 2;
  }

  // Normalize to less than 360 degrees
  ship.direction = (ship.direction % 360);

  ship.setPositions();
};

ShipModel.prototype.setPositions = function(){
  this.resetCoords();
  // console.log(this.centerX);
  var noseTheta = getTheta(this.direction);
  var starboardTheta = getTheta(this.direction + 150);
  var portTheta = getTheta(this.direction + 210);

  this.centerX = arcX(this.centerX, this.velocity, noseTheta);
  this.centerY = arcY(this.centerY, this.velocity, noseTheta);

  this.noseX = arcX(this.centerX, this.radius, noseTheta);
  this.noseY = arcY(this.centerY, this.radius, noseTheta);

  this.starboardX = arcX(this.centerX, this.radius, starboardTheta);
  this.starboardY = arcY(this.centerY, this.radius, starboardTheta);

  this.portX = arcX(this.centerX, this.radius, portTheta);
  this.portY = arcY(this.centerY, this.radius, portTheta);
};
