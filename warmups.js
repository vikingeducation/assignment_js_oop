"use strict";

var MYAPP = MYAPP || {};

MYAPP.Asteroid = function Asteroid(options) {
  this.x = options.x;
  this.y = options.y;
  this.xVelocity = options.xVelocity;
  this.yVelocity = options.yVelocity;

};

MYAPP.Asteroid.prototype.tic = function() {
  this.x += this.xVelocity;
  this.y += this.yVelocity;
  console.log('x value is now ' + this.x)
  console.log('y value is now ' + this.y)
};


MYAPP.Asteroid.nonscientificBenchmark = function(number) {
  var start = new Date();
  for(var i = 0; i < number; i ++) {
    var a = new MYAPP.Asteroid({
      x: Math.random(),
      y: Math.random(),
      xVelocity: Math.random(),
      yVelocity: Math.random()
    });
    a.tic();
  }
  var end = new Date();
  console.log('started at' + start); 
  console.log('ended at' + end)
};

MYAPP.Asteroid.scientificBenchmark = function(number) {
  var start = new Date();
  for(var i = 0; i < number; i ++) {
    var a = new MYAPP.Asteroid({
      x: Math.random(),
      y: Math.random(),
      xVelocity: Math.random(),
      yVelocity: Math.random()
    });
    for(var i = 0; i < number; i++) {
      a.tic();
    }
  }
  var end = new Date();
  console.log('started at' + start); 
  console.log('ended at' + end)
};

MYAPP.NewAsteroid = function NewAsteroid(options) {
  this.x = options.x;
  this.y = options.y;
  this.xVelocity = options.xVelocity;
  this.yVelocity = options.yVelocity;
  this.tic = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    console.log('x value is now ' + this.x)
    console.log('y value is now ' + this.y)
  };
};

MYAPP.newUnscientificBenchmark = function(number) {
  var start = new Date();
  for(var i = 0; i < number; i ++) {
    var a = new MYAPP.NewAsteroid({
      x: Math.random(),
      y: Math.random(),
      xVelocity: Math.random(),
      yVelocity: Math.random()
    });
    a.tic();
  }
  var end = new Date();
  console.log('started at' + start); 
  console.log('ended at' + end)
};

MYAPP.newScientificBenchmark = function(number) {
  var start = new Date();
  for(var i = 0; i < number; i ++) {
    var a = new MYAPP.NewAsteroid({
      x: Math.random(),
      y: Math.random(),
      xVelocity: Math.random(),
      yVelocity: Math.random()
    });
    for(var i = 0; i < number; i++) {
      a.tic();
    }
  }
  var end = new Date();
  console.log('started at' + start); 
  console.log('ended at' + end)
};