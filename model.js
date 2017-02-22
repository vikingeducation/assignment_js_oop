"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.MODEL = {};

//shortcut to access model subspace
var model = ASTEROIDS.MODEL;


model.init = function(){
  model.createAsteroids(3);
};

model.allAsteroids = [];
model.canvasWidth = 600;
model.canvasHeight = 600;

model.randomCoord = function(){
  var maxPixelValue = model.canvasWidth;
  return Math.floor(Math.random() * maxPixelValue);
};

model.randomVelocity = function(){
  var maxVelocityValue = 20;
  return Math.floor(Math.random() * maxVelocityValue);
};

model.randomSize = function(){
  var maxVelocityValue = 20;
  return Math.floor(Math.random() * maxVelocityValue);
};

model.Asteroid = function(size, x, y, velocityX, velocityY){
  //sizes: 20, 30, 40
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
