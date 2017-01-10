"use strict";

var APP = APP || {};

APP.ship = function Ship(options) {
  
};

APP.ship.prototype = Object.create(APP.shape.prototype);
APP.ship.prototype.constructor = APP.ship;

APP.ship.init = function() {
  this.prototype.canvas = APP.shipCanvas;
  this.prototype.ctx = APP.shipCanvas.getContext("2d");
};

APP.ship.prototype._draw = function() {

  this.ctx.beginPath(); // center
  this.ctx.moveTo(x,y); // first point
  this.ctx.lineTo(x,y); // 2nd point
  this.ctx.lineTo(x,y); // 3rd point
  this.ctx.fill(); //
  this.ctx.closePath();
};
