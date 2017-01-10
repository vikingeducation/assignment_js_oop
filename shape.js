"use strict";

var APP = APP || {};

APP.shape = function Shape(options) {
  options = options || {};
  this.coords = options.coords;
  this.vel = options.vel;
  this.fill = options.fill;
};

APP.shape.init = function() {
  this.prototype.canvas = APP.canvas;
  this.prototype.ctx = APP.ctx;
};

APP.shape.prototype.move = function() {
  this._tic(); // change for SHAPE
  this._adjustBounds();
  this._draw();
};

APP.shape.prototype._adjustBounds = function() {
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

APP.shape.prototype._tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;
  return this.coords;
};
