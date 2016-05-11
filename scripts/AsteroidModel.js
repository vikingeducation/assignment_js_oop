'use strict;'

function AsteroidModel(){
  this.xLocation = 0;
  this.yLocation = 0;
  this.xVelocity = 1;
  this.yVelocity = 1;
}

// Asteroid methods
AsteroidModel.prototype.tic = function(){
  console.log('Moving from ' + this.xLocation + ', ' + this.yLocation);
  this.xLocation += this.xVelocity;
  this.yLocation += this.yVelocity;
  console.log('...to ' + this.xLocation + ', ' + this.yLocation);
};

// Asteroid subclass
function Asteroid(){}

// Asteroid.prototype = Object.create(AsteroidModel.prototype);

// instantiate in the controller?
