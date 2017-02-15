"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.MODEL = {};
var model = ASTEROIDS.MODEL;

model.init = function(){

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

model.allAstroids = [];

model.createAstroids = function(amount){
  var size, x, y, xVelocity, yVelocity;

  for (var i = 0; i <= amount; i++) {
    new Astroid();
  }
};
