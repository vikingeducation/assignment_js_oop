"use strict";

var APP = APP || {};

APP.asteroid = function Asteroid(options) {
  this.radius = options.radius;
  APP.shape.call(this, options);
  APP.gameWindow.asteroids.push(this);
};

APP.asteroid.prototype = Object.create(APP.shape.prototype);
APP.asteroid.prototype.constructor = APP.asteroid;

APP.asteroid.init = function() {
  this.prototype.canvas = APP.asteroidCanvas;
  this.prototype.ctx = APP.asteroidCanvas.getContext("2d");
};

APP.asteroid.prototype._tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;
  return this.coords;
};

APP.asteroid.prototype._draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.coords.x, this.coords.y, this.radius, 0,2*Math.PI, false);
  this.ctx.fillStyle = this.fill;
  this.ctx.lineWidth = 1;
  this.ctx.strokeStyle = 'black';
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.closePath();
};

APP.asteroid.create = function(options) {
  return new this(options); // this = APP.asteroid.create
};

APP.asteroid.createMany = function(num) {
  for (var i = 0; i < num; i++) {
    this.create({
      coords: {
        x: Math.floor(Math.random() * APP.CONFIG.canvas.width),
        y: Math.floor(Math.random() * APP.CONFIG.canvas.height)
      },
      vel: {
        x: Math.floor(Math.random() * 11 - 5),
        y: Math.floor(Math.random() * 11 - 5),
      },
      radius: Math.floor(Math.random() * 50 + 10),
      fill: APP.helpers.randomColor()
    });
  }
};
