"use strict";

var APP = APP || {};

APP.asteroid = function Asteroid(options) {
  options = options || {};
  this.coords = options.coords;
  this.vel = options.vel;
  this.radius = options.radius;
  this.fill = options.fill;
  APP.gameWindow.asteroids.push(this);
};

APP.asteroid.init = function() {
  this.prototype.canvas = APP.canvas;
  this.prototype.ctx = APP.ctx;
};

APP.asteroid.prototype.move = function() {
  this._tic();
  this._adjustBounds();
  this._draw();
};

APP.asteroid.prototype._adjustBounds = function() {
  if (this.coords.x - this.radius > this.canvas.width) {
    this.coords.x -= this.canvas.width + this.radius * 2;
  } else if (this.coords.x + this.radius < 0) {
    this.coords.x += this.canvas.width + this.radius * 2;
  } else if (this.coords.y - this.radius > this.canvas.height) {
    this.coords.y -= this.canvas.height + this.radius * 2;
  } else if (this.coords.y + this.radius < 0) {
    this.coords.y += this.canvas.height + this.radius * 2;
  }
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

APP.asteroid.prototype._clear = function() {
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
        x: Math.floor(Math.random() * 11 - 5),
        y: Math.floor(Math.random() * 11 - 5),
      },
      radius: Math.floor(Math.random() * 50 + 10),
      fill: APP.helpers.randomColor()
    });
  }
};
