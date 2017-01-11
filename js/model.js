"use strict";

var ASTEROIDS = ASTEROIDS || {};
var model = ASTEROIDS.model = {};

model.randomCoord = function(max, min = 0) {
  return Math.random() * (max - min) + min;
};
model.randomVelocity = function(max) {
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  return Math.random() * plusOrMinus * max;
};

model.FPS = 60;
model.ASTEROID_MAX_SIZE = 50;
model.ASTEROID_MIN_SIZE = model.ASTEROID_MAX_SIZE / 4;
model.MAX_SPEED = ASTEROIDS.boardEdges.bottom / model.FPS / 5;
model.SHIP_SIZE = 20;

// Constructors

model.Ship = function() {
  this.coords = {
    x: ASTEROIDS.boardEdges.right / 2,
    y: ASTEROIDS.boardEdges.bottom / 2
  };

  this.vel = {
    x: 0,
    y: 0
  },

  this.radius = model.SHIP_SIZE;
  this.ROTATION_SPEED = 15 / model.FPS;
  this.ACCELERATION = 1;
  this.heading = 0;
  this.rotate = function(leftOrRight) {
    if (leftOrRight === "left") {
      this.heading -= this.ROTATION_SPEED;
    } else {
      this.heading += this.ROTATION_SPEED;
    }
  };
  this.accelerate = function() {
    var xHeading = Math.sin(this.heading);
    var yHeading = -Math.cos(this.heading);

    this.vel.x += xHeading * this.ACCELERATION;
    this.vel.y += yHeading * this.ACCELERATION;
  };

  this.tic = function() {
    this.coords.x += this.vel.x;
    this.coords.y += this.vel.y;

    this.coords.x = model.edgeWrap(this.coords.x, ASTEROIDS.boardEdges.right, this.radius);
    this.coords.y = model.edgeWrap(this.coords.y, ASTEROIDS.boardEdges.bottom, this.radius);
  };
};

model.Asteroid = function() {
  this.coords = {
    x: model.randomCoord(ASTEROIDS.boardEdges.right),
    y: model.randomCoord(ASTEROIDS.boardEdges.bottom)
  };
  this.vel = {
    x: model.randomVelocity(model.MAX_SPEED),
    y: model.randomVelocity(model.MAX_SPEED)
  };
  this.radius = model.randomCoord(model.ASTEROID_MAX_SIZE, model.ASTEROID_MIN_SIZE);
  this.destroyed = false;
  this.destroy = function() {
    this.destroyed = true;
    var index = model.asteroids.indexOf(this);
    model.asteroids.splice(index, 1);
  };

  model.asteroids.push(this);
};


model.Asteroid.prototype.tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;

  this.coords.x = model.edgeWrap(this.coords.x, ASTEROIDS.boardEdges.right, this.radius);
  this.coords.y = model.edgeWrap(this.coords.y, ASTEROIDS.boardEdges.bottom, this.radius);
};


// Methods

model.tic = function() {
  for (var i = 0; i < model.asteroids.length; i++) {
    model.asteroids[i].tic();
  }
  model.ship.tic();
  model.detectCollision();
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

model.detectCollision = function() {
  var shipX = this.ship.coords.x;
  var shipY = this.ship.coords.y;
  for (var i = 0; i < this.asteroids.length; i++) {
    var dx = this.asteroids[i].coords.x - shipX;
    var dy = this.asteroids[i].coords.y - shipY;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.ship.radius + this.asteroids[i].radius) {
      if (this.ship.radius > this.asteroids[i].radius) {
        this.ship.radius += 15;
        this.asteroids[i].destroy();
      } else {
        this.gameOver = true;
      }
    }
  }
};

// Init

model.init = function(count) {
  this.gameOver = false;
  this.asteroids = [];
  for (var i = 0; i < count; i++) {
    new model.Asteroid();
  }
  this.ship = new model.Ship();
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
