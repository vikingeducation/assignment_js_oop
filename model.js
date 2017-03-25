  // "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.MODEL = {};

// shortcut to access MODEL name-subspace
var Model = ASTEROIDS.MODEL;

// game
Model.gameOver = false;
Model.miliseconds = 45;
Model.lives = 1;
Model.score = 0;

//canvas
Model.canvasWidth = 600;
Model.canvasHeight = 600;

// asteroid
Model.minVelocity = 1;
Model.maxVelocity = 2;
Model.minSize = 15;
Model.maxSize = 50;
Model.allAsteroids = [];

//ship
Model.ship = null;

Model.init = function(astroidQuanitity){
  Model.createAsteroids(astroidQuanitity);
  Model.ship = new Model.SpaceShip();
};

Model.degreesToRadians = function(degrees){
  var radians = degrees * (Math.PI / 180);
  return radians;
};

Model.getRandom = function(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
};

Model.randomCoord = function(){
  var minPixel = 0,
    maxPixel = Model.canvasWidth;
  return Model.getRandom(minPixel, maxPixel)
};

Model.randomVelocity = function(){
  var minVelocity = Model.minVelocity,
    maxVelocity = Model.maxVelocity,
    flagged = Model.fiftyFifty(),
    velocity = Model.getRandom(minVelocity, maxVelocity);

    if (flagged) {
      velocity = Model.reverseCharge(velocity);
    }
    return velocity;
};

Model.randomSize = function(){
  var minSize = Model.minSize,
      maxSize = Model.maxSize;
  return Model.getRandom(minSize, maxSize)
};

//true or false "coin flip"
Model.fiftyFifty = function(){
  return !!(Model.getRandom(0,1))
};

//convert positive integer to negative, and vice versa
Model.reverseCharge = function(n){
  return n * -1;
};

Model.Asteroid = function(size, x, y, velocityX, velocityY){
  this.size = size;
  this.coordX = x;
  this.coordY = y;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
};

Model.Asteroid.prototype.tic = function(){
  var xVelocity = this.velocityX,
      yVelocity = this.velocityY;

  //reverse back for when out-of-bounds
  if ((Math.abs(this.coordX) > Model.canvasWidth + 20) ||
  (Math.abs(this.coordY) > Model.canvasWidth + 20)) {
    this.velocityX = Model.reverseCharge(xVelocity);
    this.velocityY = Model.reverseCharge(yVelocity);
  }

  this.coordX += this.velocityX;
  this.coordY += this.velocityY;
};

//create 2 smaller asteroids & adjust/update the original
Model.Asteroid.prototype.triSplit = function(){
  var newSize = this.size / 3,
      x = this.coordX,
      y = this.coordY;
  Model.createAsteroids(2, x, y, newSize);
  this.size = newSize;
  this.velocityX = Model.randomVelocity();
  this.velocityY = Model.randomVelocity();
};

Model.createAsteroids = function(amount, customX, customY, customSize){
  for (var i = 0; i < amount; i++) {
    //testing to deletes
    // var size = 5;
    // velocityX = 0
    // velocityY = 0
    var size = customSize || Model.randomSize(),
        x = customX || Model.randomCoord(),
        y = customY || Model.randomCoord(),
        velocityX = Model.randomVelocity(),
        velocityY = Model.randomVelocity();


    var currentAsteroid = new Model.Asteroid(size,
                                             x,
                                             y,
                                             velocityX,
                                             velocityY);
    Model.allAsteroids.push(currentAsteroid);
  }
};

Model.SpaceShip = function(x, y){
  this.color = "black";
  this.size = 20;
  this.speed = 5;
  this.degrees = 0;
  this.angle = Model.degreesToRadians(this.degrees);
  this.position = {
    x: Model.canvasWidth / 2,
    y: Model.canvasHeight / 2
  };
  this.movement = {
    left: false,
    right: false,
    foward: false
  };
  this.torpedoes = [];
};

Model.Torpedoe = function(){
  this.degrees = Model.ship.degrees + 270;
  this.angle = Model.degreesToRadians(this.degrees);
  this.speed = 10;
  this.position = {
    x: Model.ship.position.x,
    y: Model.ship.position.y
  };
  this.velocity = {
    x: Math.cos(this.angle),
    y: Math.sin(this.angle)
  };

  this.color = "red";
  this.size = 5;
  this.lifeSpan = 50;
};

