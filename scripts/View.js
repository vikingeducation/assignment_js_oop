'use strict;'

function View(){
  this.canvas = document.getElementById("game");
  this.context = this.canvas.getContext("2d");
}

View.prototype.drawAsteroid = function(x, y, radius){
  // Circle
  this.context.beginPath();
  // center coords (2), radius
  this.context.arc(x, y, radius, 0, 2*Math.PI);
  this.context.stroke();
};

View.prototype.drawShip = function(x, y){
  this.context.beginPath();
  this.context.moveTo(x, y);
  this.context.lineTo(x + 5, y + 20);
  this.context.lineTo(x - 5, y + 20);
  this.context.fill();
};

View.prototype.clearCanvas = function(){
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}