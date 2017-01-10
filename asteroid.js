"use strict";

var APP = APP || {};

APP.asteroid = function Asteroid(options) {
  options = options || {};
  this.coords = options.coords;
  this.vel = options.vel;
  APP.gameWindow.asteroids.push(this);
  this.tic = function() {
    this.coords.x += this.vel.x;
    this.coords.y += this.vel.y;
    console.log(this);
    return this.coords;
  };
};

// APP.asteroid.prototype.tic = function() {
//   this.coords.x += this.vel.x;
//   this.coords.y += this.vel.y;
//   console.log(this);
//   return this.coords;
// };

APP.asteroid.create = function(options) {
  return new this(options); // this = APP.asteroid.create
};

APP.asteroid.createMany = function(num) {
  for (var i = 0; i < num; i++) {
    this.create({
      coords: {
        x: Math.floor(Math.random * 500),
        y: Math.floor(Math.random * 500)
      },
      vel: {
        x: 1,
        y: 1
      }
    });
  }
};
