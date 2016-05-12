'use strict;'

function AsteroidModel(){
  this.init();
}

// Asteroid methods
AsteroidModel.prototype.tic = function(){
  console.log('Moving from ' + this.xLocation + ', ' + this.yLocation);
  this.xLocation += this.xVelocity;
  this.yLocation += this.yVelocity;
  console.log('...to ' + this.xLocation + ', ' + this.yLocation);
};

AsteroidModel.prototype.init = function(){
  var edges = ['top', 'bottom', 'left', 'right'];
  var startEdge = edges[Math.floor(Math.random() * 3)];
  var startOtherCoord = Math.floor(Math.random() * 500);
  var randomDirection = [-1, 1][Math.floor(Math.random() * 2)];
  this.xVelocity = (Math.random() * 2) + 0.5;
  this.yVelocity = (Math.random() * 2) + 0.5;

  if (startEdge === 'top'){
    this.xLocation = startOtherCoord;
    this.yLocation = 0;
    this.xVelocity *= randomDirection;
  } else if (startEdge === 'bottom'){
    this.xLocation = startOtherCoord;
    this.yLocation = 500;
    this.xVelocity *= randomDirection;
    this.yVelocity *= -1;
  } else if (startEdge === 'left'){
    this.xLocation = 0;
    this.yLocation = startOtherCoord;
    this.yVelocity *= randomDirection;
  } else {
    this.xLocation = 500;
    this.yLocation = startOtherCoord;
    this.xVelocity *= -1;
    this.yVelocity *= randomDirection;
  }
};

// Asteroid subclass
function Asteroid(){}

// Asteroid.prototype = Object.create(AsteroidModel.prototype);

// instantiate in the controller?
