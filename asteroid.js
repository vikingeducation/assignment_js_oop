"use strict";

var APP = APP || {};

APP.asteroid = function Asteroid(options) {
  options = options || {};
  this.coords = options.coords
  this.vel = options.vel;
  APP.gameWindow.asteroids.push(this);
};

APP.asteroid.prototype.tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;
  console.log(this);
  return this.coords;
}

APP.asteroid.create = function(options) {
  return new this(options); // this = APP.asteroid.create
}

var a = APP.asteroid.create({
  coords: {
    x: 0,
    y: 0
  },
  vel: {
    x: 1,
    y: 1
  }
})