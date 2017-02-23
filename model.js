"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.MODEL = {};

//shortcut to access MODEL name-subspace
var model = ASTEROIDS.MODEL;


model.init = function(astroidQuanitity){
  model.createAsteroids(astroidQuanitity);
};

model.allAsteroids = [];
model.canvasWidth = 600;
model.canvasHeight = 600;

model.randomCoord = function(){
  var minPixelValue = 0,
    maxPixelValue = model.canvasWidth;
    
  return Math.floor(Math.random() * (maxPixelValue - minPixelValue + 1) + minPixelValue);  
};

model.randomVelocity = function(){
  var minimumValue = 4,
    maximumValue = 20;
    
  return Math.floor(Math.random() * (maximumValue - minimumValue + 1) + minimumValue);
};

model.randomSize = function(){
  var minimumSize = 20,
      maximumSize = 50;

  return Math.floor(Math.random() * (maximumSize - minimumSize + 1) + minimumSize);
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

  for (var i = 0; i <= amount; i++) {
    size = 20;
    x = model.randomCoord();
    y = model.randomCoord();
    velocityX = model.randomVelocity();
    velocityY = model.randomVelocity();

    var currentAsteroid = new ASTEROIDS.MODEL.Asteroid(size, x, y, velocityX, velocityY);
    model.allAsteroids.push(currentAsteroid);
  }
};

model.updateAsteroids = function(){
  model.allAsteroids.forEach(function(asteroid){
    asteroid.tic();
  })
};