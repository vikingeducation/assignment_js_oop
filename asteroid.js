"use strict";

var APP = APP || {};

APP.asteroid = function Asteroid(options) {
  options = options || {};
  this.coords = options.coords;
  this.vel = options.vel;
  APP.gameWindow.asteroids.push(this);
};

APP.asteroid.prototype.tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;
  return this.coords;
};

APP.asteroid.init = function() {
  this.prototype.c = APP.canvas;
  this.prototype.ctx = APP.ctx;
};

APP.asteroid.prototype.radius = APP.CONFIG.asteroid.radius;

APP.asteroid.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.coords.x, this.coords.y, this.radius, 0,2*Math.PI, false);
  this.ctx.fillStyle = 'white';
  this.ctx.lineWidth = 1;
  this.ctx.strokeStyle = 'black';
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.closePath();
};

APP.asteroid.prototype.clear = function() {
  this.ctx.clearRect(this.coords.x - this.radius - 1, this.coords.y - this.radius - 1, this.radius * 2 + 2, this.radius * 2 + 2);
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
        x: 1,
        y: 1
      }
    });
  }
};
