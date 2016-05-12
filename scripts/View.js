'use strict;'

function View(){

}

View.prototype.drawAsteroid = function(x,y){
  var canvas = document.getElementById("game");
  var context = canvas.getContext("2d");

  // Rectangle
  // upper left coords (2) then width and height
  // context.fillRect(x, y, 5, 5);

  // Circle
  context.beginPath();
  // center coords (2), radius
  context.arc(x,y,5,0,2*Math.PI);
  context.stroke();
};