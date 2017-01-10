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
  APP.shape.call(this, options);
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
  this.ctx.fill(); //
  this.ctx.closePath();
};

APP.ship.create = function(options) {
  return new this(options);
};