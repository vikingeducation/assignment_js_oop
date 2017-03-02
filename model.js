  // "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.MODEL = {};

// shortcut to access MODEL name-subspace
var model = ASTEROIDS.MODEL;

// game
model.miliseconds = 45;
model.lives = 3;
model.score = 0;

//canvas
model.canvasWidth = 600;
model.canvasHeight = 600;

// asteroid
model.minVelocity = 4;
model.maxVelocity = 10;
model.minSize = 20;
model.maxSize = 50;
model.allAsteroids = [];

//ship
model.ship = null;

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

    // velocityX = model.randomVelocity();
    // velocityY = model.randomVelocity();
    velocityX = 0
    velocityY = 0

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
  this.color = "black";
  this.size = 20;
  this.speed = 15;
  this.degrees = 0;
  this.angle = model.degreesToRadians(this.degrees);
  this.position = {
    x: model.canvasWidth / 2,
    y: model.canvasHeight / 2
  };
  this.movement = {
    left: false,
    right: false,
    foward: false
  };
  this.torpedoes = [];
};

model.Torpedoe = function(){
  this.angle = model.ship.angle;
  this.degrees = model.ship.degrees;
  this.speed = 20;
  this.position = {
    x: model.ship.position.x,
    y: model.ship.position.y
  };
  this.velocity = {
    x: Math.cos(this.angle),
    y: Math.sin(this.angle)
  };

  this.color = "red";
  this.size = 5;
  this.lifeSpan = 300;
};

model.Torpedoe.prototype.tic = function(){
  // console.log(this)
  // this.position.x += this.speed * Math.cos((this.degrees + 270)  * Math.PI / 180);
  // this.position.y += this.speed * Math.sin((this.degrees + 270) * Math.PI / 180);
  this.position.x += this.velocity.x + this.speed;
  this.position.y += this.velocity.y + this.speed;
  // this.lifeSpan--;
};

model.updateTorpedoes = function(){
  model.ship.torpedoes.forEach(function(torpedoe){
    torpedoe.tic();
  })
};

model.SpaceShip.prototype.fireTorpedoe = function(){
  console.log("Mr. Worf, fire Torpedoe");
  var torpedoe = new model.Torpedoe();
  model.ship.torpedoes.push(torpedoe);
};

model.SpaceShip.prototype.increaseClockWise = function(){
  console.log("Turn towards Stern");
  if (this.degrees >= 360) {
    this.degrees = 0;
  }
  this.degrees += 12;
  this.angle = model.degreesToRadians(this.degrees)
};

model.SpaceShip.prototype.decreaseClockWise = function(){
  console.log("Turn towards Port");
  if (this.degrees <= 0) {
    this.degrees = 360;
  }
  this.degrees -= 12;
  this.angle = model.degreesToRadians(this.degrees)
};

model.SpaceShip.prototype.propelForward = function(){
  console.log("Engage");
  this.position.x += this.speed * Math.cos((this.degrees + 270)  * Math.PI / 180);
  this.position.y += this.speed * Math.sin((this.degrees + 270) * Math.PI / 180);
};


model.SpaceShip.prototype.moveShip = function(keyCode){
  if (this.movement.left) {
    model.ship.decreaseClockWise();
  }
  if (this.movement.right) {
    model.ship.increaseClockWise();
  }
  if (this.movement.forward) {
    model.ship.propelForward();
  }
  // switch(keyCode){
  //  //left key arrow
  //  case 37:
  //   this.movement.left = true;
  //   // model.ship.decreaseClockWise();
  //   break;
  //
  //  //right key arrow
  //  case 39:
  //   this.movement.right = true;
  //   // model.ship.increaseClockWise();
  //   break;
  //
  //  //up key arrow
  //  case 38:
  //     this.forward = true;
  //    model.ship.propelForward();
  //    break;
  //
  //  //spacebar - Fire Torpedoes!
  //  case 32:
  //    model.ship.fireTorpedoes();
  //    break;
  // }
};
