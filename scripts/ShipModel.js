'use strict;'

function ShipModel(canvas){
  this.x = 250;
  this.y = 250;
  this.radius = 10;

  // Degrees with "north" equal to 0
  this.direction = 0;
  this.velocity = 0;
  this.setPositions();
}

ShipModel.prototype.tic = function(){

  this.setPositions();

  if (this.velocity < 0) {
    this.velocity = 0;
  } else if (this.velocity !== 0){
    this.velocity -= 0.2;
  }
};

// When ship goes off-screen, wrap to other side
ShipModel.prototype.resetCoords = function(){
  if (this.x >= 500) {
    this.x = 0;
  } else if (this.y >= 500) {
    this.y = 0;
  } else if (this.x <= 0) {
    this.x = 500;
  } else if (this.y <= 0) {
    this.y = 500;
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
    ship.velocity += 3;
  } else if (event.keyCode === 32){
    // space bar = fire
    controller.photons.push(new Photon(ship.noseX, ship.noseY, ship.direction, ship.velocity));
  }

  // Normalize to less than 360 degrees
  ship.direction = (ship.direction % 360);

  ship.setPositions();
};

ShipModel.prototype.setPositions = function(){
  this.resetCoords();
  var noseTheta = getTheta(this.direction);
  var starboardTheta = getTheta(this.direction + 150);
  var portTheta = getTheta(this.direction + 210);

  this.x = arcX(this.x, this.velocity, noseTheta);
  this.y = arcY(this.y, this.velocity, noseTheta);

  this.noseX = arcX(this.x, this.radius, noseTheta);
  this.noseY = arcY(this.y, this.radius, noseTheta);

  this.starboardX = arcX(this.x, this.radius, starboardTheta);
  this.starboardY = arcY(this.y, this.radius, starboardTheta);

  this.portX = arcX(this.x, this.radius, portTheta);
  this.portY = arcY(this.y, this.radius, portTheta);
};
