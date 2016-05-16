'use strict;'

function View(){
  this.canvas = document.getElementById("game");
  this.context = this.canvas.getContext("2d");
}

View.prototype.drawAsteroid = function(x, y, radius){
  // var canvas = document.getElementById("game");

  // Rectangle
  // upper left coords (2) then width and height
  // context.fillRect(x, y, 5, 5);

  // Circle
  this.context.beginPath();
  // center coords (2), radius
  this.context.arc(x, y, radius, 0, 2*Math.PI);
  this.context.stroke();
};

View.prototype.clearCanvas = function(){
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}