"use strict";

var APP = APP || {};

APP.ship = function Ship(options) {
  options = options || {};
  options.coords = {
    x: APP.CONFIG.ship.startingX,
    y: APP.CONFIG.ship.startingY,
  };
  this.height = APP.CONFIG.ship.height;
  this.width = APP.CONFIG.ship.width;
  this.deg = 5;
  APP.shape.call(this, options);
  // this.angle =
  // this.boost = function() {
  //
  // };
  this.rotate = function(direction) {
    // clear existing triangle
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // translate the pivot point to the center of the triangle
    this.ctx.translate(this.coords.x, this.coords.y);
    // rotate the triangle by 5 deg
    this.ctx.rotate(this.deg * Math.PI / 180);
    // translate pivot point back
    this.ctx.translate(-this.coords.x, -this.coords.y);
    // draw the new triangle
    this.draw();
  };
  APP.gameWindow.ship = this;
};

APP.ship.prototype = Object.create(APP.shape.prototype);
APP.ship.prototype.constructor = APP.ship;

APP.ship.init = function() {
  this.prototype.canvas = APP.shipCanvas;
  this.prototype.ctx = APP.shipCanvas.getContext("2d");
};

APP.ship.prototype.draw = function() {

  this.ctx.beginPath(); // center
  this.ctx.moveTo(this.coords.x, this.coords.y + this.height * (2 / 3)); // first point
  this.ctx.lineTo(this.coords.x + this.width / 2, this.coords.y - this.height / 3); // 2nd point
  this.ctx.lineTo(this.coords.x - this.width / 2,this.coords.y - this.height / 3); // 3rd point
  // this.ctx.lineTo(this.coords.x - this.width / 2,this.coords.y - this.height / 3); // back to first point
  this.ctx.fill(); //
  this.ctx.closePath();
};

APP.ship.create = function(options) {
  return new this(options);
};
