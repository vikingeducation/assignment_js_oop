  // "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.MODEL = {};

//shortcut to access MODEL name-subspace
var model = ASTEROIDS.MODEL;

model.miliseconds = 60;
model.canvasWidth = 600;
model.canvasHeight = 600;

model.minVelocity = 4;
model.maxVelocity = 10;
model.minSize = 20;
model.maxSize = 50;

model.allAsteroids = [];
model.ship = null;

model.lives = 3;
model.score = 0;


model.init = function(astroidQuanitity){
  model.createAsteroids(astroidQuanitity);
  model.ship = new model.SpaceShip();
};

model.degreesToRadians = function(degrees){
  return degrees * (Math.PI / 180);
};

model.getRandom = function(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
};

model.randomCoord = function(){
  var minPixel = 0,
    maxPixel = model.canvasWidth;
  return model.getRandom(minPixel, maxPixel)
};

model.randomVelocity = function(){
  var minVelocity = model.minVelocity,
    maxVelocity = model.maxVelocity,
    flagged = model.fiftyFifty(),
    velocity = model.getRandom(minVelocity, maxVelocity);

    if (flagged) {
      velocity = model.reverseCharge(velocity);
    }

    return velocity;
};

model.randomSize = function(){
  var minSize = model.minSize,
      maxSize = model.maxSize;
  return model.getRandom(minSize, maxSize)
};

//true or false "coin flip"
model.fiftyFifty = function(){
  return !!(model.getRandom(0,1))
};

//convert positive integer to negative, and vice versa
model.reverseCharge = function(n){
  return n * -1;
};

model.Asteroid = function(size, x, y, velocityX, velocityY){
  this.size = size;

  this.coordX = x;
  this.coordY = y;

  this.velocityX = velocityX;
  this.velocityY = velocityY;
};

model.Asteroid.prototype.tic = function(){
  this.coordX += this.velocityX;
  this.coordY += this.velocityY;
};


model.createAsteroids = function(amount){
  var size, x, y, velocityX, velocityY;

  for (var i = 0; i < amount; i++) {
    size = model.randomSize();
    x = model.randomCoord();
    y = model.randomCoord();
    velocityX = model.randomVelocity();
    velocityY = model.randomVelocity();



    var currentAsteroid = new model.Asteroid(size,
                                             x,
                                             y,
                                             velocityX,
                                             velocityY);
    model.allAsteroids.push(currentAsteroid);
  }
};

model.updateAsteroids = function(){
  model.allAsteroids.forEach(function(asteroid){
    asteroid.tic();
  })
};

model.updateShip = function(){
  model.ship.moveShip();
};

model.SpaceShip = function(x, y){
  this.size = 30;
  this.degrees = 0;
  this.angle = 0;
  this.color = "black";

  this.position = {
    x: model.canvasWidth / 2,
    y: model.canvasHeight / 2
  };

  this.coordX = x;
  this.coordY = y;
};

// model.SpaceShip.prototype.updateAngle = function(){
//   this.angle++;
// };

model.SpaceShip.prototype.increaseClockWise = function(){
  this.degrees += 4;
  this.angle = model.degreesToRadians(this.degrees)
};

model.SpaceShip.prototype.decreaseClockWise = function(){
  this.degrees -= 4;
  this.angle = model.degreesToRadians(this.degrees)
};

model.SpaceShip.prototype.propelForward = function(){
  // this.angle--;
};


model.SpaceShip.prototype.fireTorpedoes = function(){
  // this.angle--;
};

model.SpaceShip.prototype.moveShip = function(keyCode){
  switch(keyCode){
   //left key arrow
   case 37:
     model.ship.decreaseClockWise();
     break;

   //right key arrow
   case 39:
     model.ship.increaseClockWise();
     break;

   //up key arrow
   case 38:
     model.ship.propelForward();
     break;

   //spacebar - Fire Torpedoes!
   case 32:
     model.ship.fireTorpedoes();
     break;
  }
};
