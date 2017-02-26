  // "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.MODEL = {};

//shortcut to access MODEL name-subspace
var model = ASTEROIDS.MODEL;

model.miliseconds = 200;
model.canvasWidth = 600;
model.canvasHeight = 600;

model.minVelocity = 4;
model.maxVelocity = 20;
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

model.SpaceShip = function(x, y){
  this.coordX = x;
  this.coordY = y;
};
