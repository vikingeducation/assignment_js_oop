'use strict;'

function ShipModel(canvas){
  this.centerX = 250;
  this.centerY = 250;
  // Degrees with "north" equal to 0
  this.direction = 270;
  this.setPositions();
}

ShipModel.prototype.controlShip = function(event){
  event.preventDefault();
  var ship = event.data.ship;

  if (event.keyCode === 39 || event.keyCode === 75){
    // right
    ship.direction += 20;
  } else if (event.keyCode === 37 || event.keyCode === 74){
    // left
    ship.direction -= 20;
  }

  // Normalize to less than 360 degrees
  ship.direction = (ship.direction % 360);

  ship.setPositions();
};

ShipModel.prototype.setPositions = function(){
  var noseTheta = getTheta(this.direction);
  var starboardTheta = getTheta(this.direction + 150);
  var portTheta = getTheta(this.direction + 210);

  this.noseX = this.arcX(noseTheta);
  this.noseY = this.arcY(noseTheta);

  this.starboardX = this.arcX(starboardTheta);
  this.starboardY = this.arcY(starboardTheta);

  this.portX = this.arcX(portTheta);
  this.portY = this.arcY(portTheta);
};

// For a points 1 and 2 on an arc, with point 1's coords known and the angle between them known, what is the x coord of point 2
ShipModel.prototype.arcX = function(angle){
  return this.centerX + 10 * Math.cos(angle);
};

// For a points 1 and 2 on an arc, with point 1's coords known and the angle between them known, what is the y coord of point 2
ShipModel.prototype.arcY = function(angle){
  return this.centerY + 10 * Math.sin(angle);
};

function getTheta(angle){
  return (angle * 2 * Math.PI) / 360;
};
