"use strict";

var ASTEROIDS = ASTEROIDS || {};
var model = ASTEROIDS.model = {};

model.randomCoord = function(max) {
  return Math.random() * max;
};
model.randomVelocity = function(max) {
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  return Math.random() * plusOrMinus * max;
};

model.boardSize = {
  top: 0,
  right: 600,
  bottom: 500,
  left: 0
};

model.fps = 60;
model.asteroidMaxSize = 50;
model.maxSpeed = model.boardSize.bottom / model.fps / 5;

model.Asteroid = function() {
  this.coords = {
    x: model.randomCoord(model.boardSize.right),
    y: model.randomCoord(model.boardSize.bottom)
  };
  this.vel = {
    x: model.randomVelocity(model.maxSpeed),
    y: model.randomVelocity(model.maxSpeed)
  };
  this.radius = model.randomCoord(model.asteroidMaxSize);
  model.asteroids.push(this);
};

model.Asteroid.prototype.tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;
};

model.asteroids = [];

model.tic = function() {
  for (var i = 0; i < model.asteroids.length; i++) {
    model.asteroids[i].tic();
  }
};

model.init = function() {
  new model.Asteroid();
  new model.Asteroid();
  new model.Asteroid();
};

model.benchmark = function(times) {
  var startTime = new Date();
  for (var i = 0; i < times; i++) {
    new model.Asteroid();
  }
  var afterAsteroidTime = new Date();
  for (var j = 0; j < times; j++) {
    model.tic();
  }
  var endTime = new Date();

  var asteroidMsg = `The time to make asteroids: ${afterAsteroidTime - startTime}`;
  var animateMsg = `The time to animate asteroids: ${endTime - startTime}`;
  console.log(asteroidMsg);
  console.log(animateMsg);
};
