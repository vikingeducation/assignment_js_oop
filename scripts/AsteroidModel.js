'use strict;'

function AsteroidModel(size, x, y, direction){
  this.init(size, x, y, direction);
}

// Asteroid movement
AsteroidModel.prototype.tic = function(){
  this.resetCoords();

  var theta = getTheta(this.direction);
  this.x = arcX(this.x, this.velocity, theta);
  this.y = arcY(this.y, this.velocity, theta);

};

// Detect collisions with photons and ship
AsteroidModel.prototype.detectCollision = function(){
  var collision = false;

  for (var i = 0; i < controller.photons.length; i++){
    var distanceX = this.x - controller.photons[i].x;
    var distanceY = this.y - controller.photons[i].y;
    var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

    // Radius of all photons = 1
    if (distance <= this.radius + 1) {
      collision = true;
      console.log("Strike!");
      break;
    }
  }

  return collision;
};

AsteroidModel.prototype.makeChildren = function(){
  if (this.radius > 16){
    // Make 4 children
    var newSize = this.radius / 4
    controller.asteroids.push(new AsteroidModel(newSize, this.x, this.y, this.direction + 45));
    controller.asteroids.push(new AsteroidModel(newSize, this.x, this.y, this.direction + 135));
    controller.asteroids.push(new AsteroidModel(newSize, this.x, this.y, this.direction + 225));
    controller.asteroids.push(new AsteroidModel(newSize, this.x, this.y, this.direction + 315));
  }
};

// When asteroid goes off-screen, wrap to other side
AsteroidModel.prototype.resetCoords = function(){
  if (this.x > 500) {
    this.x  = 0;
  } else if (this.x < 0) {
    this.x = 500;
  }

  if (this.y > 500) {
    this.y = 0;
  } else if (this.y < 0) {
    this.y = 500;
  }
};

AsteroidModel.prototype.init = function(size, x, y, direction){
  this.velocity = (Math.random() * 2) + 0.5;
  this.radius = size || (Math.random() * 20) + 5;
  this.direction = direction || Math.floor(Math.random() * 360);

  if (x) {
    // Created from explosion - Initialize at site of parent
    this.x = x;
    this.y = y;

  } else {
    // Created at game start - Initialize on random edges
    var edges = ['top', 'bottom', 'left', 'right'];
    var startEdge = edges[Math.floor(Math.random() * 3)];
    var startOtherCoord = Math.floor(Math.random() * 500);

    if (startEdge === 'top'){
      this.x = startOtherCoord;
      this.y = 0;
    } else if (startEdge === 'bottom'){
      this.x = startOtherCoord;
      this.y = 500;
    } else if (startEdge === 'left'){
      this.x = 0;
      this.y = startOtherCoord;
    } else {
      this.x = 500;
      this.y = startOtherCoord;
    }
  }
};