Model.Torpedoe.prototype.tic = function(){
  var xVelocity = this.velocity.x,
      yVelocity = this.velocity.y;

  //reverse back for when out-of-bounds
  if ((Math.abs(this.position.x) > Model.canvasWidth + 20) ||
  (Math.abs(this.position.y) > Model.canvasWidth + 20)) {
    this.velocity.x = Model.reverseCharge(xVelocity);
    this.velocity.y = Model.reverseCharge(yVelocity);
  }

  this.position.x += xVelocity * this.speed;
  this.position.y += yVelocity * this.speed;
  this.lifeSpan--;
  if (this.lifeSpan < 0) {
    Model.ship.torpedoes.shift();
  }
};

Model.Asteroid.prototype.checkShipCollision = function(){
  var xDifference, yDifference, offset = Model.ship.size / 2;

  xDifference = Math.abs(Model.ship.position.x - this.coordX) + offset;
  yDifference = Math.abs(Model.ship.position.y - this.coordY) + offset;

  if ((xDifference < (this.size + Model.ship.size)) &&
      (yDifference < (this.size + Model.ship.size))) {
        Model.gameOver = true;
        console.log('SHIP HIT ASTEROID!');
      }
};


Model.Asteroid.prototype.checkTorpedoCollisions = function(asteroidIndex){
  var asteroid = this,
      torpedoes = Model.ship.torpedoes,
      xDifference, yDifference;

  torpedoes.forEach(function(torpedoe, torpedoeIndex){
    xDifference = Math.abs(torpedoe.position.x - asteroid.coordX);
    yDifference = Math.abs(torpedoe.position.y - asteroid.coordY);

    if ((xDifference < (asteroid.size + torpedoe.size)) &&
        (yDifference < (asteroid.size + torpedoe.size))) {
      console.log("HIT");
      if (asteroid.size >= Model.minSize) {
        asteroid.triSplit();
      } else {
        //for when too small to trisplit
        Model.allAsteroids.splice(asteroidIndex, 1)
      }
    }
  });
};

Model.updateTorpedoes = function(){
  Model.ship.torpedoes.forEach(function(torpedoe, torpedoeIndex){
    torpedoe.tic();
  });
};

Model.updateAsteroids = function(){
  Model.allAsteroids.forEach(function(asteroid, asteroidIndex){
    asteroid.tic();
    asteroid.checkTorpedoCollisions(asteroidIndex);
    asteroid.checkShipCollision();
  });
};

Model.updateShip = function(){
  Model.ship.moveShip();
};

Model.updateGame = function(){
  Model.updateAsteroids();
  Model.updateShip();
  Model.updateTorpedoes();
};

Model.SpaceShip.prototype.fireTorpedoe = function(){
  console.log("Mr. Worf, fire Torpedoe cluster!");
  var torpedoe = new Model.Torpedoe();
  Model.ship.torpedoes.push(torpedoe);
};

Model.SpaceShip.prototype.increaseClockWise = function(){
  console.log("Turn towards Stern");
  if (this.degrees >= 360) {
    this.degrees = 0;
  }
  this.degrees += 12;
  this.angle = Model.degreesToRadians(this.degrees)
};

Model.SpaceShip.prototype.decreaseClockWise = function(){
  // console.log("Turn towards Port");
  if (this.degrees <= 0) {
    this.degrees = 360;
  }
  this.degrees -= 12;
  this.angle = Model.degreesToRadians(this.degrees)
};

Model.SpaceShip.prototype.propelForward = function(){
  // console.log("Engage");
  this.position.x += this.speed * Math.cos((this.degrees + 270)  * Math.PI / 180);
  this.position.y += this.speed * Math.sin((this.degrees + 270) * Math.PI / 180);
};

Model.SpaceShip.prototype.moveShip = function(keyCode){
  if (this.movement.left) {
    Model.ship.decreaseClockWise();
  }
  if (this.movement.right) {
    Model.ship.increaseClockWise();
  }
  if (this.movement.forward) {
    Model.ship.propelForward();
  }
};
