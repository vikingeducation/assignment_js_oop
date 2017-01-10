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

model.boardEdges = {
  top: 0,
  right: 600,
  bottom: 500,
  left: 0
};

model.FPS = 60;
model.ASTEROID_MAX_SIZE = 50;
model.MAX_SPEED = model.boardEdges.bottom / model.FPS / 5;

model.Asteroid = function() {
  this.coords = {
    x: model.randomCoord(model.boardEdges.right),
    y: model.randomCoord(model.boardEdges.bottom)
  };
  this.vel = {
    x: model.randomVelocity(model.MAX_SPEED),
    y: model.randomVelocity(model.MAX_SPEED)
  };
  this.radius = model.randomCoord(model.ASTEROID_MAX_SIZE);
  model.asteroids.push(this);
};

model.edgeWrap = function(coord, edge, radius) {
  if (coord > edge + radius) {
    coord = 0 - radius;
  }
  if (coord < 0 - radius) {
    coord = edge + radius;
  }
  return coord;
};

model.Asteroid.prototype.tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;

  this.coords.x = model.edgeWrap(this.coords.x, model.boardEdges.right, this.radius);
  this.coords.y = model.edgeWrap(this.coords.y, model.boardEdges.bottom, this.radius);

};

model.asteroids = [];

model.tic = function() {
  for (var i = 0; i < model.asteroids.length; i++) {
    model.asteroids[i].tic();
  }
};

model.init = function(count) {
  for (var i = 0; i < count; i++) {
    new model.Asteroid();
  }
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
